import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import Blood from './Pages/Blood/Blood.jsx'
import Beds from './Pages/Beds/Beds.jsx'
import Login from './Pages/Login/Login.jsx'
import Doctor from './Pages/Doctor/Doctor.jsx'
import Tests from './Pages/Tests/Tsets.jsx'
import Hospitals from './Pages/Hospitals/Hospitals.jsx'
import Ambulance from './Pages/Ambulance/Ambulance.jsx'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
      <Navbar/>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bloods' element={<Blood/>} />
        <Route path='/beds' element={<Beds/>} />
        <Route path='/oxygen' element={<Home/>} />
        <Route path='/hospitals' element={<Hospitals/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/docs' element={<Doctor/>} />
        <Route path='/tests' element={<Tests/>} />
        <Route path='/ambulance' element={<Ambulance/>} />
      </Routes>
    </>
  )
}

export default App
