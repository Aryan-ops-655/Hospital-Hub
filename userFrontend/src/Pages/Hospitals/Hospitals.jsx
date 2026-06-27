import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import Searchitem from '../../Components/Searchitem/Searchitem.jsx';

const Hospitals = () => {
  const { locationName, loading, setSearchType, performSearch, searchQuery } = useContext(UserContext);
  
  useEffect(() => {
    setSearchType("hospital");
  }, []);

  return (
    <div>
        <div className="header">
            <p>Searching Beds for: <span>{loading ? "Detecting location..." : locationName}</span>.</p>
        </div>
        <hr></hr>
        <Searchitem/>
    </div>
  );
};

export default Hospitals;
