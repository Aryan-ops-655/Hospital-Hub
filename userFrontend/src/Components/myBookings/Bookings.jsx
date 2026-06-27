import React, { useContext, useEffect } from 'react';
import "./Bookings.css";
import { UserContext } from '../../Context/UserContext';
import { assets } from '../../assets/assets';

const Bookings = () => {
  const { user, userBookings, fetchBookings } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getServiceImage = (type) => {
    switch (type) {
      case 'Bed': return assets.bed;
      case 'Blood': return assets.blood_drop;
      case 'Ambulance': return assets.ambulance;
      case 'Test': return assets.doctor;
      case 'Doctor Appointment': return assets.doctor;
      default: return assets.hospital_building;
    }
  };

  if (!user) {
    return (
      <div className='container' style={{ padding: "40px 20px", textAlign: "center" }}>
        <div className="header">
          <p>My Bookings</p>
        </div>
        <p style={{ color: "#718096", fontSize: "14px", fontWeight: "600" }}>Please login to view your active appointment bookings.</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className="header">
        <p>My Bookings</p>
      </div>
      
      <div className="bookedCards">
        {userBookings.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", color: "#718096", fontSize: "14px", fontWeight: "600", padding: "20px 0" }}>
            You haven't made any booking requests yet.
          </p>
        ) : (
          userBookings.map((items) => (
            <div key={items._id} className="booking-list-item">
              <div className='items'>
                <img src={getServiceImage(items.serviceType)} alt={items.serviceType} />
                <div className="text-content">
                  <p><strong>Booking Type:</strong> {items.serviceType}</p>
                  <p><strong>Hospital Name:</strong> {items.hospitalId ? items.hospitalId.name : 'Unknown Hospital'}</p>
                  <p><strong>Patient Name:</strong> {items.userName}</p>
                  {items.details && (
                    <div style={{ fontSize: "12px", background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", marginTop: "4px" }}>
                      {Object.entries(items.details).map(([key, val]) => (
                        <span key={key} style={{ marginRight: "10px" }}><strong>{key}:</strong> {val}</span>
                      ))}
                    </div>
                  )}
                  <p><strong>Date:</strong> {new Date(items.requestDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="details">
                <span className={`status-badge ${items.status.toLowerCase()}`} style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  textAlign: "center",
                  width: "fit-content",
                  backgroundColor: items.status === 'Pending' ? '#fffbeb' : items.status === 'Accepted' ? '#f0fff4' : '#fff5f5',
                  color: items.status === 'Pending' ? '#b45309' : items.status === 'Accepted' ? '#15803d' : '#b91c1c'
                }}>
                  {items.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>  
    </div>
  );
};

export default Bookings;
