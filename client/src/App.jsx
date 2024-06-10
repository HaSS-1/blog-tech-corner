import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivatRoute from './components/PrivatRoute'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/'element={<Home />} />
      <Route path='/About' element= {<About />} />
      <Route path='/Projects' element={<Projects />} />
      <Route path='/Signin' element={<SignIn />} />
      <Route path='/Signup' element={<SignUp />} />
      <Route element={<PrivatRoute />} >
        <Route path='/Dashboard' element={<Dashboard />} />
      </Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
  
  )
}
