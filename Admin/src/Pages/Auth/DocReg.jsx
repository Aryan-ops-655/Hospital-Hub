import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { BACKEND_URL } from "../../../constant";

const DocReg = () => {
  const [doctor, setDoctor] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    password: "",
    medicalRegistrationNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    specialization: "",
    superSpecialization: "",
    qualifications: [
      {
        degree: "",
        institute: "",
        year: "",
      },
    ],
    yearsOfExperience: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setDoctor((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;

    const updatedQualifications = [...doctor.qualifications];
    updatedQualifications[index][name] = value;

    setDoctor((prev) => ({
      ...prev,
      qualifications: updatedQualifications,
    }));
  };

  const addQualification = () => {
    setDoctor((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        {
          degree: "",
          institute: "",
          year: "",
        },
      ],
    }));
  };

  const removeQualification = (index) => {
    const updatedQualifications = doctor.qualifications.filter(
      (_, i) => i !== index,
    );

    setDoctor((prev) => ({
      ...prev,
      qualifications: updatedQualifications,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/api/doctor/register`, doctor );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("doctor", JSON.stringify(response.data.doctor));

        toast.success("Registration Successful!");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="doc-container">
      <div className="doc-form-wrapper">
        <h2 className="doc-title">Doctor Registration</h2>

        <form className="doc-form" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h3 className="doc-section-title">Personal Information</h3>

          <div className="doc-input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={doctor.fullName}
              onChange={handleChange}
              className="doc-input"
              required
            />
          </div>

          <div className="doc-input-group">
            <label>Gender</label>
            <select
              name="gender"
              value={doctor.gender}
              onChange={handleChange}
              className="doc-input"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="doc-input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={doctor.phoneNumber}
              onChange={handleChange}
              className="doc-input"
              required
            />
          </div>

          <div className="doc-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              className="doc-input"
              required
            />
          </div>

          <div className="doc-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
              className="doc-input"
              placeholder="Enter Password"
              required
              minLength={8}
            />
          </div>

          <div className="doc-input-group">
            <label>Medical Registration Number</label>
            <input
              type="text"
              name="medicalRegistrationNumber"
              value={doctor.medicalRegistrationNumber}
              onChange={handleChange}
              className="doc-input"
              placeholder="Enter Registration Number"
              required
            />
          </div>

          {/* Address */}
          <h3 className="doc-section-title">Address Information</h3>

          <div className="doc-grid">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={doctor.address.street}
              onChange={handleAddressChange}
              className="doc-input"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={doctor.address.city}
              onChange={handleAddressChange}
              className="doc-input"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={doctor.address.state}
              onChange={handleAddressChange}
              className="doc-input"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={doctor.address.country}
              onChange={handleAddressChange}
              className="doc-input"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={doctor.address.pincode}
              onChange={handleAddressChange}
              className="doc-input"
            />
          </div>

          {/* Professional Information */}
          <h3 className="doc-section-title">Professional Information</h3>

          <div className="doc-input-group">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              className="doc-input"
              required
            />
          </div>

          <div className="doc-input-group">
            <label>Super Specialization</label>
            <input
              type="text"
              name="superSpecialization"
              value={doctor.superSpecialization}
              onChange={handleChange}
              className="doc-input"
            />
          </div>

          <div className="doc-input-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={doctor.yearsOfExperience}
              onChange={handleChange}
              className="doc-input"
              min="0"
            />
          </div>

          {/* Qualifications */}
          <h3 className="doc-section-title">Qualifications</h3>

          {doctor.qualifications.map((qualification, index) => (
            <div key={index} className="doc-qualification-box">
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={qualification.degree}
                onChange={(e) => handleQualificationChange(index, e)}
                className="doc-input"
              />

              <input
                type="text"
                name="institute"
                placeholder="Institute"
                value={qualification.institute}
                onChange={(e) => handleQualificationChange(index, e)}
                className="doc-input"
              />

              <input
                type="number"
                name="year"
                placeholder="Year"
                value={qualification.year}
                onChange={(e) => handleQualificationChange(index, e)}
                className="doc-input"
              />

              {doctor.qualifications.length > 1 && (
                <button
                  type="button"
                  className="doc-remove-btn"
                  onClick={() => removeQualification(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="doc-add-btn"
            onClick={addQualification}
          >
            + Add Qualification
          </button>

          <button type="submit" className="doc-submit-btn">
            Register Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocReg;
