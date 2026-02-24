import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Add from './Pages/Add/Add.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Order from './Pages/Orders/Order.jsx';

const App = () => {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<Add/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
    </>
  )
}

export default App
