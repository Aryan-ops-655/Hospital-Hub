import React, { useEffect, useContext } from 'react';
import "./Blood.css";
import { blood_groups } from '../../assets/assets';
import Searchitem from '../../Components/Searchitem/Searchitem.jsx';
import { UserContext } from '../../Context/UserContext';

const Blood = () => {
  const { setSearchType, setSearchQuery, searchQuery, performSearch } = useContext(UserContext);

  useEffect(() => {
    setSearchType("blood");
  }, []);

  const handleGroupClick = (group) => {
    const newQuery = group === searchQuery ? "" : group;
    setSearchQuery(newQuery);
    performSearch(newQuery, "blood");
  };

  return (
    <div className='container'>
        <div className="header">
            <p>Connecting Lives Through <span>Blood</span>.</p>
        </div>
        <hr></hr>
        <div className="blood-selector">
            <p>Blood Groups</p>
            <div className="menu">
                {blood_groups.map((item, index) => {
                    const isActive = searchQuery === item.group;
                    return (
                        <div 
                          key={index} 
                          className={`group ${isActive ? 'active' : ''}`}
                          onClick={() => handleGroupClick(item.group)}
                          style={{
                              padding: "10px 20px",
                              border: isActive ? "2px solid #e53e3e" : "1px solid #cbd5e0",
                              borderRadius: "20px",
                              cursor: "pointer",
                              backgroundColor: isActive ? "#fed7d7" : "white",
                              color: isActive ? "#c53030" : "#4a5568",
                              fontWeight: "600",
                              transition: "all 0.2s"
                          }}
                        >
                            {item.group}
                        </div>
                    );
                })}
            </div>
        </div>
        <hr></hr>
        <Searchitem/>
    </div>
  );
};

export default Blood;
