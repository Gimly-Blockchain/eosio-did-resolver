import { DIDDocument, DIDResolutionOptions, DIDResolutionResult, ParsedDID, Resolver } from "did-resolver"
const registry = require('../eosio-did-chain-registry.json');

const SUBJECT_ID = `([a-z1-5.]{0,12}[a-z1-5])`;
const CHAIN_ID   = new RegExp( `^([A-Fa-f0-9]{64}):${SUBJECT_ID}$` )
const CHAIN_NAME = new RegExp(
    `^(([a-z1-5.]{0,12}[a-z1-5])((:[a-z1-5.]{0,12}[a-z1-5])+)?):${SUBJECT_ID}$`
)

function findChainByID(chainId: string) {
    registry.map((chain: any, chainName: string) => {
        if(chain.chainId === chainId) return chain;
    });
}

function findChainByName(chainName: string) {
    return registry[chainName];
}

/**
 * Checks the method-specific-id, parses it into chainId/chainName 
 * and subject (account name) and fetches the correlating chain from 
 * the registry.
 * If the method-specific-id is invalid or no matching chain was 
 * found, then an empty object is returned.
 * 
 * @param parsed 
 * @returns { {chain?: object, subject?: string} }
 */
function checkDID(parsed: ParsedDID) {
    const partsID = parsed.id.match(CHAIN_ID);
    if(partsID) {
        return {
            chain: findChainByID(partsID[1]),
            subject: partsID[partsID.length - 1]
        }
    }

    const partsName = parsed.id.match(CHAIN_NAME);
    if(partsName) {
        return {
            chain: findChainByName(partsName[1]),
            subject: partsName[partsName.length - 1]
        }
    }

    return {}
}

async function fetchAccount(registryEntry: object, did: string, parsed: ParsedDID, options: DIDResolutionOptions): Promise<object> {
    // Find the API from registered eosio chains or from options

    // Fetch the eosio account
    return {};
}

function createDIDDocument(eosioAccount: any): DIDDocument {
    // TODO
    return { id: 'did:eosio:stub' };
}

export async function resolve(
    did: string,
    parsed: ParsedDID,
    didResolver: Resolver,
    options: DIDResolutionOptions): Promise<DIDResolutionResult> {

    const registryEntry = checkDID(parsed);

    const eosioAccount = await fetchAccount(registryEntry, did, parsed, options);

    const didDoc = createDIDDocument(eosioAccount);

    return {
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: didDoc,
        didDocumentMetadata: {}
    }
}