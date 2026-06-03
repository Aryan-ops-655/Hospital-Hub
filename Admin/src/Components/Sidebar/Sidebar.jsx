import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Droplet, 
  Activity, 
  Truck, 
  ClipboardList, 
  Settings,
  LogOut
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hospital');
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">HMS<span>Hub</span></h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/beds" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Database size={20} />
          <span>Manage Beds</span>
        </NavLink>
        
        <NavLink to="/blood" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Droplet size={20} />
          <span>Blood Bank</span>
        </NavLink>
        
        <NavLink to="/tests" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Activity size={20} />
          <span>Lab Tests</span>
        </NavLink>
        
        <NavLink to="/ambulances" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Truck size={20} />
          <span>Ambulances</span>
        </NavLink>
        
        <NavLink to="/requests" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <ClipboardList size={20} />
          <span>Requests</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div className="nav-item logout" onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
