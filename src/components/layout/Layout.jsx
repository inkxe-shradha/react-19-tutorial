import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="top-header">
          <div className="breadcrumb">
            <span>Tutorial</span> &gt;{' '}
            <span className="current-route">
              {location.pathname === '/'
                ? 'Overview'
                : location.pathname.substring(1).replace('-', ' ')}
            </span>
          </div>
          <div className="header-status">
            <span className="status-pill">Interactive Sandbox</span>
          </div>
        </header>
        <div className="content-view">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
