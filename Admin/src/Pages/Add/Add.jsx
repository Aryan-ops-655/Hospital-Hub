import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { BACKEND_URL } from "../../../constant";

export default function Add() {
  const URL = BACKEND_URL;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/bBank/add`, form);

      if (response.data.success) {
        setForm({ component: "", group: "", units: "", expiry: "", collected: "", status: "In Stock" });
        toast.success(response.data.message || "Added..");
      } else {
        toast.error(response.data.message,{progressStyle: { background: "blue" }});
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <ToastContainer/>
      <div className="overlay">
        <div className="modal">
          <div className="header">
            <h2>Add Blood Stock</h2>
            <span className="close"><Link to="/"><img src={assets.cross_icon} alt="" /></Link></span>
          </div>

          <form className="form" onSubmit={handleSubmit}>

            <div className="field">
              <label>Component Type</label>
              <select name="component" value={form.component} onChange={handleChange} required={true}>
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
                <select name="group" value={form.group} onChange={handleChange} required={true}>
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
                <input required={true}
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
                <input required={true}
                  type="date"
                  name="collected"
                  value={form.collected}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Expiry Date</label>
                <input required={true}
                  type="date"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange} required={true}>
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
    </>
  );
}

