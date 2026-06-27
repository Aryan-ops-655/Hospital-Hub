import React from "react";
import "../../Pages/Doctor/Doctor.css";


const ProfessionalSection = ({ doctor, setDoctor }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguagesChange = (e) => {
    const value = e.target.value;

    setDoctor((prev) => ({
      ...prev,
      languagesKnown: value
        .split(",")
        .map((lang) => lang.trim())
        .filter(Boolean),
    }));
  };

  return (
    <section className="ds-section">

      <div className="ds-section-header">
        <h2>Professional Information</h2>
        <p>
          Manage your medical credentials, specialization,
          licenses and professional profile.
        </p>
      </div>

      <div className="ds-grid ds-grid-2">

        <div className="ds-field">
          <label>Specialization</label>

          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            className="ds-input"
            placeholder="Cardiology"
          />
        </div>

        <div className="ds-field">
          <label>Super Specialization</label>

          <input
            type="text"
            name="superSpecialization"
            value={doctor.superSpecialization}
            onChange={handleChange}
            className="ds-input"
            placeholder="Interventional Cardiology"
          />
        </div>

        <div className="ds-field">
          <label>Years of Experience</label>

          <input
            type="number"
            name="yearsOfExperience"
            value={doctor.yearsOfExperience}
            onChange={handleChange}
            className="ds-input"
            min="0"
          />
        </div>

        <div className="ds-field">
          <label>Medical Registration Number</label>

          <input
            type="text"
            name="medicalRegistrationNumber"
            value={doctor.medicalRegistrationNumber}
            onChange={handleChange}
            className="ds-input"
            placeholder="MCI123456"
          />
        </div>

        <div className="ds-field">
          <label>Registration Council</label>

          <input
            type="text"
            name="registrationCouncil"
            value={doctor.registrationCouncil}
            onChange={handleChange}
            className="ds-input"
            placeholder="Medical Council of India"
          />
        </div>

        <div className="ds-field">
          <label>License Validity</label>

          <input
            type="date"
            name="licenseValidity"
            value={doctor.licenseValidity}
            onChange={handleChange}
            className="ds-input"
          />
        </div>

      </div>

      <div className="ds-subsection">

        <h3>Languages Known</h3>

        <div className="ds-field">
          <label>
            Enter languages separated by commas
          </label>

          <input
            type="text"
            value={doctor.languagesKnown?.join(", ") || ""}
            onChange={handleLanguagesChange}
            className="ds-input"
            placeholder="Hindi, English, Bengali"
          />
        </div>

      </div>

      <div className="ds-subsection">

        <h3>Professional Biography</h3>

        <div className="ds-field">
          <label>Doctor Bio</label>

          <textarea
            name="biography"
            value={doctor.biography}
            onChange={handleChange}
            className="ds-textarea"
            placeholder="Write about your experience, expertise and achievements..."
          />
        </div>

      </div>

    </section>
  );
};

export default ProfessionalSection;
