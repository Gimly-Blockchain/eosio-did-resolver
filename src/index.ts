import { ResolverRegistry } from 'did-resolver';
import { resolve } from './resolver';

export function getResolver(): ResolverRegistry {
  return { eosio: resolve };
}
