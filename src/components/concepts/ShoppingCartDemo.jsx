import React from 'react';
import ShoppingCartReducers from '../ShoppingCartReducer';

const ShoppingCartDemo = () => {
  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>🛒</span>
          <h1 className="concept-title">Shopping Cart Reducer</h1>
          <span className="nav-badge badge-pink">Complex Reducer</span>
        </div>
        <p className="concept-description">
          A practical application of <code>useReducer</code> managing complex
          state: adding items, calculating total item quantities, dynamically
          computing order totals, and updating nested array structures.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-card-title">📦 Complex Reducer State</h3>
        <div className="code-snippet-box">
          {`const initialState = {
  items: [], // [{ id, name, price, quantity }]
  totalAmount: 0,
  totalItems: 0,
};

dispatch({ type: 'ADD_ITEM', payload: product });`}
        </div>

        <div className="demo-box">
          <ShoppingCartReducers />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartDemo;
