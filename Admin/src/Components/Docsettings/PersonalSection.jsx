import React from "react";
import "../../Pages/Doctor/Doctor.css";


const PersonalSection = ({ doctor, setDoctor }) => {
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

  return (
    <section className="ds-section">

      <div className="ds-section-header">
        <h2>Personal Information</h2>
        <p>
          Manage your personal details and contact information.
        </p>
      </div>

      <div className="ds-grid ds-grid-2">

        <div className="ds-field">
          <label>Profile Photo URL</label>
          <input
            type="text"
            name="profilePhoto"
            value={doctor.profilePhoto}
            onChange={handleChange}
            placeholder="https://..."
            className="ds-input"
          />
        </div>

        <div className="ds-field">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={doctor.fullName}
            onChange={handleChange}
            className="ds-input"
          />
        </div>

        <div className="ds-field">
          <label>Gender</label>

          <select
            name="gender"
            value={doctor.gender}
            onChange={handleChange}
            className="ds-input"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="ds-field">
          <label>Date of Birth</label>

          <input
            type="date"
            name="dateOfBirth"
            value={doctor.dateOfBirth}
            onChange={handleChange}
            className="ds-input"
          />
        </div>

        <div className="ds-field">
          <label>Phone Number</label>

          <input
            type="text"
            name="phoneNumber"
            value={doctor.phoneNumber}
            onChange={handleChange}
            className="ds-input"
          />
        </div>

        <div className="ds-field">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            className="ds-input"
          />
        </div>
      </div>

      <div className="ds-subsection">
        <h3>Address Information</h3>

        <div className="ds-grid ds-grid-2">

          <div className="ds-field">
            <label>Street</label>

            <input
              type="text"
              name="street"
              value={doctor.address.street}
              onChange={handleAddressChange}
              className="ds-input"
            />
          </div>

          <div className="ds-field">
            <label>City</label>

            <input
              type="text"
              name="city"
              value={doctor.address.city}
              onChange={handleAddressChange}
              className="ds-input"
            />
          </div>

          <div className="ds-field">
            <label>State</label>

            <input
              type="text"
              name="state"
              value={doctor.address.state}
              onChange={handleAddressChange}
              className="ds-input"
            />
          </div>

          <div className="ds-field">
            <label>Country</label>

            <input
              type="text"
              name="country"
              value={doctor.address.country}
              onChange={handleAddressChange}
              className="ds-input"
            />
          </div>

          <div className="ds-field">
            <label>Pincode</label>

            <input
              type="text"
              name="pincode"
              value={doctor.address.pincode}
              onChange={handleAddressChange}
              className="ds-input"
            />
          </div>

        </div>
      </div>

    </section>
  );
};

export default PersonalSection;

