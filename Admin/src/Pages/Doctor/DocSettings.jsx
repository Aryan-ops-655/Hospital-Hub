import React, { useEffect, useState } from "react";

import PersonalSection from "../../Components/Docsettings/PersonalSection";
import ProfessionalSection from "../../Components/Docsettings/ProfessionalSection";
import QualificationSection from "../../Components/Docsettings/QualificationSection";
import HospitalSection from "../../Components/Docsettings/HospitalSection";
import AvailabilitySection from "../../Components/Docsettings/AvailabilitySection";
import EmergencySection from "../../Components/Docsettings/EmergencySection";
import { BACKEND_URL } from '../../../constant';

import "./Doctor.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../Context/adminContext";

const DocSettings = () => {
  

  const token = localStorage.getItem('token');
  const doc = JSON.parse(localStorage.getItem('doctor') || '{}');
  const {doctor, setDoctor, loading, setLoading, fetchDoctor} = useContext(AdminContext)
  
    

  useEffect(() => {
    fetchDoctor();
  }, []);

  const handleSave = async () => {
  try {

    const response = await axios.post(`${BACKEND_URL}/api/service/update-doctor`,{ ...doctor, id:doc.id }, { headers: { token } });

    toast.success(response.data.message);
  } catch (error) {
    console.error(error);

    toast.error(response.data.message);
  }
};

  const getProfileCompletion = () => {
    let total = 0;
    let completed = 0;

    const fields = [
      doctor.fullName,
      doctor.profilePhoto,
      doctor.gender,
      doctor.phoneNumber,
      doctor.email,
      doctor.specialization,
      doctor.medicalRegistrationNumber,
      doctor.registrationCouncil,
      doctor.biography,
    ];

    total = fields.length;

    completed = fields.filter(
      (field) =>
        field !== "" &&
        field !== null &&
        field !== undefined
    ).length;

    return Math.round(
      (completed / total) * 100
    );
  };

  if (loading) {
    return (
      <div className="ds-loading-container">
        <div className="ds-spinner"></div>
      </div>
    );
  }

  return (
    <div className="ds-page">

      {/* Header */}

      <div className="ds-header">

        <div className="ds-header-left">

          <div className="ds-profile-preview">

            {doctor.profilePhoto ? (
              <img
                src={doctor.profilePhoto}
                alt="Doctor"
              />
            ) : (
              <div className="ds-profile-placeholder">
                DR
              </div>
            )}

          </div>

          <div>

            <h1>
              {doctor.fullName ||
                "Doctor Profile"}
            </h1>

            <p>
              {doctor.specialization ||
                "Specialization"}
            </p>

            <span
              className={`ds-status-badge ${
                doctor.accountStatus ===
                "Active"
                  ? "ds-status-active"
                  : "ds-status-inactive"
              }`}
            >
              {doctor.accountStatus}
            </span>

          </div>
        </div>

        <button
          className="ds-save-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>

      {/* Profile Completion */}

      <div className="ds-completion-card">

        <div className="ds-completion-header">

          <h3>
            Profile Completion
          </h3>

          <span>
            {getProfileCompletion()}%
          </span>

        </div>

        <div className="ds-progress-bar">
          <div
            className="ds-progress-fill"
            style={{
              width: `${getProfileCompletion()}%`,
            }}
          />
        </div>

      </div>

      {/* Sections */}

      <PersonalSection
        doctor={doctor}
        setDoctor={setDoctor}
      />

      <ProfessionalSection
        doctor={doctor}
        setDoctor={setDoctor}
      />

      <QualificationSection
        doctor={doctor}
        setDoctor={setDoctor}
      />

      <HospitalSection
        doctor={doctor}
        setDoctor={setDoctor}
      />

      <AvailabilitySection
        doctor={doctor}
        setDoctor={setDoctor}
      />

      <EmergencySection
        doctor={doctor}
        setDoctor={setDoctor}
      />

      {/* Read Only Statistics */}

      <section className="ds-section">

        <div className="ds-section-header">
          <h2>Statistics & Verification</h2>
        </div>

        <div className="ds-grid ds-grid-3">

          <div className="ds-stat-card">
            <h3>
              {doctor.totalPatientsTreated}
            </h3>
            <p>Patients Treated</p>
          </div>

          <div className="ds-stat-card">
            <h3>
              {doctor.averageRating}
            </h3>
            <p>Average Rating</p>
          </div>

          <div className="ds-stat-card">
            <h3>
              {doctor.totalReviews}
            </h3>
            <p>Total Reviews</p>
          </div>

        </div>

        <div className="ds-readonly-grid">

          <div>
            <strong>
              Verification Status:
            </strong>{" "}
            {doctor.isVerified
              ? "Verified"
              : "Not Verified"}
          </div>

          <div>
            <strong>
              Profile Status:
            </strong>{" "}
            {doctor.profileStatus}
          </div>

          <div>
            <strong>
              Verification Date:
            </strong>{" "}
            {doctor.verificationDate ||
              "N/A"}
          </div>

          <div>
            <strong>
              Last Login:
            </strong>{" "}
            {doctor.lastLogin || "N/A"}
          </div>

        </div>

      </section>

      {/* Bottom Save */}

      <div className="ds-bottom-save">
        <button
          className="ds-save-btn"
          onClick={handleSave}
        >
          Save Profile
        </button>
      </div>

    </div>
  );
};

export default DocSettings;