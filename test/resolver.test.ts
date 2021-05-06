import { Resolver } from 'did-resolver'
import { getResolver } from '../src/index';

describe('EOSIO resolver', async () => {
  const resolver = new Resolver(getResolver());

  it('Resolve a complex EOS DID Document', async () => {
    const eoscanadacomDid = 'did:eosio:eos:eoscanadacom';
    console.log('Resolving ' + eoscanadacomDid);
    const eosDidDocument = await resolver.resolve(eoscanadacomDid);
    console.log('DID Document:', eosDidDocument);
  })

  it('Resolve a jungle testnet DID Document', async () => {
    const jungleDid = 'did:eosio:eos:jungle:lioninjungle';
    console.log('Resolving ' + jungleDid);
    const jungleDidDocument = await resolver.resolve(jungleDid);
    console.log('DID Document:', jungleDidDocument);
  })

  it('Resolve a chain-id based DID Document', async () => {
    const telosDid = 'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks';
    console.log('Resolving ' + telosDid);
    const telosDidDocument = await resolver.resolve(telosDid);
    console.log('DID Document:', telosDidDocument);
  })

  it('Fail to resolve an invalid DID', async () => {
    const invalidDid = 'did:eosio:eos:aaaaaaaaaaaaaaaaaaaa';
    console.log('Resolving ' + invalidDid);
    try {
      const invalidDidDocument = await resolver.resolve(invalidDid);
      console.log('DID Document:', invalidDidDocument);
    } catch (e) {
      console.log('Error resolving DID:', e.what());
    }
  })

  it('Fail to resolve a non existant DID', async () => {
    const nonExistantDid = 'did:eosio:telos:aaaaa';
    console.log('Resolving ' + nonExistantDid);
    try {
      const nonExistantDidDocument = await resolver.resolve(nonExistantDid);
      console.log('DID Document:', nonExistantDidDocument);
    } catch (e) {
      console.log('Error resolving DID:', e.what());
    }
  })

});
