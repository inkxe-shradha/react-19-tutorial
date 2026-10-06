import { jwtDecode } from 'jwt-decode';

export const DEMO_EMAIL = 'student@example.com';
export const DEMO_PASSWORD = 'React19Demo!';
export const SESSION_KEY = 'react19.jwt-demo.session';

// Decoding and checking claims is NOT cryptographic signature verification.
export function validateJwt(token, now = Date.now(), demoOnly = false) {
  try {
    if (typeof token !== 'string' || token.length > 16384) {
      throw new Error('Enter a JWT string (maximum 16 KB).');
    }
    const parts = token.split('.');
    if (
      parts.length !== 3 ||
      !parts[0] ||
      !parts[1] ||
      parts.some((part) => !/^[A-Za-z0-9_-]*$/.test(part))
    ) {
      throw new Error('Malformed JWT: expected three base64url segments.');
    }
    const header = jwtDecode(token, { header: true });
    const claims = jwtDecode(token);
    if (
      !header ||
      typeof header.alg !== 'string' ||
      !header.alg ||
      !claims ||
      typeof claims !== 'object' ||
      Array.isArray(claims)
    ) {
      throw new Error('Invalid JWT header or payload.');
    }
    if (!Number.isFinite(claims.exp)) {
      throw new Error('A numeric exp claim is required for this demo.');
    }
    if (claims.exp <= now / 1000) {
      throw new Error('Token expired. Please log in again.');
    }
    if (
      claims.nbf !== undefined &&
      (!Number.isFinite(claims.nbf) || claims.nbf > now / 1000)
    ) {
      throw new Error('Token is not active yet (nbf).');
    }
    if (
      claims.iat !== undefined &&
      (!Number.isFinite(claims.iat) || claims.iat > now / 1000)
    ) {
      throw new Error('Token has an invalid or future issued-at time (iat).');
    }
    if (
      demoOnly &&
      (header.alg !== 'none' ||
        parts[2] !== '' ||
        claims.iss !== 'react19-demo' ||
        claims.aud !== 'react19-tutorial' ||
        claims.sub !== 'demo-student' ||
        claims.email !== DEMO_EMAIL)
    ) {
      throw new Error('This session is not a supported mock-login token.');
    }
    return {
      valid: true,
      header,
      claims,
      message: 'Client-side checks passed. Signature NOT verified.',
    };
  } catch (error) {
    return { valid: false, message: error.message };
  }
}

function encodeSegment(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  return btoa(String.fromCharCode(...bytes))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '');
}

// Mock issuer only: never sign tokens with a secret embedded in frontend code.
export function createDemoToken(lifetime, now = Date.now()) {
  if (![15, 60, 300].includes(lifetime)) {
    throw new Error('Choose a supported session duration.');
  }
  const issuedAt = Math.floor(now / 1000);
  return `${encodeSegment({ alg: 'none', typ: 'JWT' })}.${encodeSegment({
    sub: 'demo-student',
    name: 'React Student',
    email: DEMO_EMAIL,
    iss: 'react19-demo',
    aud: 'react19-tutorial',
    iat: issuedAt,
    exp: issuedAt + lifetime,
  })}.`;
}
