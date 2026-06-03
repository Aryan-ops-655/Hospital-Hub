import React, { useEffect, useContext } from 'react'
import SearchBox from '../../Components/SearchBox/SearchBox'
import Services from '../../Components/Services/Services'
import Bookings from '../../Components/myBookings/Bookings'
import { UserContext } from '../../Context/UserContext'


const Home = () => {
  const { setSearchType } = useContext(UserContext);

  useEffect(() => {
    setSearchType("all");
  }, []);

  return (
    <>
        <SearchBox/>
        <Services/>
        <Bookings/>
    </>
  )
}

export default Home
