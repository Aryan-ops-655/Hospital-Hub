import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  ClipboardList,
  Settings,
  LogOut,
  SearchSlashIcon,
  Table,
} from "lucide-react";
import "../Sidebar/sidebar.css";

const DocSidebar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    window.location.href = "/enter";
  };

  
  const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');


  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/H-logo.png" alt="" style={{height: "40px", borderRadius: "45%"}} />
        <h2 className="logo" style={{display:"grid"}}>
            {doctor?.name ||"Guest"}<span style={{fontSize:"15px", color:"white"}}>{doctor?.email ||"email"}</span>
        </h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/doctor"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <ClipboardList size={20} />
          <span>My Appointment</span>
        </NavLink>

        <NavLink
          to="/not-avilable"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Table size={20} />
          <span>My Sessions</span>
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Activity size={20} />
          <span>My Patients</span>
        </NavLink>

        <NavLink
          to="/doc-settings"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Settings size={20} />
          <span>Settings</span>
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

export default DocSidebar;
