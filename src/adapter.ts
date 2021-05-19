/*
    This file is acting as an adapter between did-resolver and
    eosio-did-resolver. This is needed due to the fact, that
    in the DID spec and thus in did-resolver the verifications
    method type can only be of type string. For eosio we
    also need the type string[]
    (see https://github.com/w3c-ccg/verifiable-conditions).
    Affected exports are reedefined in this file unaffected
    exports are re-exportet without change. All subsequent
    imports towards did-resolver import from this file instead.
*/

import {
  DIDResolutionOptions,
  ParsedDID,
  Resolver,
  ServiceEndpoint,
  DIDResolutionMetadata,
  DIDDocumentMetadata,
} from 'did-resolver';

declare interface ExtensibleSchema {
    [x: string]: any // other properties possible depending on type
}

interface VerificationMethod extends ExtensibleSchema {
  id: string;
  type: string[] | string;
  controller: string;
}

interface DIDDocument {
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

interface DIDResolutionResult {
  didResolutionMetadata: DIDResolutionMetadata;
  didDocument: DIDDocument | null;
  didDocumentMetadata: DIDDocumentMetadata;
}

declare type DIDResolver = (
  did: string,
  parsed: ParsedDID,
  resolver: Resolver,
  options: DIDResolutionOptions
) => Promise<DIDResolutionResult>;

interface ResolverRegistry {
  [index: string]: DIDResolver;
}

export {
  DIDResolutionOptions,
  DIDDocumentMetadata,
  ParsedDID,
  VerificationMethod,
  DIDResolutionResult,
  Resolver,
  ResolverRegistry,
  ServiceEndpoint,
  DIDResolutionMetadata,
  DIDDocument
};
