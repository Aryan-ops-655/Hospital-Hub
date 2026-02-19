import React from 'react'
import './Menu.css'
import { Stock } from '../../assets/assets.js'

const Menu = () => {
  return (
    <div className='menu'>
        <div className="conatiner">
            {Stock.map((Item, index)=>{
                return(
                    <div key={index} style={{backgroundColor: Item.colo}} className="card">
                        <div className="image">
                            <img src={Item.image} alt="" />
                        </div>
                        <div className="details">
                            <p className="name">{Item.name}</p>
                            <p className="units"><span style={{color :Item.col , borderColor:Item.col}} >{Item.units}</span> Units</p>
                        </div>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default Menu
