//This is router for the app, it will be used to navigate between pages
//import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'; //enable page routing
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/register';

import Layout2 from './Layout2';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';


export default function App() {
  return (
    <Routes>
      {/* Public layout, Home default route */}
      <Route path="/" element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Logged-in layout used for multiple separate paths */}
      <Route element={<Layout2 />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}