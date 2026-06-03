import React, { useState, useContext } from "react";
import "./Navbar.css";
import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FiMenu className="icon menu-icon" />
        <span className="welcome-text">Welcome, {user ? user.name : "Guest"}</span>
      </div>


      <div className="navbar-right">
        <Link to='/'><img className="menu-list" src={assets.home_icon} alt="Home" /></Link>
        {user ? (
          <div onClick={logout} title="Logout" style={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "5px" }}>
            <FiLogOut size={20} color="#e53e3e" />
          </div>
        ) : (
          <Link to='/login'><img src={assets.user_icon} alt="Login" /></Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

