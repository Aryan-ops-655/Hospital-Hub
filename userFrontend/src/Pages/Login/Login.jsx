import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login, signup } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        setSuccessMsg("Logged in successfully!");
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setErrorMsg(res.message || "Invalid credentials");
      }
    } else {
      if (!formData.name || !formData.contact) {
        setErrorMsg("Please fill out all fields");
        return;
      }
      const res = await signup(formData.name, formData.email, formData.password, formData.contact);
      if (res.success) {
        setSuccessMsg("Registered successfully!");
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setErrorMsg(res.message || "Registration failed");
      }
    }
  };

  return (
    <div className='login-container'>
      <div className="login-box">
        <div className="head">
          <div className={`tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setErrorMsg(''); setSuccessMsg(''); }}>LOGIN</div>
          <div className={`tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setErrorMsg(''); setSuccessMsg(''); }}>REGISTER</div>
          <div className="close-btn" onClick={() => navigate('/')}>X</div>
        </div>

        <form onSubmit={handleSubmit} className="input-fields">
          {errorMsg && <p className="status-message error">{errorMsg}</p>}
          {successMsg && <p className="status-message success">{successMsg}</p>}

          {!isLogin && (
            <div className="input-box">
              <p>Full Name</p>
              <input 
                name="name"
                type="text" 
                placeholder='Your full name' 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-box">
            <p>Email Address</p>
            <input 
              name="email"
              type="email" 
              placeholder='Your email address' 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="input-box">
              <p>Contact Number</p>
              <input 
                name="contact"
                type="text" 
                placeholder='Your contact number' 
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-box">
            <p>Password</p>
            <input 
              name="password"
              type="password" 
              placeholder='••••••••' 
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-footer">
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="toggle-link" onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setSuccessMsg(''); }}>
                {isLogin ? 'Register here' : 'Login here'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
