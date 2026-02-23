import React, { useEffect, useState } from 'react'
import './ItemDisplay.css'
import Item from '../Items/Items'
import { BACKEND_URL } from "../../../constant";
import axios from 'axios';


const ItemDisplay = ({ group, component }) => {


  const [items_list, setitem_list] = useState([]);


  // filter logic
  const filteredItems = items_list.filter(item =>
    (group === "All" || item.blood_group === group) &&
    (component === "All" || item.component === component)
  );


  const fetch_list = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/bBank/blood`);
    if(response.data.success){
      setitem_list(response.data.data)
    }else{
      alert(error);
    }
  };


  useEffect(()=>{
    fetch_list();
  },[filteredItems])

  return (
    <div className='container'>
      
   
      <div className="heading">
        <p>Component</p>
        <p>Blood-group</p>
        <p>Available Units</p>
        <p>Expiry-date</p>
        <p>Status</p>
      </div>

      
      <div className="item_display">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Item
              key={item._id}
              id={item._id}
              component={item.component}
              group={item.blood_group}
              expiry={new Date(item.expiry_date).toLocaleDateString("en-GB")}
              units={item.units}
              status={item.stock_status}
            />
          ))
        ) : (
          <p className="no-data">No items found</p>
        )}
      </div>

    </div>
  )
}

export default ItemDisplay