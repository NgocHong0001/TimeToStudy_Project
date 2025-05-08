//Hero Page to navigate further into the app
import { Link, Outlet } from 'react-router-dom';
import './styles/App.css';
import { useState } from 'react';


export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div>
      <div className="layout">
        <header className="header">
        <div className="title">
          <img src="src/assets/logo (1).png" alt="Logo" className="logo" />
          <h1>Time2Study</h1>
        </div>
        </header>

        <nav className="right-side-navbar">
          <div className="toggle-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className="navbar-links">
            <li><Link to="/"><img src="src/assets/home.png" alt="log-in"></img><span>Home</span></Link></li>
            <li><Link to="/about"><img src="src/assets/about-us.png" alt="about us"></img><span>About Us</span></Link></li>
          </ul>
        </nav>

        <section className="main-layout">
          <main className="content">
            <Outlet />
          </main>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Time2Study. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* slide out menu*/} 
      <div id="menu-slideout" className={menuOpen ? 'open' : ''}>
        <ul className="menu-links">
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
        </ul>
      </div>
    </div>
  );
}