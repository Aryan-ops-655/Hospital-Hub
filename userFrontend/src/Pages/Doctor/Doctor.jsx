import React, { useContext, useMemo, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { assets } from "../../assets/assets";
import { toast } from 'react-toastify';
import "./Doctor.css";

const Doctor = () => {
  const { docList, createBooking } = useContext(UserContext);

  /* -------------------- Search & Filters -------------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [consultationFilter, setConsultationFilter] = useState("All");

  /* -------------------- Modals -------------------- */

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  /* -------------------- Appointment -------------------- */

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    timeSlot: "",
    details: "",
  });

  /* -------------------- Filter Doctors -------------------- */

  const filteredDoctors = useMemo(() => {
    return docList.filter((doctor) => {
      const matchesSearch =
        doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesConsultation =
        consultationFilter === "All" ||
        doctor.consultationType === consultationFilter;

      return matchesSearch && matchesConsultation;
    });
  }, [docList, searchTerm, consultationFilter]);

  /* -------------------- Open Details -------------------- */

  const openDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedDoctor(null);
    setShowDetails(false);
  };

  /* -------------------- Booking -------------------- */

  const openAppointmentForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);

    setSelectedDoctor(null);

    setAppointmentData({
      date: "",
      timeSlot: "",
      details: "",
    });
  };

  const handleInputChange = (e) => {
    setAppointmentData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const details = {
      appointmentDate: appointmentData.date,
      timeSlot: appointmentData.timeSlot,
      problem: appointmentData.details,
    };

    const result = await createBooking(
      selectedDoctor._id,
      "Doctor Appointment",
      details,
    );

    if (result.success) {
      toast.success(result.message);
      closeForm();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="doctor-list-cont">
        {/* ================= Header ================= */}

        <div className="doctor-page-header">
          <h1>Find Your Doctor</h1>
          <p>
            Book appointments with experienced specialists and healthcare
            professionals.
          </p>
        </div>

        {/* ================= Search & Filter ================= */}

        <div className="doctor-toolbar">
          <div className="doctor-search">
            <input
              type="text"
              placeholder="Search by doctor name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="doctor-filter">
            <select
              value={consultationFilter}
              onChange={(e) => setConsultationFilter(e.target.value)}
            >
              <option value="All">All Consultations</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>

        {/* ================= Results ================= */}

        <div className="result-count">
          <h3>
            Doctors Available :<span> {filteredDoctors.length}</span>
          </h3>
        </div>

        {/* ================= Doctor Cards ================= */}

        <div className="result-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((item) => (
              <div className="doctor-card" key={item._id}>
                {/* Card Header */}

                <div className="doctor-card-header">
                  <div className="doctor-image">
                    <img
                      src={item.profilePhoto || assets.doctor}
                      alt={item.fullName}
                    />
                  </div>

                  <div className="doctor-info">
                    <h2>Dr. {item.fullName}</h2>

                    <p className="doctor-speciality">{item.specialization}</p>

                    <div className="doctor-rating">
                      ⭐ {item.averageRating || 0}
                      <span>({item.totalReviews || 0} Reviews)</span>
                    </div>
                  </div>

                  {item.isVerified && <div className="verified-badge">✔</div>}
                </div>

                {/* Details */}

                <div className="doctor-details">
                  <div className="detail-item">
                    <strong>Experience</strong>
                    <span>{item.yearsOfExperience}+ Years</span>
                  </div>

                  <div className="detail-item">
                    <strong>Consultation</strong>
                    <span>{item.consultationType}</span>
                  </div>

                  <div className="detail-item">
                    <strong>Languages</strong>
                    <span>
                      {item.languagesKnown?.length
                        ? item.languagesKnown.join(", ")
                        : "Not Mentioned"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <strong>Fee</strong>
                    <span>₹ {item.fees || 500}</span>
                  </div>
                </div>

                {/* Status */}

                <div className="doctor-status-row">
                  <span
                    className={
                      item.accountStatus === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {item.accountStatus}
                  </span>

                  {item.availability?.length > 0 && (
                    <span className="availability-chip">
                      Available {item.availability.length} Days / Week
                    </span>
                  )}
                </div>

                {/* Buttons */}

                <div className="doctor-buttons">
                  <button
                    className="details-btn"
                    onClick={() => openDetails(item)}
                  >
                    View Profile
                  </button>

                  <button
                    className="appointment-btn"
                    onClick={() => openAppointmentForm(item)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-doctors">
              No doctors found matching your search.
            </div>
          )}
        </div>

        {/* ===========================
      DOCTOR DETAILS MODAL
=========================== */}

        {showDetails && selectedDoctor && (
          <div className="doctor-modal-overlay">
            <div className="doctor-modal">
              {/* Close Button */}

              <button className="doctor-close-btn" onClick={closeDetails}>
                ✕
              </button>

              {/* ================= Header ================= */}

              <div className="doctor-modal-header">
                <div className="doctor-modal-image">
                  <img
                    src={selectedDoctor.profilePhoto || assets.doctor}
                    alt={selectedDoctor.fullName}
                  />
                </div>

                <div className="doctor-modal-info">
                  <h2>Dr. {selectedDoctor.fullName}</h2>

                  <p className="modal-specialization">
                    {selectedDoctor.specialization}
                  </p>

                  {selectedDoctor.superSpecialization && (
                    <p className="modal-super-specialization">
                      {selectedDoctor.superSpecialization}
                    </p>
                  )}

                  <div className="modal-rating">
                    ⭐ {selectedDoctor.averageRating || 0}
                    <span>({selectedDoctor.totalReviews || 0} Reviews)</span>
                  </div>

                  <div className="modal-badges">
                    {selectedDoctor.isVerified && (
                      <span className="badge verified">✔ Verified</span>
                    )}

                    <span
                      className={
                        selectedDoctor.accountStatus === "Active"
                          ? "badge active"
                          : "badge inactive"
                      }
                    >
                      {selectedDoctor.accountStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* ================= Basic Information ================= */}

              <div className="modal-section">
                <h3>Basic Information</h3>

                <div className="modal-grid">
                  <div className="modal-item">
                    <strong>Gender</strong>
                    <span>{selectedDoctor.gender || "Not Available"}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Experience</strong>
                    <span>{selectedDoctor.yearsOfExperience} Years</span>
                  </div>

                  <div className="modal-item">
                    <strong>Consultation</strong>
                    <span>{selectedDoctor.consultationType}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Consultation Fee</strong>
                    <span>₹ {selectedDoctor.fees || 500}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Phone</strong>
                    <span>{selectedDoctor.phoneNumber}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Email</strong>
                    <span>{selectedDoctor.email}</span>
                  </div>
                </div>
              </div>
              {/* ================= Professional Information ================= */}

              <div className="modal-section">
                <h3>Professional Information</h3>

                <div className="modal-grid">
                  <div className="modal-item">
                    <strong>Medical Registration</strong>
                    <span>
                      {selectedDoctor.medicalRegistrationNumber ||
                        "Not Available"}
                    </span>
                  </div>

                  <div className="modal-item">
                    <strong>Experience</strong>
                    <span>{selectedDoctor.yearsOfExperience} Years</span>
                  </div>

                  <div className="modal-item">
                    <strong>Consultation Type</strong>
                    <span>{selectedDoctor.consultationType}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Average Duration</strong>
                    <span>
                      {selectedDoctor.averageConsultationDuration} Minutes
                    </span>
                  </div>

                  <div className="modal-item">
                    <strong>Total Patients</strong>
                    <span>{selectedDoctor.totalPatientsTreated || 0}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Profile Status</strong>
                    <span>{selectedDoctor.profileStatus}</span>
                  </div>
                </div>
              </div>

              {/* ================= Qualifications ================= */}

              <div className="modal-section">
                <h3>Qualifications</h3>

                {selectedDoctor.qualifications?.length > 0 ? (
                  <div className="qualification-list">
                    {selectedDoctor.qualifications.map((q, index) => (
                      <div className="qualification-card" key={index}>
                        <h4>{q.degree}</h4>

                        <p>{q.institute}</p>

                        <span>{q.year}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">Qualifications not available.</p>
                )}
              </div>

              {/* ================= Languages ================= */}

              <div className="modal-section">
                <h3>Languages Known</h3>

                <div className="language-container">
                  {selectedDoctor.languagesKnown?.length > 0 ? (
                    selectedDoctor.languagesKnown.map((language, index) => (
                      <span className="language-chip" key={index}>
                        {language}
                      </span>
                    ))
                  ) : (
                    <span className="language-chip">Not Available</span>
                  )}
                </div>
              </div>

              {/* ================= Address ================= */}

              <div className="modal-section">
                <h3>Clinic Address</h3>

                <div className="address-card">
                  <p>
                    {selectedDoctor.address?.street}

                    {selectedDoctor.address?.street && ", "}

                    {selectedDoctor.address?.city}

                    {selectedDoctor.address?.city && ", "}

                    {selectedDoctor.address?.state}

                    {selectedDoctor.address?.state && ", "}

                    {selectedDoctor.address?.country}

                    {selectedDoctor.address?.pincode &&
                      ` - ${selectedDoctor.address.pincode}`}
                  </p>
                </div>
              </div>
              {/* ================= Availability ================= */}

              <div className="modal-section">
                <h3>Weekly Availability</h3>

                {selectedDoctor.availability?.length > 0 ? (
                  <table className="availability-table">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>From</th>
                        <th>To</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedDoctor.availability.map((slot) => (
                        <tr key={slot._id || slot.day}>
                          <td>{slot.day}</td>
                          <td>{slot.startTime}</td>
                          <td>{slot.endTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-data">No availability schedule added.</p>
                )}
              </div>

              {/* ================= Emergency Capabilities ================= */}

              <div className="modal-section">
                <h3>Emergency Capabilities</h3>

                <div className="language-container">
                  {selectedDoctor.emergencyCapabilities?.traumaCare && (
                    <span className="language-chip">Trauma Care</span>
                  )}

                  {selectedDoctor.emergencyCapabilities?.criticalCare && (
                    <span className="language-chip">Critical Care</span>
                  )}

                  {selectedDoctor.emergencyCapabilities?.strokeManagement && (
                    <span className="language-chip">Stroke Management</span>
                  )}

                  {selectedDoctor.emergencyCapabilities?.cardiacEmergency && (
                    <span className="language-chip">Cardiac Emergency</span>
                  )}

                  {selectedDoctor.emergencyCapabilities
                    ?.ventilatorManagement && (
                    <span className="language-chip">Ventilator Management</span>
                  )}

                  {!selectedDoctor.emergencyCapabilities?.traumaCare &&
                    !selectedDoctor.emergencyCapabilities?.criticalCare &&
                    !selectedDoctor.emergencyCapabilities?.strokeManagement &&
                    !selectedDoctor.emergencyCapabilities?.cardiacEmergency &&
                    !selectedDoctor.emergencyCapabilities
                      ?.ventilatorManagement && (
                      <span className="language-chip">
                        No emergency capabilities specified
                      </span>
                    )}
                </div>
              </div>

              {/* ================= Biography ================= */}

              {selectedDoctor.biography && (
                <div className="modal-section">
                  <h3>About Doctor</h3>

                  <div className="address-card">
                    <p>{selectedDoctor.biography}</p>
                  </div>
                </div>
              )}

              {/* ================= Statistics ================= */}

              <div className="modal-section">
                <h3>Professional Statistics</h3>

                <div className="modal-grid">
                  <div className="modal-item">
                    <strong>Average Rating</strong>
                    <span>⭐ {selectedDoctor.averageRating || 0}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Total Reviews</strong>
                    <span>{selectedDoctor.totalReviews || 0}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Patients Treated</strong>
                    <span>{selectedDoctor.totalPatientsTreated || 0}</span>
                  </div>

                  <div className="modal-item">
                    <strong>Appointment Required</strong>
                    <span>
                      {selectedDoctor.appointmentRequired ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ================= Footer ================= */}

              <div className="modal-footer">
                <button className="close-profile-btn" onClick={closeDetails}>
                  Close Profile
                </button>

                <button
                  className="appointment-btn"
                  onClick={() => {
                    setShowDetails(false);
                    openAppointmentForm(selectedDoctor);
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= BOOK APPOINTMENT MODAL ================= */}

        {showForm && selectedDoctor && (
          <div className="appointment-modal">
            <div className="appointment-container">
              <button className="appointment-close" onClick={closeForm}>
                ✕
              </button>

              {/* Header */}

              <div className="appointment-header">
                <img
                  src={selectedDoctor.profilePhoto || assets.doctor}
                  alt={selectedDoctor.fullName}
                />

                <div>
                  <h2>Dr. {selectedDoctor.fullName}</h2>

                  <p>{selectedDoctor.specialization}</p>

                  <span>{selectedDoctor.consultationType} Consultation</span>
                </div>
              </div>

              {/* Form */}

              <form className="appointment-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Select Date</label>

                  <input
                    type="date"
                    name="date"
                    value={appointmentData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Select Time</label>

                  <select
                    name="timeSlot"
                    value={appointmentData.timeSlot}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose Time</option>

                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Reason for Visit</label>

                  <textarea
                    rows="5"
                    name="details"
                    placeholder="Describe your symptoms..."
                    value={appointmentData.details}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Summary */}

                <div className="appointment-summary">
                  <h3>Appointment Summary</h3>

                  <div className="summary-row">
                    <span>Doctor</span>
                    <span>Dr. {selectedDoctor.fullName}</span>
                  </div>

                  <div className="summary-row">
                    <span>Specialization</span>
                    <span>{selectedDoctor.specialization}</span>
                  </div>

                  <div className="summary-row">
                    <span>Consultation</span>
                    <span>{selectedDoctor.consultationType}</span>
                  </div>

                  <div className="summary-row">
                    <span>Fee</span>
                    <span>₹ {selectedDoctor.fees || 500}</span>
                  </div>
                </div>

                <div className="appointment-buttons">
                  <button
                    type="button"
                    className="cancel-booking"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="confirm-booking">
                    Confirm Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Doctor;
