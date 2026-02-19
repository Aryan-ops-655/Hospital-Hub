import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import Blood from './Pages/Blood/Blood.jsx'
import Beds from './Pages/Beds/Beds.jsx'

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bloods' element={<Blood/>} />
        <Route path='/beds' element={<Beds/>} />
        <Route path='/oxygen' element={<Beds/>} />
        <Route path='/hospitals' element={<Beds/>} />
      </Routes>
    </>
  )
}

export default App
