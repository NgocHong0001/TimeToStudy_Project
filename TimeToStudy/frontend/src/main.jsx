//Entry point
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; //enable page routing
//import App from './App';
import './styles/App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
