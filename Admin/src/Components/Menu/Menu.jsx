import React, { useContext, useEffect, useState } from 'react'
import './Menu.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios';
import { BACKEND_URL } from '../../../constant.js';
import { AdminContext } from '../../Context/adminContext.jsx';

const Menu = () => {

    const {fetch_totalUnits, wbno, pno, cyno, plno} = useContext(AdminContext)

    

    useEffect(() => {
        fetch_totalUnits();
    }, [])

    return (
        <div className='menu'>
            <div className="conatiner">
                <div className="card wb">
                    <div className="image">
                        <img src={assets.blood_drop} alt="" />
                    </div>
                    <div className="details">
                        <p className="name">Whole  Blood</p>
                        <p className="units"><span>{wbno}</span> Units</p>
                    </div>
                </div>
                <div className="card pl">
                    <div className="image">
                        <img src={assets.platelet} alt="" />
                    </div>
                    <div className="details">
                        <p className="name">Platelets</p>
                        <p className="units"><span>{pno}</span> Units</p>
                    </div>
                </div>
                <div className="card p">
                    <div className="image">
                        <img src={assets.plasma} alt="" />
                    </div>
                    <div className="details">
                        <p className="name">Plasma</p>
                        <p className="units"><span>{plno}</span> Units</p>
                    </div>
                </div>
                <div className="card cy">
                    <div className="image">
                        <img src={assets.cryo} alt="" />
                    </div>
                    <div className="details">
                        <p className="name">Cryo</p>
                        <p className="units"><span>{cyno}</span> Units</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Menu
