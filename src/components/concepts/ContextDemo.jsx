import React, { useState } from 'react';
import { AppContext } from '../../context/AppContext';
import UserContext from '../../context/UserContext';
import Button from '../Button/Button';

const ContextDemo = () => {
  const [listData, setListData] = useState([1, 2, 3, 4]);
  const [user, setUser] = useState({
    name: 'John Doe',
    role: 'Student Developer',
    email: 'john.doe@example.com',
  });

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🌐</span>
          <h1 className="concept-title">React 19 Context API</h1>
          <span className="nav-badge badge-green">React 19 Feature</span>
        </div>
        <p className="concept-description">
          In <strong>React 19</strong>, Context providers can be rendered directly as{' '}
          <code>&lt;Context value=&#123;...&#125;&gt;</code> instead of requiring{' '}
          <code>&lt;Context.Provider value=&#123;...&#125;&gt;</code>.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-card-title">✨ React 19 Context Provider Syntax</h3>
        <div className="code-snippet-box">
          {`// React 19 Syntax: No .Provider needed!
<AppContext value={{ listData, setListData }}>
  <UserContext value={{ user, setUser }}>
    <ChildComponents />
  </UserContext>
</AppContext>`}
        </div>

        <div className="demo-box">
          <h4 style={{ margin: '0 0 1rem 0', color: '#38bdf8' }}>
            Live Context Consumer Demo
          </h4>

          {/* React 19 direct context usage */}
          <AppContext value={{ listData, setListData }}>
            <UserContext value={{ user, setUser }}>
              <div
                style={{
                  background: '#1e293b',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              >
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>User Context Data:</strong> {user.name} ({user.role})
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() =>
                      setUser((u) => ({
                        ...u,
                        name: u.name === 'John Doe' ? 'Alice Smith' : 'John Doe',
                      }))
                    }
                  >
                    Switch User Name
                  </button>
                </div>
              </div>

              <div
                style={{
                  background: '#1e293b',
                  padding: '1rem',
                  borderRadius: '8px',
                }}
              >
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>Nested Consumer Component (Button & Icon):</strong>
                </p>
                <Button />
              </div>
            </UserContext>
          </AppContext>
        </div>
      </div>
    </div>
  );
};

export default ContextDemo;
