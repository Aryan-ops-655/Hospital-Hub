import React, { useContext, useState } from 'react';
import "./Searchitem.css";
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Searchitem = () => {
  const { searchResults, loading, user, createBooking } = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    patientName: '',
    patientContact: '',
    bookingUnits: 1,
    bookingDate: new Date().toISOString().split('T')[0]
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const navigate = useNavigate();

  const handleOpenBooking = (item) => {
    if (!user) {
      alert("Please login first to book an appointment!");
      navigate('/login');
      return;
    }
    setSelectedItem(item);
    setBookingFormData({
      patientName: user.name || '',
      patientContact: user.contact || '',
      bookingUnits: 1,
      bookingDate: new Date().toISOString().split('T')[0]
    });
    setErrorMsg('');
    setSuccessMsg('');
    setShowModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!bookingFormData.patientName || !bookingFormData.patientContact) {
      setErrorMsg("Please complete all details");
      return;
    }

    // Pack booking details dynamically matching serviceType schema
    let requestDetails = {};
    if (selectedItem.serviceType === "bed") {
      requestDetails = {
        bedType: selectedItem.type,
        requestedUnits: Number(bookingFormData.bookingUnits),
        bookingDate: bookingFormData.bookingDate
      };
    } else if (selectedItem.serviceType === "Blood") {
      requestDetails = {
        bloodGroup: selectedItem.details["Blood Group"],
        component: selectedItem.details["Component"],
        requestedUnits: Number(bookingFormData.bookingUnits),
        bookingDate: bookingFormData.bookingDate
      };
    } else if (selectedItem.serviceType === "Ambulance") {
      requestDetails = {
        ambulanceType: selectedItem.type,
        vehicleNumber: selectedItem.details["Vehicle Number"],
        bookingDate: bookingFormData.bookingDate
      };
    } else if (selectedItem.serviceType === "Test") {
      requestDetails = {
        testName: selectedItem.type,
        bookingDate: bookingFormData.bookingDate
      };
    }

    const res = await createBooking(
      selectedItem.hospital.id,
      selectedItem.serviceType,
      requestDetails
    );

    if (res.success) {
      setSuccessMsg(res.message || "Appointment request submitted!");
      setTimeout(() => {
        setShowModal(false);
        setSelectedItem(null);
      }, 1800);
    } else {
      setErrorMsg(res.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="search-results-container" style={{ textAlign: "center", padding: "60px 20px" }}>
        <p style={{ fontWeight: 600, color: "#4a5568", fontSize: "16px" }}>Searching nearest hospitals & services...</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="results-grid">
        {searchResults.length === 0 ? (
          <div className="no-results">
            <h3>No services found</h3>
            <p>Try searching for a different service keyword or city near your location.</p>
          </div>
        ) : (
          searchResults.map((item) => (
            <div key={item.id} className="search-item-card">
              <div className="card-header">
                <span className={`service-badge ${item.serviceType.toLowerCase()}`}>
                  {item.serviceType}
                </span>
                <span className="distance-tag">
                  {item.distance === 0 ? "Current Location" : `${item.distance.toFixed(1)} km away`}
                </span>
              </div>

              <div className="card-body">
                <h4 className="service-title">{item.type}</h4>
                
                <div className="details-list">
                  {Object.entries(item.details).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>

                <div className="hospital-details">
                  <h5 className="hospital-name">{item.hospital.name}</h5>
                  <p className="hospital-info">📍 {item.hospital.address}</p>
                  <p className="hospital-info">📞 {item.hospital.contact}</p>
                </div>
              </div>

              <div className="card-footer">
                <button className="book-btn" onClick={() => handleOpenBooking(item)}>
                  Book {item.serviceType} Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Book Appointment</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleBookingSubmit}>
                {errorMsg && <p className="status-message error">{errorMsg}</p>}
                {successMsg && <p className="status-message success">{successMsg}</p>}

                <div className="form-group">
                  <label>Service Selected</label>
                  <input type="text" value={`${selectedItem.serviceType} - ${selectedItem.type}`} disabled style={{ background: "#edf2f7", color: "#4a5568" }} />
                </div>

                <div className="form-group">
                  <label>Hospital</label>
                  <input type="text" value={selectedItem.hospital.name} disabled style={{ background: "#edf2f7", color: "#4a5568" }} />
                </div>

                <div className="form-group">
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    value={bookingFormData.patientName} 
                    onChange={(e) => setBookingFormData({ ...bookingFormData, patientName: e.target.value })} 
                    placeholder="Enter patient full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input 
                    type="text" 
                    value={bookingFormData.patientContact} 
                    onChange={(e) => setBookingFormData({ ...bookingFormData, patientContact: e.target.value })} 
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                {(selectedItem.serviceType === "Bed" || selectedItem.serviceType === "Blood") && (
                  <div className="form-group">
                    <label>Units / Quantity</label>
                    <input 
                      type="number" 
                      min="1"
                      value={bookingFormData.bookingUnits} 
                      onChange={(e) => setBookingFormData({ ...bookingFormData, bookingUnits: e.target.value })} 
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Preferred Booking Date</label>
                  <input 
                    type="date" 
                    value={bookingFormData.bookingDate} 
                    onChange={(e) => setBookingFormData({ ...bookingFormData, bookingDate: e.target.value })} 
                    required
                  />
                </div>

                <button type="submit" className="submit-booking-btn">Confirm Appointment Booking</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchitem;
