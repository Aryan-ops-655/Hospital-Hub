import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../constant';
import { Plus, Edit, Trash2, Truck } from 'lucide-react';
import '../Management.css';

const ManageAmbulances = () => {
    const [ambulances, setAmbulances] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingAmbulance, setEditingAmbulance] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        vehicleNumber: '',
        contact: '',
        pricePerKm: '',
        status: 'Available'
    });

    const token = localStorage.getItem('token');

    const fetchAmbulances = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/service/list-ambulances`, { headers: { token } });
            if (response.data.success) {
                setAmbulances(response.data.data);
            }
        } catch (error) {
            toast.error("Error fetching ambulances");
        }
    };

    useEffect(() => {
        fetchAmbulances();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingAmbulance) {
                response = await axios.post(`${BACKEND_URL}/api/service/update-ambulance`, { ...formData, id: editingAmbulance._id }, { headers: { token } });
            } else {
                response = await axios.post(`${BACKEND_URL}/api/service/add-ambulance`, formData, { headers: { token } });
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setShowModal(false);
                setEditingAmbulance(null);
                setFormData({ type: '', vehicleNumber: '', contact: '', pricePerKm: '', status: 'Available' });
                fetchAmbulances();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Operation failed");
        }
    };

    const handleEdit = (amb) => {
        setEditingAmbulance(amb);
        setFormData({
            type: amb.type,
            vehicleNumber: amb.vehicleNumber,
            contact: amb.contact,
            pricePerKm: amb.pricePerKm,
            status: amb.status
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this ambulance record?")) {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/service/remove-ambulance`, { id }, { headers: { token } });
                if (response.data.success) {
                    toast.success("Ambulance removed");
                    fetchAmbulances();
                }
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div className="management-page">
            <div className="page-header">
                <h2><Truck className="title-icon" /> Ambulance Management</h2>
                <button className="add-btn" onClick={() => { setShowModal(true); setEditingAmbulance(null); }}>
                    <Plus size={18} /> Add New Ambulance
                </button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Vehicle Number</th>
                            <th>Contact</th>
                            <th>Price / KM</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ambulances.map((amb) => (
                            <tr key={amb._id}>
                                <td><strong>{amb.type}</strong></td>
                                <td>{amb.vehicleNumber}</td>
                                <td>{amb.contact}</td>
                                <td>₹{amb.pricePerKm}</td>
                                <td>
                                    <span className={`status-badge ${amb.status.toLowerCase()}`}>
                                        {amb.status}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="edit-icon" onClick={() => handleEdit(amb)}><Edit size={16} /></button>
                                    <button className="delete-icon" onClick={() => handleDelete(amb._id)}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{editingAmbulance ? 'Edit Ambulance' : 'Add New Ambulance'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Ambulance Type (e.g., Basic, ALS, BLS)</label>
                                <input name="type" type="text" value={formData.type} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Vehicle Number</label>
                                    <input name="vehicleNumber" type="text" value={formData.vehicleNumber} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Emergency Contact</label>
                                    <input name="contact" type="text" value={formData.contact} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price Per KM (₹)</label>
                                    <input name="pricePerKm" type="number" value={formData.pricePerKm} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Current Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange}>
                                        <option value="Available">Available</option>
                                        <option value="Busy">Busy</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn">
                                {editingAmbulance ? 'Update Ambulance' : 'Add Ambulance'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAmbulances;
