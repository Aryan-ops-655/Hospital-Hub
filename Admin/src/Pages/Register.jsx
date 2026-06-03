import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    hospitalName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    license: ''
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

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Replace with actual API call
      if (formData.hospitalName && formData.email && formData.password) {
        toast.success('Registration successful!')
        localStorage.setItem('hospitalAuth', JSON.stringify({ email: formData.email }))
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.registerContainer}>
      <div style={styles.registerBox}>
        <div style={styles.registerHeader}>
          <img src={assets.hospital_building} alt="Hospital" style={styles.hospitalIcon} />
          <h1>Register Hospital</h1>
          <p>Create your admin account</p>
        </div>

        <form style={styles.registerForm} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Enter hospital name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={{...styles.formGroup, flex: 1}}>
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
            <div style={{...styles.formGroup, flex: 1}}>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contact number"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={{...styles.formGroup, flex: 1}}>
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
            <div style={{...styles.formGroup, flex: 1}}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={{...styles.formGroup, flex: 1}}>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                style={styles.input}
              />
            </div>
            <div style={{...styles.formGroup, flex: 1}}>
              <label>License Number</label>
              <input
                type="text"
                name="license"
                value={formData.license}
                onChange={handleChange}
                placeholder="Hospital license"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Hospital address"
              required
              style={{...styles.input, minHeight: '80px'}}
            />
          </div>

          <button type="submit" style={styles.registerBtn} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div style={styles.registerFooter}>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  registerContainer: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  registerBox: {
    background: '#fff',
    borderRadius: '10px',
    padding: '40px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  },
  registerHeader: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  hospitalIcon: {
    width: '60px',
    height: '60px',
    marginBottom: '10px'
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit'
  },
  registerBtn: {
    padding: '12px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px'
  },
  registerFooter: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666'
  }
}

export default Register
