import React, { useState } from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/navbar'
import Menu from '../../Components/Menu/Menu'
import Filter from '../../Components/Filter/Filter'
import ItemDisplay from '../../Components/ItemDisplay/ItemDisplay'

const Home = () => {

  const [group, setGroup] = useState("All");
  const [component, setComponent] = useState("All");

  return (
    <div>
      <Navbar/>
      <Menu/>
      <Filter group={group} setGroup={setGroup} component={component} setComponent={setComponent} />
      <ItemDisplay group={group} component={component} />
    </div>
  )
}

export default Home
