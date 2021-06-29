import base64url from 'base64url';
import BN from 'bn.js';

// "integers are represented using the base64url encoding of their big-endian representations"
// https://datatracker.ietf.org/doc/html/rfc7517#appendix-A.1
export function bnToBase64Url(bn: BN): string {
  const buffer = bn.toArrayLike(Buffer, 'be');
  return base64url(buffer);
}
