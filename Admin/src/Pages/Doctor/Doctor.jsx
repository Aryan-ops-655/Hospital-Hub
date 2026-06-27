import React from "react";
import "./Doctor.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/adminContext";
import { Link } from "react-router-dom";

const Doctor = () => {
  const doc = JSON.parse(localStorage.getItem("doctor") || "{}");
  const { doctor, requests } = useContext(AdminContext);

  const totalPatients = requests.length;

  const pendingAppointments = requests.filter(
    (r) => r.status === "Pending",
  ).length;

  const acceptedAppointments = requests.filter(
    (r) => r.status === "Accepted",
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = requests.filter(
    (r) => r.details?.appointmentDate === today,
  ).length;

  return (
    <>
      <div className="doc-dashboard-cont">
        
        <div className="doctor-banner">
          <span>Welcome!</span>
          <h1>{doc?.name || "Guest"}</h1>
          <p>
            Thanks for joining with us. We are always trying to get you complete
            service. <br />
            You can view your daily schedule, Reach Patients Appointment at
            home!
          </p>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/appointments"
          >
            <div className="appointment-btn">View My Appointments</div>
          </Link>
        </div>

        <span className="doc-status-title">Dashboard Status</span>

        <div className="doc-status">
          <div className="doc-menu">
            {/* Total Patients */}

            <div className="doc-menu-card blue">
              <div className="doc-card-icon">👨‍⚕️</div>

              <div className="doc-card-data">
                <h2>{totalPatients}</h2>
                <span>Total Patients</span>
              </div>
            </div>

            {/* Today's */}

            <div className="doc-menu-card green">
              <div className="doc-card-icon">📅</div>

              <div className="doc-card-data">
                <h2>{todayAppointments}</h2>
                <span>Today's Appointments</span>
              </div>
            </div>

            {/* Pending */}

            <div className="doc-menu-card orange">
              <div className="doc-card-icon">⏳</div>

              <div className="doc-card-data">
                <h2>{pendingAppointments}</h2>
                <span>Pending</span>
              </div>
            </div>

            {/* Accepted */}

            <div className="doc-menu-card purple">
              <div className="doc-card-icon">✅</div>

              <div className="doc-card-data">
                <h2>{acceptedAppointments}</h2>
                <span>Accepted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="doc-schedule-cont">
          <div className="doctor-schedule-card">
            <div className="schedule-header">
              <h2>Doctor Availability</h2>
            </div>

            <div className="schedule-table-wrapper">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>

                <tbody>
                  {doctor.availability.length > 0 ? (
                    doctor.availability.map((slot) => (
                      <tr key={slot._id || slot.day}>
                        <td>{slot.day}</td>
                        <td>{slot.startTime}</td>
                        <td>{slot.endTime}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-data">
                        No schedule available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;
