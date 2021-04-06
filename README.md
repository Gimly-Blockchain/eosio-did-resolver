# EOSIO DID Resolver


This library is intended to use EOSIO accounts as fully self managed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/#decentralized-identifiers-dids) and wrap them in a [DID Document](https://w3c-ccg.github.io/did-spec/#did-documents)

It supports the proposed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) spec from the [W3C Credentials Community Group](https://w3c-ccg.github.io).

It requires the `did-resolver` library, which is the primary interface for resolving DIDs.

The DID specification can be found at [eosio-did-registry](https://github.com/Gimly-Blockchain/eosio-did-spec).

## DID method

The [DID Method](https://w3c.github.io/did-core/#methods) schema can be consumed in either of the following two formats:
1. Registered chain name schema
2. Chain-id schema

For example:
- `did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:example`
- `did:eosio:telos:example`
both resolve the same DID from the Telos blockchain.

## DID Document

The did resolver takes the EOSIO account name and retreives it's permission data from the blockchain to make the DID document.

```json
{
    "@context": ["https://www.w3.org/ns/did/v1", 
        "https://raw.githubusercontent.com/Gimly-Blockchain/eosio-did-spec/master/eosio-did-context.json"],
    "id": "did:eosio:telos:example",
    "verificationMethod": [{
        "id": "did:eosio:telos:example#owner",
        "controller": "did:eosio:telos:example",
        "type": "Ed25519VerificationKey",
        "publicKeyBase58": "7idX86zQ6M3mrzkGQ9MGHf4btSECmcTj4i8Le59ga7CpSpZYy5"
    }, {
        "id": "did:eosio:telos:example#active",
        "controller": "did:eosio:telos:example",
        "type": ["VerifiableCondition", "VerifiableConditionRelationship", "Ed25519VerificationKey"],
        "parentIdUrl": "did:eosio:telos:example#owner",
        "publicKeyBase58": "7NFuBesBKK5XHHLtzFxm7S57Eq11gUtndrsvq3Mt3XZNMTHfqc"
    }]
}
```

Note this uses the [``Verifiable Conditions`](https://github.com/Gimly-Blockchain/verifiable-conditions) type and an TODO key type.

## Building a DID document

The DID document is built by from the account data on the EOSIO blockchain.

## Resolving a DID document

The library presents a `resolver()` function that returns a ES6 Promise returning the DID document.
It is not meant to be used directly but through the
[`did-resolver`](https://github.com/decentralized-identity/did-resolver) aggregator.
You can use the `getResolver(conf)` method to produce an entry that can be used with the `Resolver`
constructor.

```javascript
import { Resolver } from 'did-resolver'
import { getResolver } from 'eosio-did-resolver'

// You can set an API endpoint to be used by the web3 provider
const providerConfig = { apiUrl: 'https://eos.greymass.com' }

// getResolver will return an object with a key/value pair of { "eos": resolver } where resolver is a function used by the generic did resolver.
const eosioDidResolver = getResolver(providerConfig)
const didResolver = new Resolver(eosioDidResolver)

didResolver.resolve('did:eosio:eos:example').then(doc => console.log)

// You can also use ES7 async/await syntax
const doc = await didResolver.resolve('did:eosio:eos:example')
```

## Multi-network configuration

An example configuration for multi-network DID resolving would look like this:

```javascript
const providerConfig = {
  networks: [
    { name: "eos", apiUrl: "https://eos.greymass.com" },
    { name: "telos", apiUrl: "https://telos.greymass.com" }
    { name: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11", apiUrl: "https://telos.greymass.com" }
  ]
}

const eosioDidResolver = getResolver(providerConfig)
```

This allows you to resolve ethr-did's of the formats:
* `did:eosio:eos:example`
* `did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:example`
