import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Add from './Pages/Add/Add.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<Add/>}/>
      </Routes>
    </>
  )
}

export default App
