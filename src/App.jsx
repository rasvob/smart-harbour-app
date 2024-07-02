import { useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import MenuBar from './Components/MenuBar'
import Home from './Components/Pages/Home'
import StateDetails from './Components/Pages/StateDetails'
import PaymentsDetails from './Components/Pages/PaymentsDetails'
import { LoginPage } from './Components/Pages/Login'
import Footer from './Components/Footer'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { useAuthStore } from './Data/AuthStore'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const removeToken = useAuthStore((state) => state.removeToken);
  const removeCurrentUser = useAuthStore((state) => state.removeCurrentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeCurrentUser();
    navigate('/login');
    toast.success('Odhlášení proběhlo úspěšně');
  };

  return (
    <>
      <Toaster />
      <MenuBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={ <ProtectedRoute element={<Home />} />} />
          <Route path="/state-details" element={ <ProtectedRoute element={<StateDetails />} />}/>
          <Route path="/payments" element={ <ProtectedRoute element={<PaymentsDetails />} />} />
       </Routes>
       <Footer />
    </>
  )
}

export default App
