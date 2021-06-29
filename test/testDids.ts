export const testDids = [
  {
    did: 'did:eosio:eos:testnet:jungle:lioninjungle',
    expectedResult: {
      didResolutionMetadata: { contentType: 'application/did+ld+json' },
      didDocument: {
        '@context': [
          'https://www.w3.org/ns/did/v1',
          'https://w3c-ccg.github.io/verifiable-conditions/contexts/verifiable-conditions-2021-v1.json',
        ],
        id: 'did:eosio:eos:testnet:jungle:lioninjungle',
        verificationMethod: [
          {
            id: 'did:eosio:eos:testnet:jungle:lioninjungle#active',
            controller: 'did:eosio:eos:testnet:jungle:lioninjungle',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:testnet:jungle:lioninjungle#active-0',
                  controller: 'did:eosio:eos:testnet:jungle:lioninjungle',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'jbXSqQffgSNrtF4SBriENexUuXstjPDRFV_3PRCFU7o',
                    y: 'J20YqTFJgZ3P5KXZBEcOmWX-Nxaqogtt4NyWtvx8Ryk',
                    kid:
                      'PUB_K1_7ueKyvQJpBLVjuNgLedAgJakw3bLyd4GBx1N4jXswpBhE5SbJK',
                  },
                },
                weight: 1,
              },
            ],
            relationshipParent: [
              'did:eosio:eos:testnet:jungle:lioninjungle#owner',
            ],
          },
          {
            id: 'did:eosio:eos:testnet:jungle:lioninjungle#owner',
            controller: 'did:eosio:eos:testnet:jungle:lioninjungle',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:testnet:jungle:lioninjungle#owner-0',
                  controller: 'did:eosio:eos:testnet:jungle:lioninjungle',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'jbXSqQffgSNrtF4SBriENexUuXstjPDRFV_3PRCFU7o',
                    y: 'J20YqTFJgZ3P5KXZBEcOmWX-Nxaqogtt4NyWtvx8Ryk',
                    kid:
                      'PUB_K1_7ueKyvQJpBLVjuNgLedAgJakw3bLyd4GBx1N4jXswpBhE5SbJK',
                  },
                },
                weight: 1,
              },
            ],
          },
        ],
        service: [
          {
            id: 'https://jungle3.cryptolions.io',
            type: 'LinkedDomains',
            serviceEndpoint: 'https://jungle3.cryptolions.io',
          },
        ],
      },
      didDocumentMetadata: {},
    },
  },
  {
    did:
      'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
    expectedResult: {
      didResolutionMetadata: {
        contentType: 'application/did+ld+json',
      },
      didDocument: {
        '@context': [
          'https://www.w3.org/ns/did/v1',
          'https://w3c-ccg.github.io/verifiable-conditions/contexts/verifiable-conditions-2021-v1.json',
        ],
        id:
          'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
        verificationMethod: [
          {
            id:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#active',
            controller:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#active-0',
                  controller:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'qtURTt2310JSW5rcRbGOIzIEJw_Hkya1wYtiOfPH5bQ',
                    y: 'IwCoN7GZWkNNKyyhG82iSclXM0kIVVHiwBKcXvMXmCo',
                    kid:
                      'PUB_K1_6Bj319bz279z7svm219K3sGMSyupYTxSHS4twhQuys5LVkdvT7',
                  },
                },
                weight: 1,
              },
            ],
            relationshipParent: [
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#owner',
            ],
          },
          {
            id:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#delphi',
            controller:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#delphi-0',
                  controller:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'UU32ZoNV5F8-wZVboQo-70OGwlrq1LI8eMgLKR6FkX8',
                    y: '3YuUCMnonE77VmeEJ-9MP4dQVvhjOyGe0mvwrDAeaKY',
                    kid:
                      'PUB_K1_5WJAkq8dQULikFHKM8ZJRTRZsi5hXHXJ2mGJwhdCn9jACeiXEd',
                  },
                },
                weight: 1,
              },
            ],
            relationshipParent: [
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#active',
            ],
          },
          {
            id:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#owner',
            controller:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#owner-0',
                  controller:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'qtURTt2310JSW5rcRbGOIzIEJw_Hkya1wYtiOfPH5bQ',
                    y: 'IwCoN7GZWkNNKyyhG82iSclXM0kIVVHiwBKcXvMXmCo',
                    kid:
                      'PUB_K1_6Bj319bz279z7svm219K3sGMSyupYTxSHS4twhQuys5LVkdvT7',
                  },
                },
                weight: 1,
              },
            ],
          },
          {
            id:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#rng',
            controller:
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#rng-0',
                  controller:
                    'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'mNlY09ZUonQSYzZpEpvfIN1s-2O3979oyHbYDzcvlBw',
                    y: 'YdyiZrVj9SjaBDkZP66_9uDsUT-Nsrm6ycuPMLgj0EI',
                    kid:
                      'PUB_K1_63ogBzScX6CAbsW1caxer6DcddkV1nLbNT3BAQPztgeSR1yg2S',
                  },
                },
                weight: 1,
              },
            ],
            relationshipParent: [
              'did:eosio:4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11:caleosblocks#active',
            ],
          },
        ],
        service: [
          {
            id: 'https://telos.greymass.com',
            type: 'LinkedDomains',
            serviceEndpoint: 'https://telos.greymass.com',
          },
        ],
      },
      didDocumentMetadata: {},
    },
  },
  {
    did: 'did:eosio:eos:eoscanadacom',
    expectedResult: {
      didResolutionMetadata: {
        contentType: 'application/did+ld+json',
      },
      didDocument: {
        '@context': [
          'https://www.w3.org/ns/did/v1',
          'https://w3c-ccg.github.io/verifiable-conditions/contexts/verifiable-conditions-2021-v1.json',
        ],
        id: 'did:eosio:eos:eoscanadacom',
        verificationMethod: [
          {
            id: 'did:eosio:eos:eoscanadacom#active',
            controller: 'did:eosio:eos:eoscanadacom',
            type: 'VerifiableCondition',
            threshold: 4,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-0',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaaa#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-1',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaab#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-2',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaac#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-3',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaad#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-4',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaae#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-5',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaaf#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-6',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaag#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-7',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaah#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#active-8',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaai#active',
                },
                weight: 1,
              },
            ],
            relationshipParent: ['did:eosio:eos:eoscanadacom#owner'],
          },
          {
            id: 'did:eosio:eos:eoscanadacom#blacklistops',
            controller: 'did:eosio:eos:eoscanadacom',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#blacklistops-0',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'dLOnSPgih47eVwlWAlrcm4wD1cJnjc-Jh_UFdlb29mw',
                    y: 'vwsVDd__tmPumdQ2Yo-TdozxbhGnyDMg3Htd52-SEw0',
                    kid:
                      'PUB_K1_7idX86zQ6M3mrzkGQ9MGHf4btSECmcTj4i8Le59ga7CpLxRu4s',
                  },
                },
                weight: 1,
              },
            ],
            relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
          },
          {
            id: 'did:eosio:eos:eoscanadacom#claimer',
            controller: 'did:eosio:eos:eoscanadacom',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#claimer-0',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'RnFk1oqh28hDY2WHWUhQzAZYXjfvv0oR43h69RCCkIA',
                    y: 'e8aXe3M9xKgYsj6U-KOonbgEtjHGPDtAUavq9nY4lI8',
                    kid:
                      'PUB_K1_7NFuBesBKK5XHHLtzFxm7S57Eq11gUtndrsvq3Mt3XZNNT5cXo',
                  },
                },
                weight: 1,
              },
            ],
            relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
          },
          {
            id: 'did:eosio:eos:eoscanadacom#day2day',
            controller: 'did:eosio:eos:eoscanadacom',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#day2day-0',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaaa#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#day2day-1',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaac#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#day2day-2',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaaf#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#day2day-3',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaag#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#day2day-4',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaah#active',
                },
                weight: 1,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#day2day-5',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaai#active',
                },
                weight: 1,
              },
            ],
            relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
          },
          {
            id: 'did:eosio:eos:eoscanadacom#eosforumdapp',
            controller: 'did:eosio:eos:eoscanadacom',
            type: 'VerifiableCondition',
            threshold: 1,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#eosforumdapp-0',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  publicKeyJwk: {
                    crv: 'secp256k1',
                    kty: 'EC',
                    x: 'XWelm_LA5OvSwDPBQT_dwxWZ1Li1BiYbP3w2yhkcb6k',
                    y: 'wfydp1B25ylTsaR-W1Wld6TVLnJHXGgC7AgJ50Y0FHM',
                    kid:
                      'PUB_K1_7YNS1swh6QWANkzGgFrjiX8E3u8WK5CK9GMAb6EzKVNZKnMUfs',
                  },
                },
                weight: 1,
              },
            ],
            relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
          },
          {
            id: 'did:eosio:eos:eoscanadacom#owner',
            controller: 'did:eosio:eos:eoscanadacom',
            type: 'VerifiableCondition',
            threshold: 5,
            conditionWeightedThreshold: [
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#owner-0',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaaa#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#owner-1',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaab#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#owner-2',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaac#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#owner-3',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaad#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#owner-4',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaae#active',
                },
                weight: 2,
              },
              {
                condition: {
                  id: 'did:eosio:eos:eoscanadacom#owner-5',
                  controller: 'did:eosio:eos:eoscanadacom',
                  type: 'VerifiableCondition',
                  conditionDelegated: 'id:eosio:eos::eoscanadaaaf#active',
                },
                weight: 1,
              },
            ],
          },
        ],
        service: [
          {
            id: 'https://eos.greymass.com',
            type: 'LinkedDomains',
            serviceEndpoint: 'https://eos.greymass.com',
          },
          {
            id: 'https://eos.dfuse.eosnation.io',
            type: 'LinkedDomains',
            serviceEndpoint: 'https://eos.dfuse.eosnation.io',
          },
        ],
      },
      didDocumentMetadata: {},
    },
  },
  {
    did: 'did:wrongdidschema',
    expectedResult: {
      didResolutionMetadata: { error: 'invalidDid' },
      didDocument: null,
      didDocumentMetadata: {},
    },
  },
  {
    did: 'did:eosio:unknownchainid',
    expectedResult: {
      didResolutionMetadata: { error: 'invalidDid' },
      didDocument: null,
      didDocumentMetadata: {},
    },
  },
  {
    did: 'did:eosio:eos:unknownacc',
    expectedResult: {
      didResolutionMetadata: { error: 'notFound' },
      didDocument: null,
      didDocumentMetadata: {},
    },
  },
  {
    did: 'did:eosio:eos:invalidaccountname',
    expectedResult: {
      didResolutionMetadata: { error: 'invalidDid' },
      didDocument: null,
      didDocumentMetadata: {},
    },
  },
];
