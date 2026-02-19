import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [user, setUser] = useState("Aryan");



  return (
    <div className="navbar">
      <div className="nav-left">
        <p>Blood & Component Inventory</p>
      </div>
      <div className="nav-right">
        <div className="stock-details">
          <Link to='/add'><button className="add">Add New Stock</button></Link>
          <button>Manage Expiry</button>
        </div>
        <hr />
        <div className="user-details">
          <img src={assets.bell_icon} alt="" />
          <div className="admin">
            <img src={assets.user_icon} alt="" />
            <p>Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;

