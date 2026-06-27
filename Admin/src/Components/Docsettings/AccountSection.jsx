import React from "react";
import "../../Pages/Doctor/Doctor.css";


const AccountSection = ({ doctor, setDoctor }) => {
  const toggleField = (field) => {
    setDoctor((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const changeAccountStatus = (status) => {
    setDoctor((prev) => ({
      ...prev,
      accountStatus: status,
    }));
  };

  return (
    <section className="ds-section">
      <div className="ds-section-header">
        <h2>Account Settings</h2>

        <p>
          Manage account status, profile visibility,
          notifications and security settings.
        </p>
      </div>

      {/* Account Status */}

      <div className="ds-account-status-wrapper">
        <label className="ds-label">
          Account Status
        </label>

        <div className="ds-status-selector">

          <button
            type="button"
            className={`ds-status-option ${
              doctor.accountStatus === "Active"
                ? "ds-status-selected ds-status-green"
                : ""
            }`}
            onClick={() =>
              changeAccountStatus("Active")
            }
          >
            Active
          </button>

          <button
            type="button"
            className={`ds-status-option ${
              doctor.accountStatus === "Inactive"
                ? "ds-status-selected ds-status-red"
                : ""
            }`}
            onClick={() =>
              changeAccountStatus("Inactive")
            }
          >
            Inactive
          </button>

          <button
            type="button"
            className={`ds-status-option ${
              doctor.accountStatus === "Suspended"
                ? "ds-status-selected ds-status-yellow"
                : ""
            }`}
            onClick={() =>
              changeAccountStatus("Suspended")
            }
          >
            Suspended
          </button>

        </div>
      </div>

      {/* Switch Settings */}

      <div className="ds-account-grid">

        <div className="ds-switch-row">
          <label>Profile Visible</label>

          <div
            className={`ds-toggle ${
              doctor.profileVisible
                ? "ds-toggle-active"
                : "ds-toggle-inactive"
            }`}
            onClick={() =>
              toggleField("profileVisible")
            }
          >
            <div className="ds-toggle-ball"></div>
          </div>
        </div>

        <div className="ds-switch-row">
          <label>Accept New Patients</label>

          <div
            className={`ds-toggle ${
              doctor.acceptNewPatients
                ? "ds-toggle-active"
                : "ds-toggle-inactive"
            }`}
            onClick={() =>
              toggleField("acceptNewPatients")
            }
          >
            <div className="ds-toggle-ball"></div>
          </div>
        </div>

        <div className="ds-switch-row">
          <label>Email Notifications</label>

          <div
            className={`ds-toggle ${
              doctor.emailNotifications
                ? "ds-toggle-active"
                : "ds-toggle-inactive"
            }`}
            onClick={() =>
              toggleField("emailNotifications")
            }
          >
            <div className="ds-toggle-ball"></div>
          </div>
        </div>

        <div className="ds-switch-row">
          <label>SMS Notifications</label>

          <div
            className={`ds-toggle ${
              doctor.smsNotifications
                ? "ds-toggle-active"
                : "ds-toggle-inactive"
            }`}
            onClick={() =>
              toggleField("smsNotifications")
            }
          >
            <div className="ds-toggle-ball"></div>
          </div>
        </div>

        <div className="ds-switch-row">
          <label>Two Factor Authentication</label>

          <div
            className={`ds-toggle ${
              doctor.twoFactorAuth
                ? "ds-toggle-active"
                : "ds-toggle-inactive"
            }`}
            onClick={() =>
              toggleField("twoFactorAuth")
            }
          >
            <div className="ds-toggle-ball"></div>
          </div>
        </div>

      </div>

      {/* License Information */}

      <div className="ds-license-card">

        <h3>License Information</h3>

        <div className="ds-grid ds-grid-2">

          <div>
            <strong>Registration No:</strong>
            <br />
            {doctor.medicalRegistrationNumber ||
              "Not Available"}
          </div>

          <div>
            <strong>License Valid Till:</strong>
            <br />
            {doctor.licenseValidity || "N/A"}
          </div>

        </div>

      </div>

      {/* Summary */}

      <div className="ds-summary-card">

        <h3>Account Overview</h3>

        <div className="ds-grid ds-grid-2">

          <div>
            <strong>Status:</strong>{" "}
            {doctor.accountStatus}
          </div>

          <div>
            <strong>Verified:</strong>{" "}
            {doctor.isVerified
              ? "Yes"
              : "No"}
          </div>

          <div>
            <strong>Patients Treated:</strong>{" "}
            {doctor.totalPatientsTreated}
          </div>

          <div>
            <strong>Average Rating:</strong>{" "}
            {doctor.averageRating}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AccountSection;