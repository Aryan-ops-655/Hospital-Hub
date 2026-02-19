import React from 'react'
import SearchBox from '../../Components/SearchBox/SearchBox'
import Services from '../../Components/Services/Services'
import Bookings from '../../Components/myBookings/Bookings'


const Home = () => {
  return (
    <>
        <SearchBox/>
        <Services/>
        <Bookings/>
    </>
  )
}

export default Home
