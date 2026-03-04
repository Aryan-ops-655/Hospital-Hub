import React, { useContext, useEffect, useState } from "react";
import "./UpdateForm.css";
import { AdminContext } from "../../Context/adminContext";


export default function UpdateForm({ setShowUpdateForm }) {

    const { form, setForm, updater } = useContext(AdminContext)


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updater();
        setShowUpdateForm(false);
    };

    return (
        <div className="overlays">
            <div className="modals">
                <div className="header">
                    <h2>Edit</h2>
                    <span onClick={() => setShowUpdateForm(false)} className="close">X</span>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    {/* Component */}
                    <div className="field">
                        <label>Component Type</label>
                        <select name="component" value={form.component} onChange={handleChange}>
                            <option >Select Component</option>
                            <option>Whole Blood</option>
                            <option>Plasma</option>
                            <option>Platelets</option>
                            <option>Packed RBC</option>
                            <option>Cryo</option>
                        </select>
                    </div>

                    {/* Row */}
                    <div className="row">
                        <div className="field">
                            <label>Blood Group</label>
                            <select name="group" value={form.group} onChange={handleChange}>
                                <option >Select Blood Group</option>
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

                    {/* Dates */}
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

                    {/* Status */}
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

                    {/* Buttons */}
                    <div className="actions">
                        <button onClick={() => setShowUpdateForm(false)} type="button" className="cancel">Cancel</button>
                        <button  onClick={() => handleSubmit} type="submit" className="submit">Update Stock</button>
                    </div>
                </form>
            </div>
        </div>
    );
}