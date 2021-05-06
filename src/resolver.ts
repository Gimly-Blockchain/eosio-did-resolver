import { DIDDocument, DIDResolutionOptions, DIDResolutionResult, ParsedDID, Resolver } from "did-resolver"

export async function resolve(
    did: string,
    parsed: ParsedDID,
    didResolver: Resolver,
    options: DIDResolutionOptions): Promise<DIDResolutionResult> {

    console.log(did, parsed, didResolver, options);

    // TODO
    const didDoc: DIDDocument = { id: 'did:eosio:stub' };

    return {
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: didDoc,
        didDocumentMetadata: {}
    }
}