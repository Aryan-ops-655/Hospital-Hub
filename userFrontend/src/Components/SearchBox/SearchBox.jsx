import React, { useEffect } from "react";
import "./SearchBox.css";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { useLocation } from "../Location/Location"; 

const SearchBox = () => {
  const user = "Aryan";

  const { location, loading, error, getLocation } = useLocation();

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="header-container">
      <h1 className="welcome">Welcome, {user}</h1>

      <div className="location-row">
        <FiMapPin className="loc-icon" />

        <span className="location-text">
          {loading ? "Detecting location..." : location || error}
          
          <span onClick={getLocation} className="change">(Change ›)</span>
        </span>
      </div>

      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search city, hospital, blood group, bed..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
