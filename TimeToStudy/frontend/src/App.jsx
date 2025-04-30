//import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'; //enable page routing
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}