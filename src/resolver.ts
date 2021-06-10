import { DIDResolutionOptions, ParsedDID, Resolver } from "did-resolver"
import fetch from "node-fetch"
import { JsonRpc } from "eosjs"
import {
    EosioAccountPermission, EosioAccountResponse,
    DIDDocument, DIDResolutionResult, Service, Entry, Registry, MethodId, VerificationMethod, VerifiableConditionMethod
} from "./types"

const eosioChainRegistry: Registry = require('../eosio-did-chain-registry.json');

const SUBJECT_ID = `([a-z1-5.]{0,12}[a-z1-5])`;
const CHAIN_ID = new RegExp(`^([A-Fa-f0-9]{64}):${SUBJECT_ID}$`)
const CHAIN_NAME = new RegExp(
    `^(([a-z1-5.]{0,12}[a-z1-5])((:[a-z1-5.]{0,12}[a-z1-5])+)?):${SUBJECT_ID}$`
)

function getResolutionError(error: string): DIDResolutionResult {
    return {
        didResolutionMetadata: { error },
        didDocument: null,
        didDocumentMetadata: {}
    }
}

function checkDID(parsed: ParsedDID, registry: Registry): MethodId | undefined {
    // findChainByName
    const partsName = parsed.id.match(CHAIN_NAME);
    if (partsName) {
        const entry = registry[partsName[1]];
        if (entry) return {
            chain: entry,
            subject: partsName[partsName.length - 1]
        }
        return undefined;
    }

    // findChainById
    const partsID = parsed.id.match(CHAIN_ID);
    if (partsID) {
        for (let key of Object.keys(registry)) {
            const entry: Entry = registry[key];
            if (entry.chainId === partsID[1])
                return {
                    chain: entry,
                    subject: partsID[partsID.length - 1]
                };
        }
    }

    return undefined
}

async function fetchAccount(methodId: MethodId, did: string, parsed: ParsedDID, options: DIDResolutionOptions): Promise<EosioAccountResponse | null> {
    const serviceType = 'LinkedDomains'
    const services = findServices(methodId.chain.service, serviceType)
    for (const service of services) {
        const rpc = new JsonRpc(service.serviceEndpoint, { fetch })
        try {
            return await rpc.get_account(methodId.subject)
        } catch (e) {
            //try other services in case of error.
        }
    }
    return null
}

function findServices(service: Array<Service>, type: string): Array<Service> {
    return service.filter((s) => Array.isArray(s.type) ? s.type.includes(type) : s.type === type)
}

function createKeyMethod(baseId: string, i: number, did: string): VerificationMethod {
    const keyType = "EcdsaSecp256k1VerificationKey2019"; // TODO support k1, r1 and wa types
    const keyMethod: VerificationMethod = {
        id: baseId + "-" + i,
        controller: did,
        type: keyType
    }
    keyMethod.publicKeyJwk = {}; // TODO
    return keyMethod;
}

function createAccountMethod(baseId: string, methodId: MethodId, i: number, did: string, account: EosioAccountPermission): VerificationMethod {
    const delegatedChain = baseId.slice(1, baseId.lastIndexOf(methodId.subject));
    const accountMethod = {
        id: baseId + "-" + i,
        controller: did,
        type: "VerifiableCondition",
        conditionDelegated: delegatedChain + ":" + account.permission.actor + "#" + account.permission.permission
    }
    return accountMethod;
}

function createDIDDocument(methodId: MethodId, did: string, eosioAccount: EosioAccountResponse): DIDDocument {
    const verificationMethod: VerifiableConditionMethod[] = [];
    for (const permission of eosioAccount.permissions) {
        const baseId = did + "#" + permission.perm_name;
        const method: VerificationMethod = {
            id: baseId,
            controller: did,
            type: "VerifiableCondition",
            threshold: permission.required_auth.threshold,
            conditionWeightedThreshold: []
        }

        if (permission.parent !== "") {
            method.relationshipParent = did + "#" + permission.parent;
        }

        let i = 0;
        for (const key of permission.required_auth.keys) {
            method.conditionWeightedThreshold.push({
                condition: createKeyMethod(baseId, i, did),
                weight: key.weight
            });
            i++;
        }

        for (const account of permission.required_auth.accounts) {
            method.verificationMethod.push({
                condition: createAccountMethod(baseId, methodId, i, did, account),
                weight: account.weight,
            });
            i++;
        }

        verificationMethod.push(method);
    }

    const doc = {
        "@context": ["https://www.w3.org/ns/did/v1"],
        id: did,
        verificationMethod,
        service: methodId.chain.service
    };

    return doc;
}

export async function resolve(
    did: string,
    parsed: ParsedDID,
    didResolver: Resolver,
    options: DIDResolutionOptions
): Promise<DIDResolutionResult> {

    const registry: Registry = {
        ...eosioChainRegistry,
        ...options.eosioChainRegistry
    };

    const methodId = checkDID(parsed, registry);

    if (!methodId) {
        // invalid method-specific-id OR no matching chain in the registry
        return getResolutionError('invalidDid');
    }

    const eosioAccount = await fetchAccount(methodId, did, parsed, options);

    if (!eosioAccount) {
        return getResolutionError('notFound');
    }

    const didDoc = createDIDDocument(methodId, did, eosioAccount);

    return {
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: didDoc,
        didDocumentMetadata: {}
    }
}