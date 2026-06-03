import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import Blood from './Pages/Blood/Blood.jsx'
import Beds from './Pages/Beds/Beds.jsx'
import Login from './Pages/Login/Login.jsx'

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
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
