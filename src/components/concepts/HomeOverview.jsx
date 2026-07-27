import React from 'react';
import { Link } from 'react-router-dom';

const overviewItems = [
  {
    path: '/custom-hooks',
    title: 'Custom Hooks & DOM Utilities',
    icon: '📏',
    category: 'Custom Hooks',
    description:
      'Learn useWindowSize screen watcher, useDebugValue DevTools label, useRef DOM access, useLayoutEffect measurement, and useId accessibility.',
  },
  {
    path: '/react-19-hooks',
    title: 'React 19 New Hooks Suite',
    icon: '🚀',
    category: 'React 19 Core',
    description:
      'Master React 19 flagship hooks: use() promise unwrapping, useActionState form actions, useOptimistic instant UI, and Suspense fallback.',
  },
  {
    path: '/concurrent-hooks',
    title: 'Concurrent React Hooks',
    icon: '⚡',
    category: 'Concurrency',
    description:
      'Master high-performance rendering with useTransition non-blocking tabs, useDeferredValue search input, and useEffectEvent concepts.',
  },
  {
    path: '/custom-state',
    title: 'Custom useState Hook',
    icon: '🪝',
    category: 'Custom Hooks',
    description:
      'Understanding state management internals by implementing custom useState on top of React useReducer with state closures.',
  },
  {
    path: '/context-api',
    title: 'React 19 Context API',
    icon: '🌐',
    category: 'State & Props',
    description:
      'Explore React 19 simplified context syntax: rendering <Context value={...}> directly without Provider wrappers.',
  },
  {
    path: '/memo-callback',
    title: 'useMemo & useCallback',
    icon: '🧠',
    category: 'Performance',
    description:
      'Learn how to prevent unnecessary child re-renders and heavy calculations with memoization and stable callback functions.',
  },
  {
    path: '/reducer-counter',
    title: 'useReducer (Basic Counter)',
    icon: '🔄',
    category: 'State Management',
    description:
      'State transition handling with actions, dispatchers, and lazy initialization functions in useReducer.',
  },
  {
    path: '/shopping-cart',
    title: 'Shopping Cart Reducer',
    icon: '🛒',
    category: 'Complex Reducer',
    description:
      'Real-world state management pattern using useReducer for managing arrays, totals, quantities, and item additions.',
  },
  {
    path: '/class-components',
    title: 'Legacy Class Components',
    icon: '📜',
    category: 'Legacy React',
    description:
      'Master class-based components, ES6 class state (this.state/this.setState), and lifecycle methods (componentDidMount, componentDidUpdate).',
  },
  {
    path: '/react-router',
    title: 'React Router v6/v7 Architecture',
    icon: '🛣️',
    category: 'Client Routing',
    description:
      'Master Single Page Application (SPA) navigation: BrowserRouter, Routes, Route, Outlet, NavLink, useLocation, and useNavigate.',
  },
  {
    path: '/react-19-features',
    title: 'React 19 Core Highlights',
    icon: '✨',
    category: 'New Release',
    description:
      'Overview of React 19 upgrades: actions, context providers as elements, server functions, and automatic compiler optimization.',
  },
];

const HomeOverview = () => {
  return (
    <div className="concept-container">
      <div className="concept-header">
        <div className="concept-header-top">
          <span style={{ fontSize: '2.2rem' }}>🎓</span>
          <div>
            <h1 className="concept-title">React 19 Masterclass & Interactive Lab</h1>
            <p className="concept-subtitle" style={{ color: '#38bdf8', fontSize: '0.9rem', margin: '0.2rem 0 0 0', fontWeight: 600 }}>
              Complete Student Guide to Modern Hooks, Concurrent Rendering & React 19 APIs
            </p>
          </div>
        </div>
        <p className="concept-description">
          Welcome to your ultimate interactive React tutorial hub! Browse through the topics in the left navigation sidebar or select a card below to explore live working components, side-by-side code breakdowns, and React 19 features.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {overviewItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="concept-card"
              style={{
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#38bdf8';
                e.currentTarget.style.boxShadow = '0 12px 30px -5px rgba(56, 189, 248, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                <span className="nav-badge badge-blue">{item.category}</span>
              </div>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                  color: '#f8fafc',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#94a3b8',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeOverview;
