import React from "react";
import "./Filter.css";

const Filter = ({ group, setGroup, component, setComponent, search, setSearch }) => {
  return (
    <div className="container">
      <div className="filter-container">

        {/* LEFT SIDE FILTERS */}
        <div className="filter-left">

          <div className="filter-label">
            <label>Filter:</label>
          </div>

          {/* Blood Group */}
          <div className="filter-group">
            <label>Blood Group:</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="All">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Component Type */}
          <div className="filter-group">
            <label>Component Type:</label>
            <select
              value={component}
              onChange={(e) => setComponent(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Plasma">Plasma</option>
              <option value="Platelets">Platelets</option>
              <option value="Whole Blood">Whole Blood</option>
              <option value="Cryoprecipitate">Cryoprecipitate</option>
              <option value="Packed RBC">Packed RBC</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            className="filter-btn"
            onClick={() => {
              setGroup("All");
              setComponent("All");
              setSearch("");
            }}
          >
            Reset Filters
          </button>

        </div>

        

      </div>
    </div>
  );
};

export default Filter;