import React, { useState } from "react";
import "./Navbar.css";
import { FiMenu, FiBell, FiMessageCircle } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [user, setUser] = useState("Aryan");



  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FiMenu className="icon menu-icon" />
        <span className="welcome-text">Welcome, {user}</span>
      </div>


      <div className="navbar-right">
        <Link to='/'><img className="menu-list" src={assets.home_icon} alt="" /></Link>
        <img className="menu-list" src={assets.search_icon} alt="" />
        <img className="menu-list" src={assets.location_icon} alt="" />
        <img className="menu-list" src={assets.bell_icon} alt="" />
        <img src={assets.user_icon} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;

