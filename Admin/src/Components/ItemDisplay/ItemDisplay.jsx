import React, { useContext, useEffect, useState } from 'react'
import './ItemDisplay.css'
import Item from '../Items/Items'
import { AdminContext } from '../../Context/adminContext';


const ItemDisplay = ({ find, setFind, group, component, setShowUpdateForm }) => {

  const { fetch_list, items_list } = useContext(AdminContext)
  


  // filter logic
  const filteredItems = items_list.filter(item =>
    (group === "All" || item.blood_group === group) &&
    (component === "All" || item.component === component)
  );


  


  useEffect(()=>{
    fetch_list();
  },[])

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
              setShowUpdateForm={setShowUpdateForm}
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