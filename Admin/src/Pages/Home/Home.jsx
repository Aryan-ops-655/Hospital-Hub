import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../constant';
import { assets } from "../../assets/assets";
import { 
    Activity, 
    Droplet, 
    Truck, 
    ClipboardList,
    Users,
    CheckCircle
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const [stats, setStats] = useState({
        totalBeds: 0,
        bloodUnits: 0,
        activeAmbulances: 0,
        pendingRequests: 0,
        totalTests: 0,
        recentRequests: []
    });

    const token = localStorage.getItem('token');

    const fetchDashboardData = async () => {
        try {
            const [beds, blood, amb, req, tests] = await Promise.all([
                axios.get(`${BACKEND_URL}/api/service/list-beds`, { headers: { token } }),
                axios.get(`${BACKEND_URL}/api/bBank/blood`, { headers: { token } }),
                axios.get(`${BACKEND_URL}/api/service/list-ambulances`, { headers: { token } }),
                axios.get(`${BACKEND_URL}/api/request/list`, { headers: { token } }),
                axios.get(`${BACKEND_URL}/api/service/list-tests`, { headers: { token } })
            ]);

            setStats({
                totalBeds: beds.data.data ? beds.data.data.reduce((acc, curr) => acc + curr.availableUnits, 0) : 0,
                bloodUnits: blood.data.data ? blood.data.data.reduce((acc, curr) => acc + curr.units, 0) : 0,
                activeAmbulances: amb.data.data ? amb.data.data.filter(a => a.status === 'Available').length : 0,
                pendingRequests: req.data.data ? req.data.data.filter(r => r.status === 'Pending').length : 0,
                totalTests: tests.data.data ? tests.data.data.length : 0,
                recentRequests: req.data.data ? req.data.data.slice(0, 5) : []
            });
        } catch (error) {
            console.error("Error fetching dashboard data", error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="dashboard">
            <div className="stats-grid">
                <div className="stat-card beds">
                    <div className="stat-icon"><img src={assets.bed} alt="" /></div>
                    <div className="stat-content">
                        <h3>Available Beds</h3>
                        <p>{stats.totalBeds}</p>
                    </div>
                </div>
                <div className="stat-card blood">
                    <div className="stat-icon"><img src={assets.blood_drop} alt="" /></div>
                    <div className="stat-content">
                        <h3>Blood Units</h3>
                        <p>{stats.bloodUnits}</p>
                    </div>
                </div>
                <div className="stat-card ambulances">
                    <div className="stat-icon "><img src={assets.ambulance} alt="" /></div>
                    <div className="stat-content">
                        <h3>Ready Ambulances</h3>
                        <p>{stats.activeAmbulances}</p>
                    </div>
                </div>
                <div className="stat-card requests">
                    <div className="stat-icon"><ClipboardList /></div>
                    <div className="stat-content">
                        <h3>Pending Requests</h3>
                        <p>{stats.pendingRequests}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="recent-requests">
                    <div className="section-header">
                        <h2>Recent User Requests</h2>
                        <a href="/requests">View All</a>
                    </div>
                    <div className="requests-mini-list">
                        {stats.recentRequests.length === 0 ? (
                            <p className="no-data">No recent requests.</p>
                        ) : (
                            stats.recentRequests.map(req => (
                                <div key={req._id} className="request-mini-card">
                                    <div className="req-type-indicator">{req.serviceType.charAt(0)}</div>
                                    <div className="req-info">
                                        <h4>{req.userName}</h4>
                                        <p>{req.serviceType} Request • {new Date(req.requestDate).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`status-pill ${req.status.toLowerCase()}`}>{req.status}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <button onClick={() => window.location.href='/beds'}><Activity size={20}/> Update Beds</button>
                        <button onClick={() => window.location.href='/blood'}><Droplet size={20}/> Add Blood</button>
                        <button onClick={() => window.location.href='/ambulances'}><Truck size={20}/> Ambulance Status</button>
                        <button onClick={() => window.location.href='/tests'}><Activity size={20}/> New Test</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
