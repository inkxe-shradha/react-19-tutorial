import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReactRouterDemo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [targetPath, setTargetPath] = useState('/class-components');

  const handleProgrammaticNavigation = (e) => {
    e.preventDefault();
    if (targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🛣️</span>
          <h1 className="concept-title">React Router v6 / v7</h1>
          <span className="nav-badge badge-blue">Client Routing</span>
        </div>
        <p className="concept-description">
          React Router enables single-page application (SPA) client-side routing without full browser page reloads. In this tutorial app, React Router manages our two-pane layout, left sidebar links, and active content rendering using <code>&lt;Outlet /&gt;</code>.
        </p>
      </div>

      {/* Core Concepts Card */}
      <div className="concept-card">
        <h3 className="concept-card-title">🧩 React Router Building Blocks</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0f172a', padding: '1.15rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h4 style={{ color: '#38bdf8', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>1. &lt;BrowserRouter&gt;</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Wraps the app and syncs UI with the URL bar using the HTML5 history API (<code>pushState</code>, <code>popstate</code>).
            </p>
          </div>

          <div style={{ background: '#0f172a', padding: '1.15rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h4 style={{ color: '#4ade80', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>2. &lt;Routes&gt; & &lt;Route&gt;</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Matches the current URL path to a React component view. Supports nested layout routes.
            </p>
          </div>

          <div style={{ background: '#0f172a', padding: '1.15rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h4 style={{ color: '#c084fc', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>3. &lt;Outlet /&gt;</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Rendered inside parent layout components (like <code>Layout.jsx</code>) to display child route content dynamically.
            </p>
          </div>

          <div style={{ background: '#0f172a', padding: '1.15rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h4 style={{ color: '#fbbf24', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>4. &lt;NavLink&gt; & Hooks</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Provides active link styling (<code>isActive</code>), <code>useLocation()</code> for route inspection, and <code>useNavigate()</code> for programmatic redirects.
            </p>
          </div>
        </div>

        <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>📄 Code Blueprint in App.jsx</h4>
        <div className="code-snippet-box">
          {`// Router Architecture in App.jsx:
<BrowserRouter>
  <Routes>
    {/* Parent Layout Route containing Sidebar and Top Header */}
    <Route path="/" element={<Layout />}>
      <Route index element={<HomeOverview />} />
      <Route path="custom-state" element={<CustomStateDemo />} />
      <Route path="context-api" element={<ContextDemo />} />
      <Route path="class-components" element={<ClassComponentsDemo />} />
      <Route path="react-router" element={<ReactRouterDemo />} />
      <Route path="react-19-features" element={<React19FeaturesDemo />} />
    </Route>
  </Routes>
</BrowserRouter>`}
        </div>
      </div>

      {/* Interactive Hooks Demo */}
      <div className="concept-card">
        <h3 className="concept-card-title">🧪 Interactive Router Hooks Sandbox</h3>

        <div className="demo-box">
          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem', border: '1px solid #334155' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>📍 Live useLocation() Inspection</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#a5f3fc' }}>
              <div>pathname: <strong>"{location.pathname}"</strong></div>
              <div>search query: <strong>"{location.search || 'none'}"</strong></div>
              <div>hash: <strong>"{location.hash || 'none'}"</strong></div>
              <div>key: <strong>"{location.key}"</strong></div>
            </div>
          </div>

          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#4ade80' }}>⚡ Programmatic Navigation (useNavigate)</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 1rem 0' }}>
              Programmatically change routes using the <code>useNavigate()</code> hook (useful after form submissions, logins, or button clicks).
            </p>

            <form onSubmit={handleProgrammaticNavigation} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <select
                value={targetPath}
                onChange={(e) => setTargetPath(e.target.value)}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              >
                <option value="/">Overview Hub (/)</option>
                <option value="/custom-state">Custom useState (/custom-state)</option>
                <option value="/context-api">Context API (/context-api)</option>
                <option value="/class-components">Legacy Class Components (/class-components)</option>
                <option value="/react-19-features">React 19 Highlights (/react-19-features)</option>
              </select>

              <button type="submit">
                🚀 Navigate to Route
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactRouterDemo;
