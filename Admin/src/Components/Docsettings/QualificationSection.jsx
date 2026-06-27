import React from "react";
import "../../Pages/Doctor/Doctor.css";

const QualificationSection = ({ doctor, setDoctor }) => {
  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;

    const updatedQualifications = [...doctor.qualifications];

    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [name]: value,
    };

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
      (_, i) => i !== index
    );

    setDoctor((prev) => ({
      ...prev,
      qualifications: updatedQualifications,
    }));
  };

  return (
    <section className="ds-section">
      <div className="ds-section-header">
        <h2>Qualifications</h2>

        <p>
          Add all educational qualifications and medical
          degrees obtained throughout your career.
        </p>
      </div>

      {doctor.qualifications?.length === 0 && (
        <div className="ds-empty-state">
          No qualifications added yet.
        </div>
      )}

      {doctor.qualifications?.map((qualification, index) => (
        <div
          key={index}
          className="ds-card-block"
        >
          <div className="ds-card-header">
            <h3>
              Qualification #{index + 1}
            </h3>

            <button
              type="button"
              className="ds-remove-btn"
              onClick={() => removeQualification(index)}
            >
              Remove
            </button>
          </div>

          <div className="ds-grid ds-grid-3">
            <div className="ds-field">
              <label>Degree</label>

              <input
                type="text"
                name="degree"
                value={qualification.degree}
                onChange={(e) =>
                  handleQualificationChange(index, e)
                }
                className="ds-input"
                placeholder="MBBS"
              />
            </div>

            <div className="ds-field">
              <label>Institute</label>

              <input
                type="text"
                name="institute"
                value={qualification.institute}
                onChange={(e) =>
                  handleQualificationChange(index, e)
                }
                className="ds-input"
                placeholder="AIIMS Delhi"
              />
            </div>

            <div className="ds-field">
              <label>Year</label>

              <input
                type="number"
                name="year"
                value={qualification.year}
                onChange={(e) =>
                  handleQualificationChange(index, e)
                }
                className="ds-input"
                placeholder="2018"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="ds-add-btn"
        onClick={addQualification}
      >
        + Add Qualification
      </button>
    </section>
  );
};

export default QualificationSection;