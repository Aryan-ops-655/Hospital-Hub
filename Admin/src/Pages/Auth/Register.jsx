import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../constant';
import { Mail, Lock, Building, MapPin, Contact, FileBadge, UserPlus } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    contact: '',
    licenseNumber: '',
    latitude: '',
    longitude: ''
  });
  
  const [detecting, setDetecting] = useState(false);
  const navigate = useNavigate();

  const detectLocation = () => {
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
        toast.success("Coordinates auto-filled!");
        setDetecting(false);
      },
      (error) => {
        toast.error("Location permission denied or unavailable");
        setDetecting(false);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/hospital/register`, formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('hospital', JSON.stringify(response.data.hospital));
        toast.success("Registration Successful!");
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register">
        <div className="auth-header">
          <h2>HMS<span>Hub</span></h2>
          <p>Register Your Hospital</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="input-group">
              <label>Hospital Name</label>
              <div className="input-wrapper">
                <Building size={18} className="icon" />
                <input name="name" type="text" placeholder="City Hospital" onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="icon" />
                <input name="email" type="email" placeholder="contact@hospital.com" onChange={handleChange} required />
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="icon" />
                <input name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
              </div>
            </div>
            
            <div className="input-group">
              <label>License Number</label>
              <div className="input-wrapper">
                <FileBadge size={18} className="icon" />
                <input name="licenseNumber" type="text" placeholder="LIC-12345" onChange={handleChange} required />
              </div>
            </div>
          </div>
          
          <div className="input-group">
            <label>Full Address</label>
            <div className="input-wrapper">
              <MapPin size={18} className="icon" />
              <input name="address" type="text" placeholder="123 Health St, Wellness City" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Latitude</label>
              <div className="input-wrapper">
                <input name="latitude" type="number" step="any" placeholder="e.g. 22.7972" value={formData.latitude} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Longitude</label>
              <div className="input-wrapper">
                <input name="longitude" type="number" step="any" placeholder="e.g. 85.3442" value={formData.longitude} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <button type="button" className="detect-location-btn" onClick={detectLocation} style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px dashed #3b82f6",
              borderRadius: "8px",
              color: "#3b82f6",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s"
          }}>
             {detecting ? "Detecting..." : "Detect Current Location Coordinates"}
          </button>
          
          <div className="input-group">
            <label>Contact Number</label>
            <div className="input-wrapper">
              <Contact size={18} className="icon" />
              <input name="contact" type="text" placeholder="+1 234 567 890" onChange={handleChange} required />
            </div>
          </div>
          
          <button type="submit" className="auth-button">
            <UserPlus size={18} />
            <span>Register Hospital</span>
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
