import { useState } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useJwtAuth } from '../../context/JwtAuthContext';
import { DEMO_EMAIL, DEMO_PASSWORD, validateJwt } from '../../utils/jwtDemo';
import './JwtAuthDemo.css';

export function JwtProtectedRoute() {
  const { isAuthenticated } = useJwtAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/jwt-auth" replace />;
}

export function JwtDashboard() {
  const { claims } = useJwtAuth();
  return (
    <section className="demo-box jwt-protected">
      <h3>Protected demo dashboard</h3>
      <p>
        Welcome, <strong>{claims.name}</strong>. This nested route is visible
        only while the demo session is active.
      </p>
      <p>
        Subject: <code>{claims.sub}</code> · Email: {claims.email}
      </p>
      <p>
        This route guard controls UI only; it does not authorize backend
        requests.
      </p>
    </section>
  );
}

export default function JwtAuthDemo() {
  const auth = useJwtAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState('');
  const [lifetime, setLifetime] = useState(60);
  const [error, setError] = useState('');
  const [candidate, setCandidate] = useState('');
  const [inspection, setInspection] = useState(null);

  function handleLogin(event) {
    event.preventDefault();
    setError('');
    try {
      auth.login(email, password, lifetime);
      setPassword('');
      navigate('/jwt-auth/dashboard');
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  function inspectToken(event) {
    event.preventDefault();
    setInspection(validateJwt(candidate.trim()));
  }

  return (
    <div className="concept-container jwt-demo">
      <header className="concept-header">
        <div className="concept-header-top">
          <span aria-hidden="true">🔐</span>
          <h1 className="concept-title">JWT Authentication Lab</h1>
          <span className="nav-badge badge-amber">Frontend demo</span>
        </div>
        <p className="concept-description">
          Explore login, JWT claim checks, protected routes, session
          restoration, and automatic logout on token expiry.
        </p>
      </header>

      <aside className="jwt-warning">
        <strong>Decoding is not verification.</strong> This lab uses unsigned
        mock JWTs (<code>alg: none</code>) and public demo credentials. No real
        account or server authentication is involved. A backend must verify the
        signature, allowed algorithm, issuer, audience, and expiry before
        serving protected data. Never embed signing secrets in frontend code or
        accept unsigned tokens in production.
      </aside>

      <div className="jwt-grid">
        <section className="concept-card">
          <h2 className="concept-card-title">1. Login & session lifecycle</h2>
          <p className="jwt-status" role="status">
            {auth.message}
          </p>
          {auth.isAuthenticated ? (
            <div className="jwt-session">
              <span className="nav-badge badge-green">Demo session active</span>
              <h3>{auth.claims.name}</h3>
              <p>{auth.claims.email}</p>
              <div className="jwt-countdown">
                <strong>{auth.remainingSeconds}s</strong>
                <span>until automatic logout</span>
              </div>
              <progress
                aria-label="Time remaining in demo session"
                max={auth.claims.exp - auth.claims.iat}
                value={auth.remainingSeconds}
              />
              <p>
                Expires at{' '}
                {new Date(auth.claims.exp * 1000).toLocaleTimeString()}
              </p>
              <div className="jwt-actions">
                <Link className="jwt-link" to="/jwt-auth/dashboard">
                  Open protected dashboard
                </Link>
                <button type="button" onClick={() => auth.logout()}>
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="jwt-form">
              <label htmlFor="jwt-email">Email</label>
              <input
                id="jwt-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="jwt-password">Password</label>
              <input
                id="jwt-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="jwt-lifetime">Token lifetime</label>
              <select
                id="jwt-lifetime"
                value={lifetime}
                onChange={(event) => setLifetime(Number(event.target.value))}
              >
                <option value={15}>15 seconds — quick auto-logout test</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
              {error && (
                <p className="jwt-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit">Log in to demo</button>
              <p className="jwt-credentials">
                Demo email: <code>{DEMO_EMAIL}</code>
                <br />
                Demo password: <code>{DEMO_PASSWORD}</code>
              </p>
              <Link className="jwt-link" to="/jwt-auth/dashboard">
                Try the protected route while logged out →
              </Link>
            </form>
          )}
        </section>

        <section className="concept-card">
          <h2 className="concept-card-title">2. Inspect a JWT</h2>
          <p>
            Check structure, <code>exp</code>, <code>nbf</code>, and{' '}
            <code>iat</code>. Times use seconds, not milliseconds. Inspecting a
            token does not log you in.
          </p>
          <form className="jwt-form" onSubmit={inspectToken}>
            <label htmlFor="jwt-candidate">JWT token</label>
            <textarea
              id="jwt-candidate"
              rows={5}
              maxLength={16384}
              value={candidate}
              onChange={(event) => {
                setCandidate(event.target.value);
                setInspection(null);
              }}
              placeholder="Paste a token or load your demo token"
              required
              spellCheck={false}
            />
            <div className="jwt-actions">
              <button type="submit">Check claims</button>
              <button
                type="button"
                disabled={!auth.token}
                onClick={() => {
                  setCandidate(auth.token);
                  setInspection(null);
                }}
              >
                Load demo token
              </button>
            </div>
          </form>
          {inspection && (
            <div
              className={
                inspection.valid ? 'jwt-result' : 'jwt-result jwt-error'
              }
              role="status"
            >
              <strong>{inspection.message}</strong>
              {inspection.valid && (
                <pre>
                  {JSON.stringify(
                    { header: inspection.header, payload: inspection.claims },
                    null,
                    2,
                  )}
                </pre>
              )}
            </div>
          )}
        </section>
      </div>

      <Outlet />
      {!auth.isAuthenticated && location.pathname === '/jwt-auth' && (
        <div className="demo-box">
          <strong>Protected dashboard locked.</strong> Log in above to access
          the nested dashboard route.
        </div>
      )}

      <section className="concept-card">
        <h2 className="concept-card-title">3. What to test</h2>
        <ol className="jwt-checklist">
          <li>Try an incorrect password: login is rejected.</li>
          <li>Choose 15 seconds and log in: the protected dashboard opens.</li>
          <li>
            Refresh: a valid token is restored from this tab’s session storage.
          </li>
          <li>
            Navigate to another tutorial: the expiry watcher keeps running.
          </li>
          <li>
            Wait for expiry or return to a sleeping tab: the session is cleared
            and the protected route redirects to login.
          </li>
          <li>Log out manually: stored and in-memory tokens are cleared.</li>
        </ol>
        <p className="concept-description">
          Production: obtain tokens from an authentication server over HTTPS,
          prefer secure HttpOnly cookies where appropriate, validate every API
          request on the server, and clear client state on 401 responses.
          Client-side logout alone does not revoke an already issued token.
        </p>
      </section>
    </div>
  );
}
