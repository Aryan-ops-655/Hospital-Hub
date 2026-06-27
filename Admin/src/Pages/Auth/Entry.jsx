import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AdminContext } from "../../Context/adminContext";

const Entry = () => {
  
  const { setIsDoc }  = useContext(AdminContext);

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .lo-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg,  #0f172a, #081b4d);l
            font-family: "Segoe UI", sans-serif;
          }

          .lo-card {
            background: #e2d7d7;
            width: 420px;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }

          .lo-title {
            color: #0d6efd;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 10px;
          }

          .lo-subtitle {
            color: #666;
            font-size: 1rem;
            margin-bottom: 30px;
          }

          .lo-button-group {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .lo-btn {
            width: 100%;
            padding: 15px;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .lo-hospital-btn {
            background-color: #FFFFFF;
            color: #0b5ed7;
            border: 2px solid #0b5ed7;
          }

          .lo-hospital-btn:hover {
            background-color: #0b5ed7;
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(13, 110, 253, 0.3);
          }

          .lo-doctor-btn {
            background-color: white;
            color: #0d6efd;
            border: 2px solid #0d6efd;
          }

          .lo-doctor-btn:hover {
            background-color: #0d6efd;
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(13, 110, 253, 0.3);
          }

          @media (max-width: 480px) {
            .lo-card {
              width: 90%;
              padding: 30px 20px;
            }

            .lo-title {
              font-size: 1.8rem;
            }
          }
        `}
      </style>

      <div className="lo-container">
        <div className="lo-card">
          <h1 className="lo-title">Welcome</h1>
          <p className="lo-subtitle">Choose how you would like to login</p>

          <div className="lo-button-group">
            <Link to="/login">
              <button onClick={()=>{localStorage.setItem("type","user")}} className="lo-btn lo-hospital-btn">
                Enter as Hospital
              </button>
            </Link>

            <Link to="/doc-log">
                <button onClick={()=>{localStorage.setItem("type","doctor")}} className="lo-btn lo-doctor-btn">Enter as Doctor</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entry;
