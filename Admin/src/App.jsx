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

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
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
      </Routes>
    </>
  );
};

export default App;
