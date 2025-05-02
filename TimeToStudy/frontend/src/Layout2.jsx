//Page to navigate further into the app after login
// when add new route DO update the link below!
import { Outlet, Link } from 'react-router-dom';
import './styles/App2.css';
import './styles/App.css'; 

export default function Layout2() {
  return (
    <div className="layout2">
      <nav className="left-side-navbar">
        <ul>
          <Link to="/profile" className="sidebar-link">
          <img src="src/assets/person.png" alt="Profile" className="nav-icon" /><span>Profile</span></Link>

          <li><Link to="/dashboard" className="sidebar-link"><img src="src/assets/overview.png" alt="Overview" className="nav-icon" /><span>Overview</span></Link></li>

          <li><Link to="/planner" className="sidebar-link"><img src="src/assets/planner.png" alt="Planner" className="nav-icon" /><span>Planner</span></Link></li>

          <li><Link to="/schedule" className="sidebar-link"><img src="src/assets/schedule.png" alt="Scedule" className="nav-icon" /><span>Schedule</span></Link></li>

          <li><Link to="/dashboard" className="sidebar-link"><img src="src/assets/bx_log-out.png" alt="Log-out" className="nav-icon" /><span>Log out</span></Link></li>

          <li><Link to="/dashboard" className="sidebar-link"><img src="src/assets/help.png" alt="Help" className="nav-icon" /><span>Help</span></Link></li>
        </ul>
      </nav>

      <main className="content2">
      <h1>This is Layout2 working!</h1>
        <Outlet />
      </main>

      <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Time2Study. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}