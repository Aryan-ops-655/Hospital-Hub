import React from 'react'
import './Items.css'
import { items, Stock } from '../../assets/assets'

const Item = () => {
  return (
    <div className='container'>
        <div className="header">
        <p>Component</p>
        <p>Blood-group</p>
        <p>Available Units</p>
        <p>Expiry-date</p>
        <p>Satus</p>
        <p></p>
        </div>
        <div className="itmdetails">
          {items.map((Item,index)=>{
            return(
              <div key={index} className="item">
                <div className="image">
                  <img src={Item.image} alt="" />
                  <p>{Item.name}</p>
                </div>
                <p>{Item.bloodGroup}</p>
                <p>{Item.units}</p>
                <p>{Item.expiry}</p>
                <p>{Item.status}</p>
                <div className="btns">
                  <button className="btn1">Edit</button>
                  <button className="btn2">Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      
    </div>
  )
}

export default Item
