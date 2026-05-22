import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Auth Pages
import Login from './Pages/Login'
import Register from './Pages/Register'

// Dashboard & Services
import Dashboard from './Pages/Dashboard'
import ServiceManagement from './Pages/ServiceManagement'

// Existing Blood Bank Pages
import Home from './Pages/Home/Home.jsx'
import Add from './Pages/Add/Add.jsx'
import Order from './Pages/Orders/Order.jsx'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const auth = localStorage.getItem('hospitalAuth')
    setIsAuthenticated(!!auth)
  }, [])

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  return (
    <>
      <ToastContainer/>
      <Routes>
        {/* Auth Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/services/:serviceType' 
          element={
            <ProtectedRoute>
              <ServiceManagement />
            </ProtectedRoute>
          } 
        />

        {/* Legacy Blood Bank Routes */}
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/add' element={<Add/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
    </>
  )
}

export default App
