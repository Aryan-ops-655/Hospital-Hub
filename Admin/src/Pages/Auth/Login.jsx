import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../constant";
import { Mail, Lock, LogIn } from "lucide-react";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/hospital/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "hospital",
          JSON.stringify(response.data.hospital),
        );
        toast.success("Login Successful!");
        navigate(("/"));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>
            HMS<span>Hub</span>
          </h2>
          <p>Login to your Hospital Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="icon" />
              <input
                type="email"
                placeholder="hospital@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button">
            <LogIn size={18} />
            <span>Login Now</span>
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register Hospital</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
