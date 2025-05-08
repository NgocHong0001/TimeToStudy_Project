//Entry point
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; //enable page routing
//import App from './App';
import './styles/App.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css' The cause of the website being set to the left.
import ReactDOM from 'react-dom/client';

import AOS from 'aos'; // AOS library for animations
import 'aos/dist/aos.css';

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);