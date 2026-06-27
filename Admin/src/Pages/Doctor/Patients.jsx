import React, { useContext, useMemo, useState } from "react";
import "./Patients.css";
import { AdminContext } from "../../Context/adminContext";

const Patients = () => {
  const [search, setSearch] = useState("");
  const {requests} = useContext(AdminContext);

  const filteredPatients = useMemo(() => {
    return requests.filter((patient) =>
      patient.userName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [requests, search]);

  const pending = requests.filter((r) => r.status === "Pending").length;

  const accepted = requests.filter((r) => r.status === "Accepted").length;

  return (
    <div className="pt-page">
      <div className="pt-header">
        <div>
          <h1>Patients Records</h1>
          <p>Manage all appointment records</p>
        </div>

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pt-search"
        />
      </div>

      <div className="pt-stats">
        <div className="pt-stat-card">
          <h2>{requests.length}</h2>
          <span>Total Patients</span>
        </div>

        <div className="pt-stat-card">
          <h2>{pending}</h2>
          <span>Pending</span>
        </div>

        <div className="pt-stat-card">
          <h2>{accepted}</h2>
          <span>Accepted</span>
        </div>
      </div>

      <div className="pt-list">
        {filteredPatients.length === 0 ? (
          <div className="pt-empty">No Patients Found</div>
        ) : (
          filteredPatients.map((patient) => (
            <div className="pt-card" key={patient._id}>
              <div className="pt-top">
                <div>
                  <h2>{patient.userName}</h2>

                  <p>{patient.userContact}</p>
                </div>

                <span className={`pt-status ${patient.status.toLowerCase()}`}>
                  {patient.status}
                </span>
              </div>

              <div className="pt-body">
                <div>
                  <label>Appointment Date</label>

                  <p>{patient.details.appointmentDate}</p>
                </div>

                <div>
                  <label>Time Slot</label>

                  <p>{patient.details.timeSlot}</p>
                </div>

                <div>
                  <label>Problem</label>

                  <p>{patient.details.problem}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;
