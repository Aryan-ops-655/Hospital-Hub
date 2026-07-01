import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../constant";
import {
  ClipboardList,
  RefreshCw,
  Search,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  Trash2,
  Check,
  X,
} from "lucide-react";

import "../Management.css";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // ================= Fetch Requests =================

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/request/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      toast.error("Unable to fetch requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= Update Status =================

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/request/status`,
        { id, status },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(`Request ${status}`);
        fetchRequests();
      }
    } catch (error) {
      toast.error("Failed to update request.");
    }
  };

  // ================= Delete =================

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this request permanently?");

    if (!confirm) return;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/request/delete`,
        { id },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success("Request deleted");
        fetchRequests();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ================= Statistics =================

  const totalRequests = requests.length;

  const pendingRequests = requests.filter((r) => r.status === "Pending").length;

  const acceptedRequests = requests.filter(
    (r) => r.status === "Accepted",
  ).length;

  const rejectedRequests = requests.filter(
    (r) => r.status === "Rejected",
  ).length;

  // ================= Search =================

  const filteredRequests = requests.filter((req) =>
    req.userName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="management-page">
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <div>
          <h2>
            <ClipboardList className="title-icon" />
            User Requests
          </h2>

          <p>Manage all appointment and hospital service requests.</p>
        </div>

        <button className="refresh-btn" onClick={fetchRequests}>
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* ================= DASHBOARD ================= */}

      <div className="request-dashboard">
        <div className="dashboard-card total">
          <Users size={30} />

          <div>
            <h3>{totalRequests}</h3>

            <span>Total Requests</span>
          </div>
        </div>

        <div className="dashboard-card pending">
          <Clock3 size={30} />

          <div>
            <h3>{pendingRequests}</h3>

            <span>Pending</span>
          </div>
        </div>

        <div className="dashboard-card accepted">
          <CheckCircle2 size={30} />

          <div>
            <h3>{acceptedRequests}</h3>

            <span>Accepted</span>
          </div>
        </div>

        <div className="dashboard-card rejected">
          <XCircle size={30} />

          <div>
            <h3>{rejectedRequests}</h3>

            <span>Rejected</span>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="search-container">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search by patient name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>

              <th>Service</th>

              <th>Appointment Details</th>

              <th>Request Date</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  <div className="empty-box">
                    <ClipboardList size={60} />
                    <h3>No Requests Found</h3>
                    <p>No appointment or service requests match your search.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => (
                <tr key={req._id} className="request-row">
                  {/* ================= PATIENT ================= */}

                  <td>
                    <div className="patient-info">
                      <div className="patient-avatar">
                        {req.userName
                          ? req.userName.charAt(0).toUpperCase()
                          : "U"}
                      </div>

                      <div className="patient-details">
                        <h4>{req.userName}</h4>
                        <span>{req.userContact || "Not Available"}</span>
                      </div>
                    </div>
                  </td>

                  {/* ================= SERVICE ================= */}

                  <td>
                    <span className="service-pill">{req.serviceType}</span>
                  </td>

                  {/* ================= DETAILS ================= */}

                  <td>
                    {req.details ? (
                      <div className="details-card">
                        {Object.entries(req.details).map(([key, value]) => (
                          <div key={key} className="detail-item">
                            <strong>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                              :
                            </strong>

                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="no-details">No Details</span>
                    )}
                  </td>

                  {/* ================= DATE ================= */}

                  <td>
                    <div className="date-box">
                      <span>
                        {new Date(req.requestDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  {/* ================= STATUS ================= */}

                  <td>
                    <span
                      className={`status-badge ${req.status.toLowerCase()}`}
                    >
                      {req.status}
                    </span>
                  </td>

                  {/* ================= ACTIONS ================= */}

                  <td>
                    <div className="action-buttons">
                      {req.status === "Pending" && (
                        <>
                          <button
                            className="accept-btn"
                            onClick={() => updateStatus(req._id, "Accepted")}
                          >
                            <Check size={16} />
                            Accept
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() => updateStatus(req._id, "Rejected")}
                          >
                            <X size={16} />
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(req._id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
