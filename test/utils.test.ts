const BNasn1 = require('asn1.js').bignum;
import { bnToBase64Url } from '../src/utils';
//	Buffer = require('safe-buffer').Buffer;
import BN from "bn.js";

// copied from https://github.com/Brightspace/node-jwk-to-pem/blob/master/src/b64-to-bn.js
// to compare against this implementation
function base64ToBigNum(val: string) {
    var buf = Buffer.from(val, 'base64');
    var bn = val = new BNasn1(buf, 10, 'be').iabs();
    return bn;
};

describe('EOSIO resolver utilities', () => {
    it('Converts a BN to a base64url', async () => {
        const bigNumStart = new BN("1234567890");
        const base64url = bnToBase64Url(bigNumStart);
        const bigNumEnd = base64ToBigNum(base64url);

        expect(bigNumStart.toString() === bigNumEnd.toString());
    })
})