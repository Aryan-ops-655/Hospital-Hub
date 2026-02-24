import React, { useEffect, useState } from 'react'
import './Menu.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios';
import { BACKEND_URL } from '../../../constant.js';

const Menu = () => {

    const [wbno, setwbno] = useState(0)
    const [plno, setplno] = useState(0)
    const [cyno, setcyno] = useState(0)
    const [pno, setpno] = useState(0)

    const fetch_totalUnits = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/bBank/totalUnits`);
        if (response.data.success) {
            for (let i in response.data.data[0]) {
                if (i === "Whole Blood") {
                    setwbno(response.data.data[0][i])
                }else if (i === "Plasma") {
                    setplno(response.data.data[0][i])
                }else if (i === "Platelets") {
                    setpno(response.data.data[0][i])
                }else if (i === "Cryoprecipitate") {
                    setcyno(response.data.data[0][i])
                }
            }
        } else {
            alert(error);
        }
    };

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
