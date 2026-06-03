import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const hospital = JSON.parse(localStorage.getItem('hospital') || '{}');

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <header className="top-header">
          <div className="header-info">
            <h1>Welcome, {hospital.name || 'Hospital Admin'}</h1>
            <p>Managing your healthcare services made simple.</p>
          </div>
          <div className="user-profile">
            <div className="avatar">
              {hospital.name ? hospital.name.charAt(0).toUpperCase() : 'H'}
            </div>
          </div>
        </header>
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
