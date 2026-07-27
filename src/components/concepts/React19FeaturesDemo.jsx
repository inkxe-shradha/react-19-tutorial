import React, { useActionState, useState } from 'react';

// Example React 19 Action Function
async function updateUsernameAction(previousState, formData) {
  const newName = formData.get('username');
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!newName || newName.length < 3) {
    return { error: 'Username must be at least 3 characters long', name: previousState.name };
  }
  return { error: null, name: newName };
}

const React19FeaturesDemo = () => {
  // React 19 useActionState hook
  const [state, formAction, isPending] = useActionState(updateUsernameAction, {
    error: null,
    name: 'Student Learner',
  });

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🚀</span>
          <h1 className="concept-title">React 19 Core Highlights</h1>
          <span className="nav-badge badge-cyan">v19 Features</span>
        </div>
        <p className="concept-description">
          React 19 introduces ground-breaking improvements to form handling (Actions), context usage, reference passing, and build optimizations.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-card-title">1️⃣ Actions & useActionState</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          React 19 includes built-in support for async transitions and form submissions via <code>useActionState</code>. It automatically tracks <code>isPending</code> states and errors!
        </p>

        <div className="demo-box">
          <h4 style={{ margin: '0 0 0.75rem 0', color: '#38bdf8' }}>
            Live Action Demo (Form Submission)
          </h4>
          <p style={{ margin: '0 0 1rem 0', color: '#cbd5e1' }}>
            Current Profile Name: <strong>{state.name}</strong>
          </p>

          <form action={formAction} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input
              type="text"
              name="username"
              placeholder="Enter new username..."
              defaultValue=""
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: '#fff',
                fontSize: '0.9rem',
              }}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? '⏳ Saving...' : 'Update Name'}
            </button>
          </form>

          {state.error && (
            <p style={{ color: '#f87171', margin: '0.75rem 0 0 0', fontSize: '0.85rem' }}>
              ⚠️ {state.error}
            </p>
          )}
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-card-title">2️⃣ Major Syntax & API Simplified</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#4ade80', margin: '0 0 0.5rem 0' }}>Context as Provider</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              No more <code>&lt;MyContext.Provider&gt;</code>. Render <code>&lt;MyContext value=&#123;val&#125;&gt;</code> directly.
            </p>
          </div>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#c084fc', margin: '0 0 0.5rem 0' }}>ref as a Prop</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              <code>forwardRef</code> is obsolete! Access <code>ref</code> directly from component props: <code>({'{ ref, label }'})</code>.
            </p>
          </div>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#fbbf24', margin: '0 0 0.5rem 0' }}>The use() Hook</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Read promises & contexts inside loops or conditional statements dynamically with <code>use(resource)</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React19FeaturesDemo;
