import React, { useState, useTransition, useDeferredValue } from 'react';

// Heavy List Component for useDeferredValue & useTransition Demos
function HeavyItemList({ query }) {
  // Generate 8,000 items to simulate heavy computation
  const items = Array.from({ length: 6000 }, (_, i) => `React 19 Concept Item #${i + 1}`);
  const filtered = query
    ? items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : items.slice(0, 30);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', padding: '0.5rem', background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b' }}>
      {filtered.map((item, index) => (
        <div key={index} style={{ padding: '0.35rem 0.6rem', background: '#1e293b', borderRadius: '4px', fontSize: '0.8rem', color: '#38bdf8' }}>
          {item}
        </div>
      ))}
    </div>
  );
}

const ConcurrentHooksDemo = () => {
  // 1. useTransition Hook State
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState('fast');

  // 2. useDeferredValue Hook State
  const [textInput, setTextInput] = useState('');
  // Defer the search query update so typing remains silky smooth!
  const deferredQuery = useDeferredValue(textInput);
  const isStale = textInput !== deferredQuery;

  const handleTabSwitch = (tab) => {
    startTransition(() => {
      // Mark heavy tab transition as low priority!
      setActiveTab(tab);
    });
  };

  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '1.75rem' }}>⚡</span>
          <h1 className="concept-title">Concurrent React Hooks</h1>
          <span className="nav-badge badge-amber">Concurrency</span>
        </div>
        <p className="concept-description">
          Learn how Concurrent React keeps your UI smooth during heavy rendering workloads using 
          <code>useTransition</code>, <code>useDeferredValue</code>, and <code>useEffectEvent</code>.
        </p>
      </div>

      {/* 1. useDeferredValue Hook */}
      <div className="concept-card">
        <h3 className="concept-card-title">1️⃣ useDeferredValue (Non-blocking Search Input)</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <code>useDeferredValue</code> defers updating a heavy list computation while keeping the input field immediately responsive as the user types.
        </p>

        <div className="demo-box">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
              Type in search box to filter 6,000 items:
            </label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Search items (e.g. 50)..."
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

          <div style={{ opacity: isStale ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            {isStale && <span style={{ fontSize: '0.8rem', color: '#fbbf24', display: 'block', marginBottom: '0.5rem' }}>⏳ Deferring list update...</span>}
            <HeavyItemList query={deferredQuery} />
          </div>
        </div>
      </div>

      {/* 2. useTransition Hook */}
      <div className="concept-card">
        <h3 className="concept-card-title">2️⃣ useTransition (Non-blocking State Transitions)</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <code>useTransition</code> lets you mark state updates as non-blocking transitions so the UI doesn't freeze during heavy page tab switches.
        </p>

        <div className="demo-box">
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <button
              onClick={() => handleTabSwitch('fast')}
              style={{ background: activeTab === 'fast' ? '#38bdf8' : '#1e293b', color: activeTab === 'fast' ? '#0f172a' : '#fff' }}
            >
              Fast Tab
            </button>
            <button
              onClick={() => handleTabSwitch('heavy')}
              style={{ background: activeTab === 'heavy' ? '#38bdf8' : '#1e293b', color: activeTab === 'heavy' ? '#0f172a' : '#fff' }}
            >
              Heavy Data Tab {isPending && '⏳'}
            </button>
          </div>

          {isPending && <p style={{ color: '#fbbf24', fontSize: '0.85rem' }}>⏳ Transitioning to heavy tab without freezing UI...</p>}

          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
            {activeTab === 'fast' ? (
              <p style={{ margin: 0, color: '#4ade80' }}>⚡ Lightweight Fast Tab View</p>
            ) : (
              <div>
                <p style={{ margin: '0 0 0.5rem 0', color: '#c084fc' }}>📊 Heavy Data Grid View:</p>
                <HeavyItemList query="React" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. useEffectEvent Concept */}
      <div className="concept-card">
        <h3 className="concept-card-title">3️⃣ useEffectEvent Concept</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          React 19 introduces <code>useEffectEvent</code> to extract non-reactive event logic out of your <code>useEffect</code> dependencies so effects don't re-trigger unnecessarily.
        </p>
        <div className="code-snippet-box">
          {`// React 19 useEffectEvent abstraction:
const onNotification = useEffectEvent((theme) => {
  showNotification(theme, roomName); // Reads roomName without requiring it as effect dependency!
});

useEffect(() => {
  const connection = connect(roomName);
  connection.on('message', onNotification);
  return () => connection.disconnect();
}, [roomName]);`}
        </div>
      </div>
    </div>
  );
};

export default ConcurrentHooksDemo;
