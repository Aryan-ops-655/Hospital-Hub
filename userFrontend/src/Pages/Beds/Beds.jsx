import React,{ useEffect } from 'react'
import { useLocation } from '../../Components/Location/Location.js'
import Searchitem from '../../Components/Searchitem/Searchitem.jsx';

const Beds = () => {

    const { location, loading, error, getLocation } = useLocation();
    
    useEffect(() => {
        getLocation();
    }, []);



  return (
    <div>
        <div className="header">
            <p>Searching Hospitals for: <span>{loading ? "Detecting location..." : location || error}</span>.</p>
        </div>
        <hr></hr>
        <Searchitem/>
      
    </div>
  )
}

export default Beds
