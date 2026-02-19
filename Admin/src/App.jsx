import React from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Add from './Pages/Add/Add.jsx'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<Add/>}/>
      </Routes>
    </>
  )
}

export default App
