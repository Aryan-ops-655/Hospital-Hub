import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/navbar'
import Menu from '../../Components/Menu/Menu'
import Filter from '../../Components/Filter/Filter'
import ItemDisplay from '../../Components/ItemDisplay/ItemDisplay'
import UpdateForm from '../../Components/Updateform/UpdateForm'

const Home = () => {

  const [group, setGroup] = useState("All");
  const [component, setComponent] = useState("All");
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  return (
    <>
      {showUpdateForm?<UpdateForm setShowUpdateForm={setShowUpdateForm}/>:<></>}
      <div>
        <Navbar />
        <Menu />
        <Filter group={group} setGroup={setGroup} component={component} setComponent={setComponent} />
        <ItemDisplay group={group} component={component} setShowUpdateForm={setShowUpdateForm} />
      </div>
    </>
  )
}

export default Home
