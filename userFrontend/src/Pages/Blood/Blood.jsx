import React from 'react'
import "./Blood.css"
import { blood_groups } from '../../assets/assets'
import Searchitem from '../../Components/Searchitem/Searchitem.jsx'

const Blood = () => {
  return (
    <div className='container'>
        <div className="header">
            <p>Connecting Lives Through <span>Blood</span>.</p>
        </div>
        <hr></hr>
        <div className="blood-selector">
            <p>Blood Groups</p>
            <div className="menu">
                {blood_groups.map((item,index)=>{
                    return(
                        <div key={index} className="group">
                            {item.group}
                        </div>
                    )
                })}
            </div>
        </div>
        <hr></hr>
        <Searchitem/>
    </div>
  )
}

export default Blood
