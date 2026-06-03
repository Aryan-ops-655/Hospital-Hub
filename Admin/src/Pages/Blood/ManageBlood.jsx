import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../constant';
import { Plus, Edit, Trash2, Droplet } from 'lucide-react';
import '../Management.css';

const ManageBlood = () => {
    const [bloodStock, setBloodStock] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingBlood, setEditingBlood] = useState(null);
    const [formData, setFormData] = useState({
        component: '',
        group: '',
        units: '',
        status: 'In Stock',
        collected: '',
        expiry: ''
    });

    const token = localStorage.getItem('token');

    const fetchBlood = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/bBank/blood`, { headers: { token } });
            if (response.data.success) {
                setBloodStock(response.data.data);
            }
        } catch (error) {
            toast.error("Error fetching blood stock");
        }
    };

    useEffect(() => {
        fetchBlood();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingBlood) {
                response = await axios.post(`${BACKEND_URL}/api/bBank/findandupdate`, { ...formData, id: editingBlood._id }, { headers: { token } });
            } else {
                response = await axios.post(`${BACKEND_URL}/api/bBank/add`, formData, { headers: { token } });
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setShowModal(false);
                setEditingBlood(null);
                setFormData({ component: '', group: '', units: '', status: 'In Stock', collected: '', expiry: '' });
                fetchBlood();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Operation failed");
        }
    };

    const handleEdit = (blood) => {
        setEditingBlood(blood);
        setFormData({
            component: blood.component,
            group: blood.blood_group,
            units: blood.units,
            status: blood.stock_status,
            collected: blood.donated_date ? new Date(blood.donated_date).toISOString().split('T')[0] : '',
            expiry: blood.expiry_date ? new Date(blood.expiry_date).toISOString().split('T')[0] : ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this blood stock?")) {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/bBank/remove`, { id }, { headers: { token } });
                if (response.data.success) {
                    toast.success("Blood stock removed");
                    fetchBlood();
                }
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div className="management-page">
            <div className="page-header">
                <h2><Droplet className="title-icon" /> Blood Bank Management</h2>
                <button className="add-btn" onClick={() => { setShowModal(true); setEditingBlood(null); }}>
                    <Plus size={18} /> Add Blood Stock
                </button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Group</th>
                            <th>Units</th>
                            <th>Expiry</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bloodStock.map((item) => (
                            <tr key={item._id}>
                                <td><strong>{item.component}</strong></td>
                                <td><span className="blood-badge">{item.blood_group}</span></td>
                                <td>{item.units}</td>
                                <td>{new Date(item.expiry_date).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge ${item.stock_status.toLowerCase().replace(' ', '-')}`}>
                                        {item.stock_status}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="edit-icon" onClick={() => handleEdit(item)}><Edit size={16} /></button>
                                    <button className="delete-icon" onClick={() => handleDelete(item._id)}><Trash2 size={16} /></button>
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
                            <h3>{editingBlood ? 'Edit Blood Stock' : 'Add Blood Stock'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Component Type</label>
                                <select name="component" value={formData.component} onChange={handleChange} required>
                                    <option value="">Select Component</option>
                                    <option>Whole Blood</option>
                                    <option>Plasma</option>
                                    <option>Platelets</option>
                                    <option>Packed RBC</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <select name="group" value={formData.group} onChange={handleChange} required>
                                        <option value="">Select Group</option>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Units</label>
                                    <input name="units" type="number" value={formData.units} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Collection Date</label>
                                    <input name="collected" type="date" value={formData.collected} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input name="expiry" type="date" value={formData.expiry} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option>In Stock</option>
                                    <option>Low Stock</option>
                                    <option>Expiring Soon</option>
                                    <option>Expired</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-btn">
                                {editingBlood ? 'Update Stock' : 'Add Stock'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlood;
