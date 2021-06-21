import {
    DIDResolutionOptions, ParsedDID, Resolver, DIDResolutionResult, DIDDocument,
    ServiceEndpoint
} from "did-resolver"
import fetch from "node-fetch"
import { JsonRpc } from "eosjs"
import {
    EosioAccountPermission, EosioAccountResponse,
    Entry, Registry, MethodId, VerificationMethod, VerifiableConditionMethod, Jwk
} from "./types"
import { PublicKey } from 'eosjs/dist/eosjs-key-conversions';
import { KeyType } from "eosjs/dist/eosjs-numeric";
import { ec } from "elliptic";
import base64url from "base64url";
import BN from "bn.js";

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
            throw e;
            // TODO try other services in case of error.
        }
    }
    return null
}

function findServices(service: Array<ServiceEndpoint>, type: string): Array<ServiceEndpoint> {
    return service.filter((s) => Array.isArray(s.type) ? s.type.includes(type) : s.type === type)
}

function getCurveNamesFromType(type: KeyType): { jwkCurve: string, verificationMethodType: string } {
    switch(type) {
        case KeyType.k1:
            return { jwkCurve: "secp256k1", verificationMethodType: "EcdsaSecp256k1VerificationKey2019" };
        case KeyType.r1:
            return { jwkCurve: "P-256", verificationMethodType: "JsonWebKey2020" }
    }

    throw new Error("Key type not supported");
}

// "integers are represented using the base64url encoding of their big-endian representations"
// https://datatracker.ietf.org/doc/html/rfc7517#appendix-A.1
function bnToBase64Url(bn: BN): string {
    const buffer = bn.toArrayLike(Buffer, "be");
    return base64url(buffer)
}

function createKeyMethod(baseId: string, i: number, did: string, key: string): VerificationMethod {
    const pubKey = PublicKey.fromString(key);
    const ecPubKey: ec.KeyPair= pubKey.toElliptic();

    if (!pubKey.isValid()) throw new Error("Key is not valid");
    
    const { jwkCurve, verificationMethodType } = getCurveNamesFromType(pubKey.getType());

    const publicKeyJwk: Jwk = {
        crv: jwkCurve,
        kty: "EC",
        x: bnToBase64Url(ecPubKey.getPublic().getX()),
        y: bnToBase64Url(ecPubKey.getPublic().getY()),
        kid: pubKey.toString()
    };

    const keyMethod: VerificationMethod = {
        id: baseId + "-" + i,
        controller: did,
        type: verificationMethodType,
        publicKeyJwk
    }

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
            method.relationshipParent = [did + "#" + permission.parent];
        }

        let i = 0;
        for (const key of permission.required_auth.keys) {
            method.conditionWeightedThreshold.push({
                condition: createKeyMethod(baseId, i, did, key.key),
                weight: key.weight
            });
            i++;
        }

        for (const account of permission.required_auth.accounts) {
            method.conditionWeightedThreshold.push({
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