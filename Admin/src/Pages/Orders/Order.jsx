import React, { useState } from 'react'
import { assets, bBankOrderList } from '../../assets/assets'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Order.css'
import { BACKEND_URL } from '../../../constant.js'

const Order = () => {



  


  return (
    <div>
      <div className="header">
        <h1>Orders</h1>
        <Link to="/"><img src={assets.cross_icon} alt="" /></Link>
      </div>
      <div className="order-list-continer">
        {bBankOrderList.map((item, index) => {

          return (
            <div key={index} className="order-card">
              <div className="order-details">
                
                <p>order units {item.order_units}</p>
                <p>{item.order_status}</p>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Order
