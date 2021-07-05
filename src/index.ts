import { ResolverRegistry } from 'did-resolver';
import {
  resolve,
  eosioChainRegistry,
  REGEX_ACCOUNT_NAME,
  REGEX_CHAIN_ID,
  REGEX_CHAIN_NAME,
} from './resolver';

export function getResolver(): ResolverRegistry {
  return { eosio: resolve };
}

export {
  eosioChainRegistry,
  REGEX_ACCOUNT_NAME,
  REGEX_CHAIN_ID,
  REGEX_CHAIN_NAME,
};
