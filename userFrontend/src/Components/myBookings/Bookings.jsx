import React from 'react'
import "./Bookings.css"
import { bookings_list } from '../../assets/assets'

const Bookings = () => {
  return (
    <div className='container'>
        <div className="header">
            <p>My Bookings</p>
        </div>
        <div className="bookedCards">
            {bookings_list.map((items,index)=>{
              return(
                <div key={index} className="booking-list-item">
                  <div className='items'>
                    <img src={items.image} alt="" />
                    <div className="text-content">
                      <p>Booking Type: {items.booking_type}</p>
                      <p>Hospital name: {items.hospital_name}</p>
                      <p>Date:  {items.date}</p>
                    </div>
                  </div>
                    <div className="details">
                      <p>{items.status}</p>
                      <button>View Details</button>
                    </div>
                </div>
              )
            })}
        </div>  
      
    </div>
  )
}

export default Bookings
