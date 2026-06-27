import React from "react";
import "../../Pages/Doctor/Doctor.css";

const EmergencySection = ({ doctor, setDoctor }) => {
  const toggleCapability = (capability) => {
    setDoctor((prev) => ({
      ...prev,
      emergencyCapabilities: {
        ...prev.emergencyCapabilities,
        [capability]:
          !prev.emergencyCapabilities[capability],
      },
    }));
  };

  const capabilities = [
    {
      key: "traumaCare",
      title: "Trauma Care",
      icon: "🚑",
      description:
        "Emergency trauma and accident management",
    },
    {
      key: "criticalCare",
      title: "Critical Care",
      icon: "🏥",
      description:
        "ICU and critical patient management",
    },
    {
      key: "strokeManagement",
      title: "Stroke Management",
      icon: "🧠",
      description:
        "Stroke diagnosis and treatment",
    },
    {
      key: "cardiacEmergency",
      title: "Cardiac Emergency",
      icon: "❤️",
      description:
        "Heart attack and cardiac emergency care",
    },
    {
      key: "ventilatorManagement",
      title: "Ventilator Management",
      icon: "🫁",
      description:
        "Ventilator support and monitoring",
    },
  ];

  return (
    <section className="ds-section">
      <div className="ds-section-header">
        <h2>Emergency Capabilities</h2>

        <p>
          Select emergency services you are
          qualified to handle.
        </p>
      </div>

      <div className="ds-capability-grid">
        {capabilities.map((item) => (
          <div
            key={item.key}
            className={`ds-capability-card ${
              doctor.emergencyCapabilities?.[
                item.key
              ]
                ? "ds-capability-active"
                : ""
            }`}
            onClick={() =>
              toggleCapability(item.key)
            }
          >
            <div className="ds-capability-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <div className="ds-capability-status">
              {doctor.emergencyCapabilities?.[
                item.key
              ]
                ? "Enabled"
                : "Disabled"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmergencySection;