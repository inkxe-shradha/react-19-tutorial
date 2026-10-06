import { useCallback, useEffect, useState } from 'react';
import { JwtAuthContext } from '../../context/JwtAuthContext';
import {
  createDemoToken,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  SESSION_KEY,
  validateJwt,
} from '../../utils/jwtDemo';

function restoreSession() {
  try {
    const token = sessionStorage.getItem(SESSION_KEY);
    if (!token)
      return { token: null, message: 'Log in to start a demo session.' };
    const result = validateJwt(token, Date.now(), true);
    if (result.valid)
      return { token, message: 'Valid demo session restored after refresh.' };
    sessionStorage.removeItem(SESSION_KEY);
    return { token: null, message: result.message };
  } catch {
    return {
      token: null,
      message: 'Session storage unavailable. Login will work in memory only.',
    };
  }
}

export default function JwtAuthProvider({ children }) {
  const [session, setSession] = useState(restoreSession);
  console.log('Restored session:', session);
  const [now, setNow] = useState(Date.now);

  const logout = useCallback((message = 'Logged out. Demo token removed.') => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Storage may be blocked; clearing in-memory state still ends the session.
    }
    setSession({ token: null, message });
  }, []);

  useEffect(() => {
    if (!session.token) return;
    const checkSession = () => {
      const currentTime = Date.now();
      setNow(currentTime);
      const result = validateJwt(session.token, currentTime, true);
      if (!result.valid) logout(`Automatically logged out: ${result.message}`);
    };
    const result = validateJwt(session.token, Date.now(), true);
    const expiryDelay = result.valid
      ? result.claims.exp * 1000 - Date.now()
      : 0;
    const expiryTimer = window.setTimeout(
      checkSession,
      Math.max(0, expiryDelay),
    );
    const ticker = window.setInterval(checkSession, 1000);
    window.addEventListener('focus', checkSession);
    window.addEventListener('pageshow', checkSession);
    document.addEventListener('visibilitychange', checkSession);
    return () => {
      window.clearTimeout(expiryTimer);
      window.clearInterval(ticker);
      window.removeEventListener('focus', checkSession);
      window.removeEventListener('pageshow', checkSession);
      document.removeEventListener('visibilitychange', checkSession);
    };
  }, [session.token, logout]);

  function login(email, password, lifetime) {
    if (
      email.trim().toLowerCase() !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      throw new Error(
        'Incorrect demo email or password. Use the credentials shown below.',
      );
    }
    const token = createDemoToken(lifetime);
    let message = 'Logged in with an unsigned demo token.';
    try {
      sessionStorage.setItem(SESSION_KEY, token);
    } catch {
      message =
        'Logged in for this visit only: session storage is unavailable.';
    }
    setNow(Date.now());
    setSession({ token, message });
  }

  const validation = session.token
    ? validateJwt(session.token, now, true)
    : null;
  const isAuthenticated = Boolean(validation?.valid);

  return (
    <JwtAuthContext
      value={{
        token: session.token,
        claims: isAuthenticated ? validation.claims : null,
        isAuthenticated,
        remainingSeconds: isAuthenticated
          ? Math.max(0, Math.ceil(validation.claims.exp - now / 1000))
          : 0,
        message: session.message,
        login,
        logout,
      }}
    >
      {children}
    </JwtAuthContext>
  );
}
