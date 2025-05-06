import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RegisterForm from './pages/Register';
import './styles/App.css';
//This is router for the app, it will be used to navigate between pages
//import { useState } from 'react'
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import LogOut from './pages/LogOut';
import Layout2 from './Layout2';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Planner from './pages/Planner';
import Schedule from './pages/Schedule';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';



function RouterWrapper() {
  return (
    <Routes>
      {/* Public layout, Home default route */}
      <Route path="/" element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="school_sch" element={<School_sch />} /> {/* Changed every function with the same name and import */}
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<LogOut />} />
        

      </Route>
    

      {/* Logged-in layout used for multiple separate paths */}
      <Route element={<Layout2 />}>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
            } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
            </ProtectedRoute>
          } />
        <Route path="/planner" element={
          <ProtectedRoute>
            <Planner />
            </ProtectedRoute>
            } />
        <Route path="/schedule" element={
          <ProtectedRoute>
          <Schedule  />
          </ProtectedRoute>
          } />
        <Route path="/admin" element={
          <ProtectedRoute>
          <Admin  />
          </ProtectedRoute>
          } />
      </Route>
    </Routes>
  );
}

export default RouterWrapper;

function School_sch() {
}
