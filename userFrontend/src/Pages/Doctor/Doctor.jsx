import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { assets } from "../../assets/assets";
import "./Doctor.css";
const Doctor = () => {
  const { docList, createBooking } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    timeSlot: "",
    details: "",
  });
  const openAppointmentForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setSelectedDoctor(null);
    setAppointmentData({ date: "", timeSlot: "", details: "" });
  };
  const handleInputChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
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
      alert(result.message);
      closeForm();
    } else {
      alert(result.message);
    }
  };
  return (
    <>
      {" "}
      <div className="doctor-list-cont">
        {" "}
        <div className="result-grid">
          {" "}
          {docList.map((item) => (
            <div key={item._id} className="doc-card">
              {" "}
              <div className="doc-card-top">
                {" "}
                <div className="doc-profile">
                  {" "}
                  <img src={assets.doctor} alt="doctor" />{" "}
                </div>{" "}
                <div className="doc-profile-data">
                  {" "}
                  <span style={{ fontSize: "25px", fontWeight: "600" }}>
                    {" "}
                    Dr. {item.fullName}{" "}
                  </span>{" "}
                  <span
                    style={{ fontSize: "18px", textTransform: "uppercase" }}
                  >
                    {" "}
                    {item.specialization}{" "}
                  </span>{" "}
                  <span
                    style={{ display: "flex", gap: "8px", fontSize: "14px" }}
                  >
                    {" "}
                    {item.qualifications?.degree}{" "}
                    <div
                      style={{
                        width: "1px",
                        border: "1px solid grey",
                        borderRadius: "2px",
                      }}
                    />{" "}
                    {item.yearsOfExperience}+ Years Experience{" "}
                  </span>{" "}
                  <span style={{ fontSize: "14px" }}>
                    {" "}
                    <p>RATING & REVIEWS</p> {item.averageRating} (
                    {item.totalReviews}){" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  border: "1px solid grey",
                  borderRadius: "2px",
                }}
              />{" "}
              <div className="doc-card-btm">
                {" "}
                <span>
                  {" "}
                  Consultant at: {item.hospitalName || "Hospital"}{" "}
                </span>{" "}
                <span> Experience: {item.yearsOfExperience} Years </span>{" "}
                <span>
                  {" "}
                  Status:{" "}
                  {item.accountStatus === "Active" ? (
                    <span style={{ color: "green" }}>Active</span>
                  ) : (
                    <span style={{ color: "red" }}>Inactive</span>
                  )}{" "}
                </span>{" "}
                <span>Fee: ₹500</span>{" "}
                <div className="doc-card-btns">
                  {" "}
                  <div
                    className="doc-btns app-btn"
                    onClick={() => openAppointmentForm(item)}
                  >
                    {" "}
                    Book Appointment{" "}
                  </div>{" "}
                  <div className="doc-btns"> View Details </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/* Appointment Modal */}{" "}
      {showForm && (
        <div className="appointment-modal">
          {" "}
          <div className="appointment-form-container">
            {" "}
            <h2> Book Appointment with Dr. {selectedDoctor?.fullName} </h2>{" "}
            <form onSubmit={handleSubmit}>
              {" "}
              <label>Appointment Date</label>{" "}
              <input
                type="date"
                name="date"
                value={appointmentData.date}
                onChange={handleInputChange}
                required
              />{" "}
              <label>Time Slot</label>{" "}
              <select
                name="timeSlot"
                value={appointmentData.timeSlot}
                onChange={handleInputChange}
                required
              >
                {" "}
                <option value="">Select Time Slot</option>{" "}
                <option value="09:00 AM">09:00 AM</option>{" "}
                <option value="10:00 AM">10:00 AM</option>{" "}
                <option value="11:00 AM">11:00 AM</option>{" "}
                <option value="12:00 PM">12:00 PM</option>{" "}
                <option value="02:00 PM">02:00 PM</option>{" "}
                <option value="03:00 PM">03:00 PM</option>{" "}
                <option value="04:00 PM">04:00 PM</option>{" "}
              </select>{" "}
              <label>Describe Your Problem</label>{" "}
              <textarea
                name="details"
                rows="4"
                placeholder="Enter symptoms or reason for consultation..."
                value={appointmentData.details}
                onChange={handleInputChange}
                required
              />{" "}
              <div className="form-buttons">
                {" "}
                <button type="submit"> Confirm Appointment </button>{" "}
                <button type="button" onClick={closeForm}>
                  {" "}
                  Cancel{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};
export default Doctor;
