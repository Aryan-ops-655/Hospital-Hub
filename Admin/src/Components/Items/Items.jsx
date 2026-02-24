import React, { useEffect, useState } from 'react'
import './Items.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { BACKEND_URL } from '../../../constant'
import { toast } from 'react-toastify'

const Item = ({ id, component, units, expiry, group, status }) => {

  const [icon, setIcon] = useState(assets.blood_drop)
  const [statusColor, setStatusColor] = useState("green");

  const deleteBlood = async (id) => {
    const response = await axios.post(`${BACKEND_URL}/api/bBank/remove`, {"id":id})
    if (response.data.success) {
      toast.success("Deleted...")
      setTimeout(()=>{window.location.reload();},1500)
    } else {
      toast.error("Error..!")
    }
  }

  

  //status color setter function
  const fetchStatus_Color = () => {
    if (status === "Expired") {
      setStatusColor("rgb(251, 36, 36)")
    } else if (status === "Low Stock") {
      setStatusColor("rgb(246, 162, 35)")
    } else if (status === "Frozen") {
      setStatusColor("blue")
    } else if (status === "Expiring Soon") {
      setStatusColor("rgb(248, 113, 2)")
    }
  }
   

  //icon seter function and counter
  const fecth_icon = () => {
    if (component === "Plasma") {
      setIcon(assets.plasma);
    } else if (component === "Platelets") {
      setIcon(assets.platelet)
    } else if (component === "Packed RBC") {
      setIcon(assets.medical)
    } else if (component === "Cryoprecipitate") {
      setIcon(assets.cryo)
    }else if (component === "Whole Blood") {
      setIcon(assets.blood_drop);
    }
  }

  useEffect(() => {
    fecth_icon();
    fetchStatus_Color();
  },[deleteBlood])

  return (
    <>
      <div className="items">
        <div className='component'><img src={icon} alt="" />{component}</div>
        <p>{group}</p>
        <p>{units} units</p>
        <p>{expiry}</p>
        <p className='status' style={{color:(statusColor)}}>{status}</p>
        <div className="btns">
          <button className="btn1">Edit</button>
          <button onClick={()=>deleteBlood(id)} className="btn2">Delete</button>
        </div>
      </div>
    </>
  )
}

export default Item
