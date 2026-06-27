import React from "react";
import "../../Pages/Doctor/Doctor.css";


const AvailabilitySection = ({ doctor, setDoctor }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setDoctor((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target;

    const updatedAvailability = [...doctor.availability];

    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [name]: value,
    };

    setDoctor((prev) => ({
      ...prev,
      availability: updatedAvailability,
    }));
  };

  const addAvailability = () => {
    setDoctor((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        {
          day: "",
          startTime: "",
          endTime: "",
        },
      ],
    }));
  };

  const removeAvailability = (index) => {
    const updatedAvailability = doctor.availability.filter(
      (_, i) => i !== index
    );

    setDoctor((prev) => ({
      ...prev,
      availability: updatedAvailability,
    }));
  };

  return (
    <section className="ds-section">
      <div className="ds-section-header">
        <h2>Availability & Consultation</h2>

        <p>
          Manage your consultation preferences,
          timings and appointment settings.
        </p>
      </div>

      {/* Consultation Settings */}

      <div className="ds-grid ds-grid-2">

        <div className="ds-field">
          <label>Consultation Type</label>

          <select
            name="consultationType"
            value={doctor.consultationType}
            onChange={handleChange}
            className="ds-input"
          >
            <option value="Physical">
              Physical
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Both">
              Both
            </option>
          </select>
        </div>

        <div className="ds-field">
          <label>
            Average Consultation Duration (Minutes)
          </label>

          <input
            type="number"
            name="averageConsultationDuration"
            value={
              doctor.averageConsultationDuration
            }
            onChange={handleChange}
            className="ds-input"
            min="1"
          />
        </div>

      </div>

      {/* Appointment Required */}

      <div className="ds-switch-row">

        <label>
          Appointment Required
        </label>

        <div
          className={`ds-toggle ${
            doctor.appointmentRequired
              ? "ds-toggle-active"
              : "ds-toggle-inactive"
          }`}
          onClick={() =>
            setDoctor((prev) => ({
              ...prev,
              appointmentRequired:
                !prev.appointmentRequired,
            }))
          }
        >
          <div className="ds-toggle-ball"></div>
        </div>

      </div>

      {/* Emergency Duty */}

      <div className="ds-switch-row">

        <label>
          Available For Emergency Duty
        </label>

        <div
          className={`ds-toggle ${
            doctor.emergencyDuty
              ? "ds-toggle-active"
              : "ds-toggle-inactive"
          }`}
          onClick={() =>
            setDoctor((prev) => ({
              ...prev,
              emergencyDuty:
                !prev.emergencyDuty,
            }))
          }
        >
          <div className="ds-toggle-ball"></div>
        </div>

      </div>

      {/* Availability Schedule */}

      <div className="ds-subsection">

        <h3>Weekly Schedule</h3>

        {doctor.availability?.length === 0 && (
          <div className="ds-empty-state">
            No availability slots added.
          </div>
        )}

        {doctor.availability?.map(
          (slot, index) => (
            <div
              key={index}
              className="ds-card-block"
            >
              <div className="ds-card-header">

                <h3>
                  Schedule #{index + 1}
                </h3>

                <button
                  type="button"
                  className="ds-remove-btn"
                  onClick={() =>
                    removeAvailability(index)
                  }
                >
                  Remove
                </button>

              </div>

              <div className="ds-grid ds-grid-3">

                <div className="ds-field">
                  <label>Day</label>

                  <select
                    name="day"
                    value={slot.day}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        e
                      )
                    }
                    className="ds-input"
                  >
                    <option value="">
                      Select Day
                    </option>

                    <option>
                      Monday
                    </option>

                    <option>
                      Tuesday
                    </option>

                    <option>
                      Wednesday
                    </option>

                    <option>
                      Thursday
                    </option>

                    <option>
                      Friday
                    </option>

                    <option>
                      Saturday
                    </option>

                    <option>
                      Sunday
                    </option>
                  </select>
                </div>

                <div className="ds-field">
                  <label>
                    Start Time
                  </label>

                  <input
                    type="time"
                    name="startTime"
                    value={slot.startTime}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        e
                      )
                    }
                    className="ds-input"
                  />
                </div>

                <div className="ds-field">
                  <label>
                    End Time
                  </label>

                  <input
                    type="time"
                    name="endTime"
                    value={slot.endTime}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        index,
                        e
                      )
                    }
                    className="ds-input"
                  />
                </div>

              </div>
            </div>
          )
        )}

        <button
          type="button"
          className="ds-add-btn"
          onClick={addAvailability}
        >
          + Add Schedule
        </button>

      </div>
    </section>
  );
};

export default AvailabilitySection;