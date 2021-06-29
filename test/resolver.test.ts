import { Resolver } from 'did-resolver';
import { getResolver } from '../src/index';
import fetch from 'node-fetch';
import { testDids } from './testDids';

jest.setTimeout(10000);

describe('resolver tests', () => {
  const resolver = new Resolver(getResolver());
  const responses = testDids.map(({ did, expectedResult }) => ({
    did,
    expectedResult,
    asyncResponse: resolver.resolve(did, { fetch }),
  }));
  describe('Dids resolve to DIDResolutionResult', () => {
    responses.forEach(({ did, asyncResponse }) => {
      it(`did: ${did}`, () =>
        asyncResponse.then(response => {
          expect(response).toHaveProperty('didDocument');
          expect(response).toHaveProperty('didDocumentMetadata');
          expect(response).toHaveProperty('didResolutionMetadata');
        }));
    });
  });
  describe('didResolutionMetadata matches contentType if didDocument is present', () => {
    responses.forEach(({ did, asyncResponse }) => {
      it(`did: ${did}`, () =>
        asyncResponse.then(response => {
          if (response.didDocument)
            expect(response.didResolutionMetadata).toEqual({
              contentType: 'application/did+ld+json',
            });
        }));
    });
  });
  describe('didResolutionMetadata has error if and only if didDocument is null', () => {
    responses.forEach(({ did, asyncResponse, expectedResult }) => {
      it(`did: ${did}`, () =>
        asyncResponse.then(response => {
          if (response.didDocument === null)
            expect(response.didResolutionMetadata).toHaveProperty('error');
          else if ('error' in response.didResolutionMetadata)
            expect(response.didDocument).toEqual(null);
        }));
    });
  });
  describe('response matches expected results exactly', () => {
    responses.forEach(({ did, asyncResponse, expectedResult }) => {
      it(`did: ${did}`, () =>
        asyncResponse.then(response => {
          expect(response).toEqual(expectedResult);
        }));
    });
  });
});
