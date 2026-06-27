import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../constant';
import { Check, X, ClipboardList, Trash2 } from 'lucide-react';
import '../Management.css';
import { useContext } from 'react';
import { AdminContext } from '../../Context/adminContext';

const DoctorRequest = () => {
    
    const {requests, fetchRequests} = useContext(AdminContext);

    const token = localStorage.getItem('token');
    const doctor = JSON.parse(localStorage.getItem('doctor'));


    

    useEffect(() => {
        if (doctor?.id) {
            fetchRequests();
        }
    }, []);


    
    const updateStatus = async (id, status) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/request/status`,
                { id, status },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(`Request ${status}`);
                fetchRequests();
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this appointment?")) {
            try {
                const response = await axios.post(
                    `${BACKEND_URL}/api/request/delete`,
                    { id },
                    { headers: { token } }
                );

                if (response.data.success) {
                    toast.success("Appointment deleted");
                    fetchRequests();
                }
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div className="management-page">
            <div className="page-header">
                <h2>
                    <ClipboardList className="title-icon" />
                    My Patients
                </h2>

                <div
                    className="refresh-btn"
                    onClick={fetchRequests}
                >
                    Refresh Records
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Patient Details</th>
                            <th>Service Type</th>
                            <th>Appointment Details</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    style={{
                                        textAlign: 'center',
                                        padding: '40px',
                                    }}
                                >
                                    No appointments found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id}>
                                    <td>
                                        <div className="user-info">
                                            <p className="name">
                                                {req.userName}
                                            </p>

                                            <p className="contact">
                                                {req.userContact}
                                            </p>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="service-type">
                                            {req.serviceType}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="req-details">
                                            {req.details &&
                                                Object.entries(req.details).map(
                                                    ([key, value]) => (
                                                        <p key={key}>
                                                            <strong>
                                                                {key}:
                                                            </strong>{' '}
                                                            {value}
                                                        </p>
                                                    )
                                                )}
                                        </div>
                                    </td>

                                    <td>
                                        {new Date(
                                            req.requestDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <span
                                            className={`status-badge ${req.status.toLowerCase()}`}
                                        >
                                            {req.status}
                                        </span>
                                    </td>

                                    <td className="actions-cell">
                                        {req.status === 'Pending' && (
                                            <>
                                                <button
                                                    className="accept-icon"
                                                    title="Accept"
                                                    onClick={() =>
                                                        updateStatus(
                                                            req._id,
                                                            'Accepted'
                                                        )
                                                    }
                                                >
                                                    <Check size={18} />
                                                </button>

                                                <button
                                                    className="reject-icon"
                                                    title="Reject"
                                                    onClick={() =>
                                                        updateStatus(
                                                            req._id,
                                                            'Rejected'
                                                        )
                                                    }
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        )}

                                        <button
                                            className="delete-icon"
                                            onClick={() =>
                                                handleDelete(req._id)
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorRequest;

