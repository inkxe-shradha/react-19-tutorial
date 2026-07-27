import React, { useState, useRef, useId, useLayoutEffect } from 'react';
import useWindowSize from '../../hooks/useWindowSize';

const CustomHooksDemo = () => {
  // 1. Custom Hook & useDebugValue
  const { width, height, deviceCategory, isMobile } = useWindowSize();

  // 2. useId Hook: Generates stable, unique IDs for accessible form inputs
  const emailInputId = useId();
  const passwordInputId = useId();
  const helpTextId = useId();

  // 3. useRef Hook: Holds mutable DOM reference & non-rendering render counter
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const renderCountRef = useRef(0);

  // Track re-renders without causing additional state re-renders
  renderCountRef.current += 1;

  // 4. useLayoutEffect Hook: Synchronous layout measurement BEFORE browser paint
  const [boxDimensions, setBoxDimensions] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setBoxDimensions({
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      });
    }
  }, [width, height]);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.borderColor = '#38bdf8';
    }
  };

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🪝</span>
          <h1 className="concept-title">Custom Hooks & DOM Utilities</h1>
          <span className="nav-badge badge-purple">Hooks Suite</span>
        </div>
        <p className="concept-description">
          Demonstrates essential React hooks for DOM interaction, layout measurement, accessibility, and custom hook inspection: 
          <code>useWindowSize</code> (Custom Hook), <code>useDebugValue</code>, <code>useId</code>, <code>useRef</code>, and <code>useLayoutEffect</code>.
        </p>
      </div>

      {/* 1. Custom Hook & useDebugValue */}
      <div className="concept-card">
        <h3 className="concept-card-title">1️⃣ Custom Hook: useWindowSize & useDebugValue</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          File: <code>src/hooks/useWindowSize.js</code>. Uses <code>useDebugValue</code> to display custom status formatted inside React DevTools.
        </p>

        <div className="demo-box">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Window Width</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8' }}>{width}px</div>
            </div>
            <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Window Height</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c084fc' }}>{height}px</div>
            </div>
            <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Device Category</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4ade80', marginTop: '0.25rem' }}>{deviceCategory}</div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.75rem', fontStyle: 'italic' }}>
            💡 Try resizing your browser window to see live screen dimensions update!
          </p>
        </div>
      </div>

      {/* 2. useRef & useLayoutEffect */}
      <div className="concept-card">
        <h3 className="concept-card-title">2️⃣ useRef & useLayoutEffect</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <code>useRef</code> stores persistent values without triggering re-renders, while <code>useLayoutEffect</code> measures DOM layout synchronously <em>before</em> the browser repaints screen frames.
        </p>

        <div className="demo-box">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleFocusInput}>🎯 Focus Input via useRef</button>
            <span style={{ fontSize: '0.85rem', color: '#38bdf8', background: '#0f172a', padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #334155' }}>
              Total Component Re-renders: <strong>{renderCountRef.current}</strong>
            </span>
          </div>

          <div
            ref={boxRef}
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              padding: '1.25rem',
              borderRadius: '10px',
              border: '1px dashed #38bdf8',
            }}
          >
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#38bdf8' }}>
              📏 Measured DOM Container (via useLayoutEffect):
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#f8fafc', fontFamily: 'monospace' }}>
              Width: {boxDimensions.w}px | Height: {boxDimensions.h}px
            </p>
          </div>
        </div>
      </div>

      {/* 3. useId Hook */}
      <div className="concept-card">
        <h3 className="concept-card-title">3️⃣ useId (Accessible Form Unique IDs)</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <code>useId</code> generates unique, hydration-safe IDs for linking <code>&lt;label htmlFor=...&gt;</code> and <code>aria-describedby</code> attributes.
        </p>

        <div className="demo-box">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <div>
              <label htmlFor={emailInputId} style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                Email Address (Generated ID: <code>{emailInputId}</code>):
              </label>
              <input
                ref={inputRef}
                id={emailInputId}
                type="email"
                placeholder="student@example.com"
                aria-describedby={helpTextId}
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              />
              <span id={helpTextId} style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                ID linked safely for screen readers via aria-describedby.
              </span>
            </div>

            <div>
              <label htmlFor={passwordInputId} style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                Password (Generated ID: <code>{passwordInputId}</code>):
              </label>
              <input
                id={passwordInputId}
                type="password"
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomHooksDemo;
