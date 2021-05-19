import { ResolverRegistry } from './adapter';
import { resolve } from './resolver';

export function getResolver(): ResolverRegistry {
  return { 'eosio': resolve }
}