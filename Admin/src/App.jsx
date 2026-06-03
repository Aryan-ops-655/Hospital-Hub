<<<<<<< HEAD
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Components/Layout';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import ManageBeds from './Pages/Beds/ManageBeds';
import ManageBlood from './Pages/Blood/ManageBlood';
import ManageTests from './Pages/Tests/ManageTests';
import ManageAmbulances from './Pages/Ambulances/ManageAmbulances';
import ManageRequests from './Pages/Requests/ManageRequests';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};
=======
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
>>>>>>> 3144a04320f0e7d0152714906184bfadfe35d726

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
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/beds" element={<ProtectedRoute><ManageBeds /></ProtectedRoute>} />
        <Route path="/blood" element={<ProtectedRoute><ManageBlood /></ProtectedRoute>} />
        <Route path="/tests" element={<ProtectedRoute><ManageTests /></ProtectedRoute>} />
        <Route path="/ambulances" element={<ProtectedRoute><ManageAmbulances /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><ManageRequests /></ProtectedRoute>} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
=======
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
>>>>>>> 3144a04320f0e7d0152714906184bfadfe35d726
      </Routes>
    </>
  );
};

export default App;
