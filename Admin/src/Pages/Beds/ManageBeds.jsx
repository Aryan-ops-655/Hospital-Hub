import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../constant';
import { Plus, Edit, Trash2, Database } from 'lucide-react';
import '../Management.css';

const ManageBeds = () => {
    const [beds, setBeds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingBed, setEditingBed] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        totalUnits: '',
        availableUnits: '',
        price: ''
    });

    const token = localStorage.getItem('token');

    const fetchBeds = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/service/list-beds`, { headers: { token } });
            if (response.data.success) {
                setBeds(response.data.data);
            }
        } catch (error) {
            toast.error("Error fetching beds");
        }
    };

    useEffect(() => {
        fetchBeds();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingBed) {
                response = await axios.post(`${BACKEND_URL}/api/service/update-bed`, { ...formData, id: editingBed._id }, { headers: { token } });
            } else {
                response = await axios.post(`${BACKEND_URL}/api/service/add-bed`, formData, { headers: { token } });
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setShowModal(false);
                setEditingBed(null);
                setFormData({ type: '', totalUnits: '', availableUnits: '', price: '' });
                fetchBeds();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Operation failed");
        }
    };

    const handleEdit = (bed) => {
        setEditingBed(bed);
        setFormData({
            type: bed.type,
            totalUnits: bed.totalUnits,
            availableUnits: bed.availableUnits,
            price: bed.price
        });
        setShowModal(true);
    };
    console.log(beds);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this bed record?")) {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/service/remove-bed`, { id }, { headers: { token } });
                if (response.data.success) {
                    toast.success("Bed removed");
                    fetchBeds();
                }
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };
    return (
        <div className="management-page">
            <div className="page-header">
                <h2><Database className="title-icon" /> Bed Management</h2>
                <button className="add-btn" onClick={() => { setShowModal(true); setEditingBed(null); }}>
                    <Plus size={18} /> Add New Bed Type
                </button>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <h3>Total Bed Types</h3>
                    <p className="stat-value">{beds.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Available Beds</h3>
                    <p className="stat-value">{beds.reduce((acc, curr) => acc + curr.availableUnits, 0)}</p>
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Bed Type</th>
                            <th>Total Units</th>
                            <th>Available</th>
                            <th>Price (Full Day)</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {beds.map((bed) => (
                            <tr key={bed._id}>
                                <td><strong>{bed.type}</strong></td>
                                <td>{bed.totalUnits}</td>
                                <td>{bed.availableUnits}</td>
                                <td>₹{bed.price}</td>
                                <td>
                                    <span className={`status-badge ${bed.availableUnits > 0 ? 'available' : 'full'}`}>
                                        {bed.availableUnits > 0 ? 'Available' : 'Full'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="edit-icon" onClick={() => handleEdit(bed)}><Edit size={16} /></button>
                                    <button className="delete-icon" onClick={() => handleDelete(bed._id)}><Trash2 size={16} /></button>
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
                            <h3>{editingBed ? 'Edit Bed Type' : 'Add New Bed Type'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Bed Type (e.g., ICU, COVID, General)</label>
                                <input name="type" type="text" value={formData.type} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Total Units</label>
                                    <input name="totalUnits" type="number" value={formData.totalUnits} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Available Units</label>
                                    <input name="availableUnits" type="number" value={formData.availableUnits} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Price Per Day (₹)</label>
                                <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="submit-btn">
                                {editingBed ? 'Update Bed' : 'Add Bed'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBeds;
