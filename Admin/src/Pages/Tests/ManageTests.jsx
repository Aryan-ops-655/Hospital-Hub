import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../constant';
import { Plus, Edit, Trash2, Activity } from 'lucide-react';
import '../Management.css';

const ManageTests = () => {
    const [tests, setTests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTest, setEditingTest] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        available: true
    });

    const token = localStorage.getItem('token');

    const fetchTests = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/service/list-tests`, { headers: { token } });
            if (response.data.success) {
                setTests(response.data.data);
            }
        } catch (error) {
            toast.error("Error fetching tests");
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const handleChange = (e) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingTest) {
                response = await axios.post(`${BACKEND_URL}/api/service/update-test`, { ...formData, id: editingTest._id }, { headers: { token } });
            } else {
                response = await axios.post(`${BACKEND_URL}/api/service/add-test`, formData, { headers: { token } });
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setShowModal(false);
                setEditingTest(null);
                setFormData({ name: '', price: '', description: '', available: true });
                fetchTests();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Operation failed");
        }
    };

    const handleEdit = (test) => {
        setEditingTest(test);
        setFormData({
            name: test.name,
            price: test.price,
            description: test.description,
            available: test.available
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this test?")) {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/service/remove-test`, { id }, { headers: { token } });
                if (response.data.success) {
                    toast.success("Test removed");
                    fetchTests();
                }
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div className="management-page">
            <div className="page-header">
                <h2><Activity className="title-icon" /> Diagnostic Tests</h2>
                <button className="add-btn" onClick={() => { setShowModal(true); setEditingTest(null); }}>
                    <Plus size={18} /> Add New Test
                </button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test) => (
                            <tr key={test._id}>
                                <td><strong>{test.name}</strong></td>
                                <td>{test.description}</td>
                                <td>₹{test.price}</td>
                                <td>
                                    <span className={`status-badge ${test.available ? 'available' : 'busy'}`}>
                                        {test.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="edit-icon" onClick={() => handleEdit(test)}><Edit size={16} /></button>
                                    <button className="delete-icon" onClick={() => handleDelete(test._id)}><Trash2 size={16} /></button>
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
                            <h3>{editingTest ? 'Edit Test' : 'Add New Test'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Test Name (e.g., MRI, Blood Count, X-Ray)</label>
                                <input name="name" type="text" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price (₹)</label>
                                    <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input name="available" type="checkbox" checked={formData.available} onChange={handleChange} />
                                        Currently Available
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn">
                                {editingTest ? 'Update Test' : 'Add Test'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTests;
