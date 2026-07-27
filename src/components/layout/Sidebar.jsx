import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const conceptNavItems = [
  {
    path: '/',
    label: 'Overview Hub',
    icon: '🏠',
    badge: 'Guide',
    badgeColor: 'badge-blue',
  },
  {
    path: '/custom-state',
    label: 'Custom useState Hook',
    icon: '🪝',
    badge: 'Hook Internals',
    badgeColor: 'badge-purple',
  },
  {
    path: '/context-api',
    label: 'Context API',
    icon: '🌐',
    badge: 'React 19',
    badgeColor: 'badge-green',
  },
  {
    path: '/memo-callback',
    label: 'Memo & useCallback',
    icon: '⚡',
    badge: 'Performance',
    badgeColor: 'badge-amber',
  },
  {
    path: '/reducer-counter',
    label: 'useReducer (Counter)',
    icon: '🔄',
    badge: 'State',
    badgeColor: 'badge-indigo',
  },
  {
    path: '/shopping-cart',
    label: 'Shopping Cart Reducer',
    icon: '🛒',
    badge: 'Complex State',
    badgeColor: 'badge-pink',
  },
  {
    path: '/class-components',
    label: 'Class Components',
    icon: '📜',
    badge: 'Legacy React',
    badgeColor: 'badge-amber',
  },
  {
    path: '/react-router',
    label: 'React Router v6/v7',
    icon: '🛣️',
    badge: 'Routing',
    badgeColor: 'badge-blue',
  },
  {
    path: '/react-19-features',
    label: 'React 19 Highlights',
    icon: '🚀',
    badge: 'New Features',
    badgeColor: 'badge-cyan',
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-badge">⚛️</div>
        <div>
          <h1 className="sidebar-title">React 19 Core</h1>
          <p className="sidebar-subtitle">Interactive Student Portal</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">CONCEPTS & LABS</div>
        {conceptNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
            end={item.path === '/'}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && (
              <span className={`nav-badge ${item.badgeColor}`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="react-version-chip">
          <span className="dot pulse"></span> React v19.2.0 Active
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
