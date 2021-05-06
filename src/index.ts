import { ResolverRegistry } from "did-resolver";
import { resolve } from './eosio-resolver';

export function getResolver(): ResolverRegistry {
    return { 'eosio': resolve }
}