import React from 'react'
import "./Searchitem.css"
import { assets, hospital_list } from '../../assets/assets'

const Searchitem = () => {

    const location = "Main road, Ranchi"

  return (
    <>
    <div className="container">
      {hospital_list.map((item,index)=>{
        return(
          <div key={index} className="hos-card">
            <div className="hospital-details">
              <div className="image">
                <img src={item.image} alt="" />
              </div>
              <div className="details">
                <p className="name">{item.name}</p>
                <p>{item.location}</p>
                <p>distance...</p>
              </div>
            </div>
            <div className="service-available">
              <div className="bed btn">{item.bed}<p>.BED</p></div>
              <div className="blood btn">BLOOD</div>
              <div className="ogn btn">O</div>
              <div className="view btn">View</div>
            </div>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Searchitem
