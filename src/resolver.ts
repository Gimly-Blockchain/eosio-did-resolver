import { DIDResolutionOptions, ParsedDID, Resolver, ServiceEndpoint, DIDResolutionMetadata, DIDDocumentMetadata } from "did-resolver"
import fetch from "node-fetch"
import { JsonRpc } from "eosjs"

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

function createKeyMethod(baseId: string, i: number, did: string, key: EosioKeyType): VerificationMethod {
    const keyType = "EcdsaSecp256k1VerificationKey2019"; // TODO support k1, r1 and wa types
    const keyMethod: VerificationMethod = {
        id: baseId + "-" + i,
        controller: did,
        type: keyType,
        weight: key.weight
    }
    keyMethod.publicKeyJwk = {}; // TODO
    return keyMethod;
}

function createAccountMethod(baseId: string, methodId: MethodId, i: number, did: string, account: EosioAccountPermission): VerificationMethod {
    const delegatedChain = baseId.slice(1, baseId.lastIndexOf(methodId.subject));
    const accountMethod = {
        id: baseId + "-" + i,
        controller: did,
        type: ["VerifiableCondition", "VerifiableConditionDelegated"],
        weight: account.weight,
        delegatedIdUrl: delegatedChain + ":" + account.permission.actor + "#" + account.permission.permission
    }
    return accountMethod;
}

function createDIDDocument(methodId: MethodId, did: string, eosioAccount: EosioAccountResponse): DIDDocument {

    const verificationMethod = [];
    for (const permission of eosioAccount.permissions) {
        const baseId = did + "#" + permission.perm_name;
        const type = ["VerifiableCondition", "VerifiableConditionWeightedThreshold"];
        const method: VerificationMethod = {
            id: baseId,
            controller: did,
            type,
            threshold: permission.required_auth.threshold,
            verificationMethod: []
        }

        if (permission.parent !== "") {
            type.push("VerifiableConditionRelationship");
            method.parentIdUrl = did + "#" + permission.parent;
        }

        let i = 0;
        for (const key of permission.required_auth.keys) {
            method.verificationMethod.push(createKeyMethod(baseId, i, did, key));
            i++;
        }

        for (const account of permission.required_auth.accounts) {
            method.verificationMethod.push(createAccountMethod(baseId, methodId, i, did, account));
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

interface EosioAccountResponse {
    account_name: string,
    head_block_num: number,
    head_block_time: string,
    privileged: boolean,
    last_code_update: string,
    created: string,
    core_liquid_balance: string,
    ram_quota: number,
    net_weight: number,
    cpu_weight: number,
    net_limit: {
        used: number,
        available: number,
        max: number,
    },
    cpu_limit: {
        used: number,
        available: number,
        max: number,
    },
    ram_usage: number,
    permissions: [{
        perm_name: string,
        parent: string,
        required_auth: {
            threshold: number,
            keys: [EosioKeyType],
            accounts: [EosioAccountPermission],
            waits: [{
                wait_sec: number,
                weight: number
            }],
        }
    }],
    total_resources: {
        owner: string,
        net_weight: string,
        cpu_weight: string,
        ram_bytes: number,
    },
    self_delegated_bandwidth: {
        from: string,
        to: string,
        net_weight: string,
        cpu_weight: string,
    },
    refund_request: {
        owner: string,
        request_time: string,
        net_amount: string,
        cpu_amount: string
    },
    voter_info: {
        owner: string,
        proxy: string,
        producers: [string],
        staked: number,
        last_stake: number,
        last_vote_weight: string,
        proxied_vote_weight: string,
        is_proxy: number,
        flags1: number,
        reserved2: number,
        reserved3: string,
    },
    rex_info: any,
}

declare interface EosioKeyType {
    key: string,
    weight: number,
}

declare interface EosioAccountPermission {
    permission: {
        permission: string,
        actor: string
    },
    weight: number
}

declare interface ExtensibleSchema {
    [x: string]: any // other properties possible depending on type
}

interface VerificationMethod extends ExtensibleSchema {
    id: string;
    type: string[] | string;
    controller: string;
}

export interface DIDDocument {
    '@context'?: 'https://www.w3.org/ns/did/v1' | string | string[];
    id: string;
    alsoKnownAs?: string[];
    controller?: string | string[];
    verificationMethod?: VerificationMethod[];
    authentication?: (string | VerificationMethod)[];
    assertionMethod?: (string | VerificationMethod)[];
    keyAgreement?: (string | VerificationMethod)[];
    capabilityInvocation?: (string | VerificationMethod)[];
    capabilityDelegation?: (string | VerificationMethod)[];
    service?: ServiceEndpoint[];
}

export interface DIDResolutionResult {
    didResolutionMetadata: DIDResolutionMetadata;
    didDocument: DIDDocument | null;
    didDocumentMetadata: DIDDocumentMetadata;
}

interface Service {
    id: string,
    type: string,
    serviceEndpoint: string
}

interface Entry {
    chainId: string,
    service: Service[]
}

export interface Registry {
    [chainName: string]: Entry;
}

interface MethodId {
    chain: Entry,
    subject: string
}