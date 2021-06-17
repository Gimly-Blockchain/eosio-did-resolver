# Contributions

The EOSIO Identity Working Group is an open working group where we, the EOSIO community, discuss identity on EOSIO chains and progress work such as this DID specification and it's implementation. We have a weekly meeting and a Slack channel.

**[Join the EOSIO Identity Working Group](https://www.gimly.io/eosio-identity)**

Comments regarding this document are welcome. Please file issues and PRs directly on Github. Contributors are recognized through adding commits to the code base.

See [README.tsdx.md](./README.tsdx.md) for instructions on how to run, build, test and test this library.

Contributors:
- Jack Tanner <jack@gimly.io>
- Jonas Walter
- Sebastian Montero <sebastian@m1ghty.io>

<!-- Make sure images have 75 pixel height -->
[![Gimly](./assets/gimly.jpg)](https://gimly.io)
![](./assets/filler.png)
[![Europechain](./assets/europechain.png)](https://europechain.io)
![](./assets/filler.png)
[![Digital Scarcity](./assets/digital-scarcity.jpeg)](https://digitalscarcity.io)
![](./assets/filler.png)
[![rewired.one](./assets/rewired.png)](https://www.rewired.one)

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

Note this uses the [`Verifiable Conditions`](https://github.com/Gimly-Blockchain/verifiable-conditions) verification method type.

## Building a DID document

The DID document is built from the account data on the EOSIO blockchain.

## Resolving a DID document

### Resolving from pre-registered EOSIO chains

```javascript
import { Resolver } from 'did-resolver'
import { getResolver } from 'eosio-did-resolver'

async function resolve() {
  const didResolver = new Resolver(getResolver())

  const didDoc = await didResolver.resolve('did:eosio:eos:example');
}
```

### Resolving with a custom EOSIO chain or custom API

```javascript
import { Resolver } from 'did-resolver'
import { getResolver } from 'eosio-did-resolver'

async function resolve() {

  // Multiple entries can exist for multiple eosio chains
  const config = {
    eos: {
        chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
        service: [
            {
                id: "https://eos.greymass.com",
                type: [
                    LinkedDomains
                ],
                serviceEndpoint: "https://eos.greymass.com"
            }
        ]
    }
  }
  const didResolver = new Resolver(getResolver(config))

  const didDoc = await didResolver.resolve('did:eosio:eos:example');
}
```