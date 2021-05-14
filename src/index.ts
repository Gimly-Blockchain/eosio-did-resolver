import { ResolverRegistry, DIDResolutionOptions, DIDResolutionResult, ParsedDID, Resolver } from "did-resolver";
import { resolve, Registry } from './resolver';

export function getResolver(registry?: Registry): ResolverRegistry {
  return { 
    'eosio': async (
                did: string,
                parsed: ParsedDID,
                didResolver: Resolver,
                options: DIDResolutionOptions
              ): Promise<DIDResolutionResult> => { 
                return resolve(did, parsed, didResolver, options, registry) 
              } 
  }
}