import React from 'react';
import useStateCustom from '../../hooks/customUseState';

const CustomStateDemo = () => {
  const [listData, setListData] = useStateCustom([10, 20, 30, 40, 50]);
  const [counter, setCounter] = useStateCustom(0);

  const addItem = () => {
    setListData((prev) => [...prev, (prev[prev.length - 1] || 0) + 10]);
  };

  const removeItem = () => {
    setListData((prev) => prev.slice(0, -1));
  };

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🪝</span>
          <h1 className="concept-title">Custom useState Hook</h1>
          <span className="nav-badge badge-purple">Custom Hook</span>
        </div>
        <p className="concept-description">
          Demonstrates how React state can be implemented under the hood using{' '}
          <code>useReducer</code>. This custom hook supports both direct state values and updater functions (e.g.{' '}
          <code>setCount(prev =&gt; prev + 1)</code>).
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-card-title">💡 How it works</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          File: <code>src/hooks/customUseState.js</code>
        </p>
        <div className="code-snippet-box">
          {`const useStateCustom = (initialValue) => {
  const reducer = (state, action) => {
    if (typeof action === 'function') return action(state);
    return action;
  };
  const [state, dispatch] = useReducer(reducer, initialValue, init);
  return [state, dispatch];
};`}
        </div>

        <div className="demo-box">
          <h4 style={{ margin: '0 0 1rem 0', color: '#38bdf8' }}>
            Interactive Demo (Array State)
          </h4>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <button onClick={addItem}>➕ Add Item</button>
            <button onClick={removeItem}>➖ Remove Last Item</button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <strong>Current List Items ({listData.length}):</strong>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem',
              }}
            >
              {listData.map((item, index) => (
                <span
                  key={index}
                  style={{
                    background: '#334155',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                  }}
                >
                  Value: {item}
                </span>
              ))}
            </div>
          </div>

          <hr style={{ borderColor: '#334155', margin: '1.5rem 0' }} />

          <h4 style={{ margin: '0 0 1rem 0', color: '#38bdf8' }}>
            Interactive Demo (Numeric State)
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setCounter((c) => c + 1)}>
              Increment ({counter})
            </button>
            <button onClick={() => setCounter(0)}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomStateDemo;
