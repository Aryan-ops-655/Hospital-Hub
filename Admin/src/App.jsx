import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Components/Layout.jsx";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home/Home";
import ManageBeds from "./Pages/Beds/ManageBeds";
import ManageBlood from "./Pages/Blood/ManageBlood";
import ManageTests from "./Pages/Tests/ManageTests";
import ManageAmbulances from "./Pages/Ambulances/ManageAmbulances";
import ManageRequests from "./Pages/Requests/ManageRequests";
import Doctor from "./Pages/Doctor/Doctor.jsx";
import Entry from "./Pages/Auth/Entry.jsx";
import DocReg from "./Pages/Auth/DocReg.jsx";
import DocLog from "./Pages/Auth/DocLog.jsx";
import DocSettings from "./Pages/Doctor/DocSettings.jsx";
import DoctorRequest from "./Pages/Requests/DoctorRequest.jsx";
import UnderMaintenance from "./Pages/Maintance/UnderMaintance.jsx";
import Patients from "./Pages/Doctor/Patients.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/enter" />;
  return <Layout>{children}</Layout>;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const auth = localStorage.getItem("token");
    setIsAuthenticated(!!auth);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        <Route path="/enter" element={<Entry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doc-reg" element={<DocReg/>} />
        <Route path="/doc-log" element={<DocLog/>} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beds"
          element={
            <ProtectedRoute>
              <ManageBeds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blood"
          element={
            <ProtectedRoute>
              <ManageBlood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <ManageTests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ambulances"
          element={
            <ProtectedRoute>
              <ManageAmbulances />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <ManageRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <DoctorRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <Doctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doc-settings"
          element={
            <ProtectedRoute>
              <DocSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/not-avilable"
          element={
            <ProtectedRoute>
              <UnderMaintenance />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/not-avilable" />} />
      </Routes>
    </>
  );
};

export default App;
