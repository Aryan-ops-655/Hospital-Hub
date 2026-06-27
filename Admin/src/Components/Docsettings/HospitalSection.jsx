import React from "react";
import "../../Pages/Doctor/Doctor.css";

const HospitalSection = ({ doctor, setDoctor }) => {

  const handleHospitalChange = (index, e) => {
    const { name, value } = e.target;

    const updatedHospitals = [...doctor.hospitals];

    updatedHospitals[index] = {
      ...updatedHospitals[index],
      [name]: value,
    };

    setDoctor((prev) => ({
      ...prev,
      hospitals: updatedHospitals,
    }));
  };

  const handleStatusChange = (index) => {
    const updatedHospitals = [...doctor.hospitals];

    updatedHospitals[index].activeStatus =
      !updatedHospitals[index].activeStatus;

    setDoctor((prev) => ({
      ...prev,
      hospitals: updatedHospitals,
    }));
  };

  const addHospital = () => {
    setDoctor((prev) => ({
      ...prev,
      hospitals: [
        ...prev.hospitals,
        {
          hospitalId: "",
          hospitalName: "",
          department: "",
          designation: "",
          joiningDate: "",
          activeStatus: true,
        },
      ],
    }));
  };

  const removeHospital = (index) => {
    const updatedHospitals = doctor.hospitals.filter(
      (_, i) => i !== index
    );

    setDoctor((prev) => ({
      ...prev,
      hospitals: updatedHospitals,
    }));
  };

  return (
    <section className="ds-section">

      <div className="ds-section-header">
        <h2>Hospital Associations</h2>

        <p>
          Add all hospitals, clinics and healthcare
          organizations where you currently work.
        </p>
      </div>

      {doctor.hospitals?.length === 0 && (
        <div className="ds-empty-state">
          No hospital associations added.
        </div>
      )}

      {doctor.hospitals?.map((hospital, index) => (
        <div
          key={index}
          className="ds-card-block"
        >

          <div className="ds-card-header">
            <h3>
              Hospital #{index + 1}
            </h3>

            <button
              type="button"
              className="ds-remove-btn"
              onClick={() => removeHospital(index)}
            >
              Remove
            </button>
          </div>

          <div className="ds-grid ds-grid-2">

            <div className="ds-field">
              <label>Hospital ID</label>

              <input
                type="text"
                name="hospitalId"
                value={hospital.hospitalId}
                onChange={(e) =>
                  handleHospitalChange(index, e)
                }
                className="ds-input"
                placeholder="Hospital Database ID"
              />
            </div>

            <div className="ds-field">
              <label>Hospital Name</label>

              <input
                type="text"
                name="hospitalName"
                value={hospital.hospitalName}
                onChange={(e) =>
                  handleHospitalChange(index, e)
                }
                className="ds-input"
                placeholder="AIIMS Delhi"
              />
            </div>

            <div className="ds-field">
              <label>Department</label>

              <input
                type="text"
                name="department"
                value={hospital.department}
                onChange={(e) =>
                  handleHospitalChange(index, e)
                }
                className="ds-input"
                placeholder="Cardiology"
              />
            </div>

            <div className="ds-field">
              <label>Designation</label>

              <input
                type="text"
                name="designation"
                value={hospital.designation}
                onChange={(e) =>
                  handleHospitalChange(index, e)
                }
                className="ds-input"
                placeholder="Senior Consultant"
              />
            </div>

            <div className="ds-field">
              <label>Joining Date</label>

              <input
                type="date"
                name="joiningDate"
                value={hospital.joiningDate}
                onChange={(e) =>
                  handleHospitalChange(index, e)
                }
                className="ds-input"
              />
            </div>

            <div className="ds-field">
              <label>Hospital Status</label>

              <div
                className={`ds-toggle ${
                  hospital.activeStatus
                    ? "ds-toggle-active"
                    : "ds-toggle-inactive"
                }`}
                onClick={() =>
                  handleStatusChange(index)
                }
              >
                <div className="ds-toggle-ball"></div>
              </div>

              <span className="ds-toggle-text">
                {hospital.activeStatus
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

          </div>
        </div>
      ))}

      <button
        type="button"
        className="ds-add-btn"
        onClick={addHospital}
      >
        + Add Hospital
      </button>

    </section>
  );
};

export default HospitalSection;