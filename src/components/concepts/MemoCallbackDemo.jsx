import React, { useState, useCallback } from 'react';
import MemoComponent from '../Section/MemoComponent';

const initialProducts = [
  { id: 1, name: 'React 19 Essentials' },
  { id: 2, name: 'JavaScript Deep Dive' },
  { id: 3, name: 'Web Performance & Hooks' },
  { id: 4, name: 'Next.js App Router' },
];

const MemoCallbackDemo = () => {
  const [productArray, setProductArray] = useState(initialProducts);
  const [filterText, setFilterText] = useState('');

  const toggleProductFilterStatus = () => {
    setProductArray((prev) => {
      if (prev.length === initialProducts.length) {
        return prev.filter((p) => p.id !== 2);
      } else {
        return initialProducts;
      }
    });
  };

  const handleDeleteProductById = useCallback(
    (id) => {
      setProductArray((prev) => prev.filter((product) => product.id !== id));
    },
    [setProductArray]
  );

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>⚡</span>
          <h1 className="concept-title">useMemo & useCallback</h1>
          <span className="nav-badge badge-amber">Optimization</span>
        </div>
        <p className="concept-description">
          Demonstrates optimizing computational work with <code>useMemo</code> (memoizing filtered lists) and preserving function reference identity with <code>useCallback</code> to avoid child component re-renders.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-card-title">🔍 Code Architecture</h3>
        <div className="code-snippet-box">
          {`// useMemo caches expensive array filter operations:
const filterProduct = React.useMemo(() => {
  return products.filter(p => p.name.toLowerCase().includes(filterText));
}, [products, filterText]);

// useCallback returns a memoized version of the callback:
const handleDelete = useCallback((id) => {
  setProductArray(prev => prev.filter(p => p.id !== id));
}, []);`}
        </div>

        <div className="demo-box">
          <h4 style={{ margin: '0 0 1rem 0', color: '#38bdf8' }}>
            Interactive Demo
          </h4>

          <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: '#fff',
                fontSize: '0.9rem',
                flex: 1,
              }}
            />
            <button onClick={toggleProductFilterStatus}>
              Toggle ID #2 Filter
            </button>
            <button onClick={() => setProductArray(initialProducts)}>
              Reset List
            </button>
          </div>

          <div
            style={{
              background: '#1e293b',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h5 style={{ margin: '0 0 0.5rem 0', color: '#94a3b8' }}>
              Filtered Products List (Rendered via MemoComponent):
            </h5>
            <MemoComponent products={productArray} filterText={filterText} />

            <h5 style={{ margin: '1rem 0 0.5rem 0', color: '#94a3b8' }}>
              Actions with useCallback:
            </h5>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {productArray.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => handleDeleteProductById(prod.id)}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                >
                  🗑️ Delete {prod.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoCallbackDemo;
