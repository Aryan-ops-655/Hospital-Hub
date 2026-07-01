import React, { useContext } from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Layout.css';
import { useState } from 'react';
import DocSidebar from './DocSidebar/DocSidebar';

const Layout = ({ children }) => {
  const hospital = JSON.parse(localStorage.getItem('hospital') || '{}');
  const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
  
  const type = localStorage.getItem("type");

  const date = new Date().toISOString().split('T')[0];

  return (
    <div className="layout">
      
      { type=="doctor"?<DocSidebar/>:<Sidebar />}
      <div className="main-content">
        <header className="top-header">
          <div className="header-info">
            <h1>Welcome, {type=="doctor"?doctor.fullName||"Guest":hospital.name || 'Hospital Admin'}</h1>
            <p>Managing your healthcare services made simple.</p>
          </div>
          <div className="user-profile">
            <div className="date">
              <p style={{fontSize:"12px"}}>Today's Date</p>
              <p style={{fontSize:"18px", fontWeight:"600"}}>{date}</p>
            </div>
            <hr style={{height:"40px"}}/>
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
