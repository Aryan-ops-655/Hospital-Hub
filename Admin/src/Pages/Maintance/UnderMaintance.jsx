import React from "react";

const UnderMaintenance = () => {
  return (
    <div
      style={{
        minHeight: "100%",
        width: "100%",
        background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "50px 40px",
          textAlign: "center",
          boxShadow: "0 15px 40px rgba(37,99,235,0.15)",
          border: "1px solid #bfdbfe",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 25px",
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "40px",
          }}
        >
          🚧
        </div>

        <h1
          style={{
            color: "#1e3a8a",
            fontSize: "32px",
            marginBottom: "15px",
          }}
        >
          Under Maintenance
        </h1>

        <p
          style={{
            color: "#475569",
            fontSize: "16px",
            lineHeight: "28px",
            marginBottom: "35px",
          }}
        >
          We're currently working on this feature to provide you with a better
          experience.
          <br />
          Please check back soon.
        </p>

        <div
          style={{
            display: "inline-block",
            background: "#dbeafe",
            color: "#2563eb",
            padding: "12px 28px",
            borderRadius: "50px",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          🚀 Coming Soon
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;