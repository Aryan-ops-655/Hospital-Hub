import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Order = () => {
  return (
    <div>
      <div className="header">
        <h1>Orders</h1>
        <Link to="/"><img src={assets.cross_icon} alt="" /></Link>
      </div>

    </div>
  )
}

export default Order
