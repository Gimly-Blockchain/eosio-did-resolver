import { DIDDocument, DIDResolutionOptions, DIDResolutionResult, ParsedDID, Resolver } from "did-resolver"
import fetch from "node-fetch"
import {JsonRpc} from "eosjs"

const eosioChainRegistry: Registry = require('../eosio-did-chain-registry.json');

const ERROR_RESULT = {
    didResolutionMetadata: { error: 'invalidDid' },
    didDocument: null,
    didDocumentMetadata: {}
};

const SUBJECT_ID = `([a-z1-5.]{0,12}[a-z1-5])`;
const CHAIN_ID   = new RegExp( `^([A-Fa-f0-9]{64}):${SUBJECT_ID}$` )
const CHAIN_NAME = new RegExp(
    `^(([a-z1-5.]{0,12}[a-z1-5])((:[a-z1-5.]{0,12}[a-z1-5])+)?):${SUBJECT_ID}$`
)

function checkDID(parsed: ParsedDID, registry: Registry): MethodId | undefined {

    // findChainByName
    const partsName = parsed.id.match(CHAIN_NAME);
    if(partsName) {
        const entry = registry[partsName[1]];
        if(entry) return {
            chain: entry,
            subject: partsName[partsName.length - 1]
        }
        return undefined;
    }
    
    // findChainById
    const partsID = parsed.id.match(CHAIN_ID);
    if(partsID) {
        for (let key of Object.keys(registry)) {
            const entry: Entry = registry[key];
            if(entry.chainId === partsID[1]) 
                return { 
                    chain: entry, 
                    subject: partsID[partsID.length - 1] 
                };
        }
    }

    return undefined
}

async function fetchAccount(methodId: MethodId, did: string, parsed: ParsedDID, options: DIDResolutionOptions): Promise<object> {
    const serviceType = 'LinkedDomains'
    const services = findServices(methodId.chain.service, serviceType)
    if (services.length == 0) {
        throw new Error(`No service of type ${serviceType} found for chain ${methodId.chain.chainId}`)
    }
    var error = null
    for (const service of services) {
        const rpc = new JsonRpc(service.serviceEndpoint, { fetch })
        try {
            return await rpc.get_account(methodId.subject)
        } catch(e) {
            //Try to fetch from other service in case of error
            error = e
        }
    }
    throw error;
}

function findServices(service: Array<Service>, type: string): Array<Service> {
    return service.filter((s)=> Array.isArray(s.type) ? s.type.includes(type): s.type == type) 
}

function createDIDDocument(eosioAccount: any): DIDDocument {
    // TODO
    return { id: 'did:eosio:stub' };
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

    if(!methodId) {
        // invalid method-specific-id OR no matching chain in the registry
        return ERROR_RESULT;
    }

    var eosioAccount = null
    try {
        eosioAccount = await fetchAccount(methodId, did, parsed, options);
    } catch(e){
        return {
            didResolutionMetadata: { error: 'notFound' },
            didDocument: null,
            didDocumentMetadata: {}
        };
    }
    

    const didDoc = createDIDDocument(eosioAccount);

    return {
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: didDoc,
        didDocumentMetadata: {}
    }
}

interface Service {
    id: string,
    type: string|string[],
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