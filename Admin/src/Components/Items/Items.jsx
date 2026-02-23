import React, { useEffect, useState } from 'react'
import './Items.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { BACKEND_URL } from '../../../constant'
import { toast } from 'react-toastify'

const Item = ({ id, component, units, expiry, group, status }) => {

  const [icon, setIcon] = useState(assets.blood_drop)

  const deleteBlood = async (id) => {
    const response = await axios.post(`${BACKEND_URL}/api/bBank/remove`, {"id":id})
    if (response.data.success) {
      toast.success("Deleted...")
    } else {
      toast.error("Error..!")
    }
  }

  const fecth_icon = () => {
    if (component === "Plasma") {
      setIcon(assets.plasma)
    } else if (component === "Platelets") {
      setIcon(assets.platelet)
    } else if (component === "Packed RBC") {
      setIcon(assets.medical)
    } else if (component === "Cryoprecipitate") {
      setIcon(assets.cryo)
    }
  }
  useEffect(() => {
    fecth_icon();
  }, [deleteBlood])

  return (
    <>
      <div className="items">
        <div className='component'><img src={icon} alt="" />{component}</div>
        <p>{group}</p>
        <p>{units}</p>
        <p>{expiry}</p>
        <p>{status}</p>
        <div className="btns">
          <button className="btn1">Edit</button>
          <button onClick={()=>deleteBlood(id)} className="btn2">Delete</button>
        </div>
      </div>
    </>
  )
}

export default Item
