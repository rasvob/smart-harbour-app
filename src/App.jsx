import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MenuBar from './Components/MenuBar'
import Home from './Components/Pages/Home'
import StateDetails from './Components/Pages/StateDetails'
import PaymentsTable from './Components/Pages/PaymentsTable'

function App() {

  return (
    <>
      <Toaster />
      <MenuBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/state-details" element={<StateDetails />} />
          <Route path="/payments" element={<PaymentsTable />} />
       </Routes>
    </>
  )
}

export default App
