import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import Searchitem from '../../Components/Searchitem/Searchitem.jsx';

const Beds = () => {
  const { locationName, loading, setSearchType, performSearch, searchQuery } = useContext(UserContext);
  
  useEffect(() => {
    setSearchType("bed");
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

export default Beds;
