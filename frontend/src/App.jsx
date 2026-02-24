import React, {useState, useEffect} from 'react';
import HomePage from './components/pages/HomePage.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/pages/LoginPage.jsx';
import RegisterPage from './components/pages/RegisterPage.jsx';
import {useAuthStore} from './stores/authStore.js';
import { ToastContainer } from "react-toastify";

const App = () => {
  const {authUser, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log('authUser: ',authUser);
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={authUser? <HomePage />: <LoginPage />} />
          <Route path='/login' element={authUser? <HomePage />: <LoginPage />} />
          <Route path='/register' element={authUser? <HomePage />: <RegisterPage />} />
        </Routes>
      <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App