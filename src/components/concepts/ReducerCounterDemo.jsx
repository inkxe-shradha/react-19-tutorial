import React from 'react';
import ReducerHooks from '../ReducerHookExample';

const ReducerCounterDemo = () => {
  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🔄</span>
          <h1 className="concept-title">useReducer (Basic Counter)</h1>
          <span className="nav-badge badge-indigo">State Management</span>
        </div>
        <p className="concept-description">
          Demonstrates state transition logic using action dispatching and lazy
          initialization functions in <code>useReducer</code>.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-card-title">⚙️ Code & Lazy Initializer</h3>
        <div className="code-snippet-box">
          {`const initLazyInitializer = (initialValue) => {
  console.log('Called ONCE during initial render');
  return initialValue + 100;
};

const [count, dispatch] = useReducer(reducer, initialState, initLazyInitializer);`}
        </div>

        <div className="demo-box">
          <ReducerHooks />
        </div>
      </div>
    </div>
  );
};

export default ReducerCounterDemo;
