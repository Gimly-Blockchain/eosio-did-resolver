import { DIDDocument, DIDResolutionOptions, DIDResolutionResult, ParsedDID, Resolver } from "did-resolver"

function checkDID(parsed: ParsedDID) {
    // TODO check DID is valid format and structure
}

async function fetchAccount(did: string, parsed: ParsedDID, options: DIDResolutionOptions): Promise<object> {
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

    checkDID(parsed);

    const eosioAccount = await fetchAccount(did, parsed, options);

    const didDoc = createDIDDocument(eosioAccount);

    return {
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: didDoc,
        didDocumentMetadata: {}
    }
}