import React, { useState } from 'react'
import '../Home/Home.css'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (formData.email && formData.password) {
        toast.success('Login successful!')
        localStorage.setItem('hospitalAuth', JSON.stringify({ email: formData.email }))
        navigate('/dashboard')
      } else {
        toast.error('Please fill all fields')
      }
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <div style={styles.loginHeader}>
          <img src={assets.hospital_building} alt="Hospital" style={styles.hospitalIcon} />
          <h1>Hospital Admin</h1>
          <p>Manage Services & Inventory</p>
        </div>

        <form style={styles.loginForm} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@hospital.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formOptions}>
            <label style={styles.rememberMe}>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="#" style={styles.forgotPassword}>Forgot Password?</Link>
          </div>

          <button type="submit" style={styles.loginBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.loginFooter}>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  loginContainer: {
    display: 'flex',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBox: {
    background: '#fff',
    borderRadius: '10px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  hospitalIcon: {
    width: '60px',
    height: '60px',
    marginBottom: '10px'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem'
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer'
  },
  forgotPassword: {
    color: '#667eea',
    textDecoration: 'none'
  },
  loginBtn: {
    padding: '12px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  loginFooter: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666'
  }
}

export default Login
