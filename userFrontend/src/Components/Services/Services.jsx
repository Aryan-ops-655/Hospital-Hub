import React from "react";
import "./Services.css";
import { assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";


const Services = () => {
  return (
    <div className="services-container">
        <div className="upperCard">
            <div className="emergencyCard card">
                <div className="logo-text" >
                    <img src={assets.ambulance} alt="ambulance image" />
                    <div className="text">
                        <p className="p1">Emergency </p>
                        <p> Find Immediate Availability</p>
                    </div>
                </div>
                <img src={assets.right_arrow} alt=">" />
            </div>
            <div className="serviceCard">
                <Link to="/beds">
                    <div className="beds cards">
                        <div>
                            <img src={assets.bed} alt="b" />
                        </div>
                        <p>Beds</p>
                    </div>
                </Link>
                <Link to="/bloods">
                    <div className="blood cards">
                        <div>
                            <img src={assets.blood_drop} alt="b" />
                        </div>
                        <p>Bloods</p>
                    </div>
                </Link>
                <Link to="/oxygen">
                    <div className="beds cards">
                        <div>
                            <img src={assets.oxygen} alt="b" />
                        </div>
                        <p>Oxygen</p>
                    </div>
                </Link>
                <Link to="/docs">
                    <div className="beds cards">
                        <div>
                            <img src={assets.doctor} alt="b" />
                        </div>
                        <p>Doctors</p>
                    </div>
                </Link>
            </div>
        </div>

        <Link to="/hospitals">
            <div className="lowerCard card">
                <div>
                    <img src={assets.hospital_building} alt="hospital img" />
                </div>
                <div className="text">
                    <p className="p1">View Hospitals </p>
                    <p> Browse hospitals by name or location</p>
                </div>
            </div>
        </Link>
        
    </div>

        
  );
};

export default Services;
