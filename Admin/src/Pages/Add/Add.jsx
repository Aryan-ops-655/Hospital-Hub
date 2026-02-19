import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

export default function Add() {
  const [form, setForm] = useState({
    component: "",
    group: "",
    units: "",
    expiry: "",
    collected: "",
    status: "In Stock"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="header">
          <h2>Add Blood Stock</h2>
          <span className="close"><Link to="/"><img src={assets.cross_icon} alt="" /></Link></span>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          
          <div className="field">
            <label>Component Type</label>
            <select name="component" value={form.component} onChange={handleChange}>
              <option value="">Select Component</option>
              <option>Whole Blood</option>
              <option>Plasma</option>
              <option>Platelets</option>
              <option>Packed RBC</option>
              <option>Cryoprecipitate</option>
            </select>
          </div>

          
          <div className="row">
            <div className="field">
              <label>Blood Group</label>
              <select name="group" value={form.group} onChange={handleChange}>
                <option value="">Select Blood Group</option>
                <option>O-</option>
                <option>O+</option>
                <option>A-</option>
                <option>A+</option>
                <option>B-</option>
                <option>B+</option>
                <option>AB-</option>
                <option>AB+</option>
              </select>
            </div>

            <div className="field">
              <label>Available Units</label>
              <input
                type="number"
                name="units"
                value={form.units}
                onChange={handleChange}
              />
            </div>
          </div>

          
          <div className="row">
            <div className="field">
              <label>Collection Date</label>
              <input
                type="date"
                name="collected"
                value={form.collected}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Expiring Soon</option>
              <option>Frozen</option>
              <option>Expired</option>
            </select>
          </div>

          <div className="actions">
            <button type="button" className="cancel">Cancel</button>
            <button type="submit" className="submit">Add Stock</button>
          </div>
        </form>
      </div>
    </div>
  );
}

