import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createDemoToken,
  DEMO_EMAIL,
  validateJwt,
} from '../src/utils/jwtDemo.js';

const now = 1800000000000;
const seconds = now / 1000;
const encode = (value) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');
const tokenWith = (claims, header = { alg: 'RS256', typ: 'JWT' }) =>
  `${encode(header)}.${encode(claims)}.c2lnbmF0dXJl`;

test('mock issuer generates the expected short-lived session claims', () => {
  const result = validateJwt(createDemoToken(15, now), now, true);
  assert.equal(result.valid, true);
  assert.equal(result.claims.email, DEMO_EMAIL);
  assert.equal(result.claims.exp, seconds + 15);
  assert.equal(result.header.alg, 'none');
});

test('token expires exactly at exp, not one second later', () => {
  const token = createDemoToken(15, now);
  assert.equal(validateJwt(token, now + 14999, true).valid, true);
  assert.equal(validateJwt(token, now + 15000, true).valid, false);
});

test('rejects malformed tokens without throwing', () => {
  for (const token of [
    null,
    '',
    'abc',
    'a.b',
    'a.b.c.d',
    '@@.bb.cc',
    'e30.e30.',
  ]) {
    assert.equal(validateJwt(token, now).valid, false);
  }
});

test('requires a finite numeric expiration claim', () => {
  for (const exp of [undefined, '1800000015', null]) {
    assert.equal(validateJwt(tokenWith({ exp }), now).valid, false);
  }
});

test('rejects future or malformed nbf and iat claims', () => {
  for (const claim of ['nbf', 'iat']) {
    for (const value of [seconds + 1, 'invalid', null]) {
      assert.equal(
        validateJwt(tokenWith({ exp: seconds + 60, [claim]: value }), now)
          .valid,
        false,
      );
    }
  }
});

test('allows a token whose nbf and iat are exactly now', () => {
  assert.equal(
    validateJwt(
      tokenWith({ exp: seconds + 60, nbf: seconds, iat: seconds }),
      now,
    ).valid,
    true,
  );
});

test('external JWT inspection is not signature verification or demo login', () => {
  const token = tokenWith({ exp: seconds + 60 });
  const result = validateJwt(token, now);
  assert.equal(result.valid, true);
  assert.match(result.message, /Signature NOT verified/);
  assert.equal(validateJwt(token, now, true).valid, false);
});

test('demo sessions require the mock issuer, audience, and identity', () => {
  const parts = createDemoToken(60, now).split('.');
  const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
  for (const key of ['iss', 'aud', 'sub', 'email']) {
    const changed = `${parts[0]}.${encode({ ...claims, [key]: 'other' })}.`;
    assert.equal(validateJwt(changed, now, true).valid, false);
  }
});

test('rejects oversized input and unsupported session lifetimes', () => {
  assert.equal(validateJwt('a'.repeat(16385), now).valid, false);
  assert.throws(() => createDemoToken(0, now), /supported session duration/);
});
