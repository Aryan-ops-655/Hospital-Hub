import React, { useState } from 'react'
import { assets, bBankOrderList } from '../../assets/assets'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {BACKEND_URL} from '../../../constant.js'

const Order = () => {

  const [orderData, setOrderData]=useState({})


  const fecthOrderData = async (id) => {
    const response = await axios.post(`${BACKEND_URL}/api/bBank/find`,{"id":id})
    if(response.data.success){
      setOrderData(response.data.data)
      console.log(response.data.data)
    }
  }


  return (
    <div>
      <div className="header">
        <h1>Orders</h1>
        <Link to="/"><img src={assets.cross_icon} alt="" /></Link>
      </div>
      <div className="order-list-continer">
        {bBankOrderList.map((item,index)=>{
          
          return(
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
