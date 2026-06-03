import React, { useEffect, useContext } from "react";
import "./SearchBox.css";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { UserContext } from "../../Context/UserContext";

const SearchBox = () => {
  const { user, locationName, loading, detectUserLocation, searchQuery, setSearchQuery, performSearch } = useContext(UserContext);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    performSearch(val);
  };

  return (
    <div className="header-container">
      <h1 className="welcome">Welcome, {user ? user.name : "Guest"}</h1>

      <div className="location-row">
        <FiMapPin className="loc-icon" />

        <span className="location-text">
          {loading ? "Detecting location..." : locationName}
          
          <span onClick={detectUserLocation} className="change" style={{ cursor: "pointer" }}>(Change ›)</span>
        </span>
      </div>

      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search city, hospital, blood group, bed..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
