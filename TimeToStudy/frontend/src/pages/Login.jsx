import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);

    // Admin-only 
    if (isAdmin) {
      const allowedAdminUsername = 'admin';
      const allowedAdminPassword = 'pokemon';

      // If credentials match, login without backend
      if (username === allowedAdminUsername && password === allowedAdminPassword) {
        const mockToken = 'mock-admin-token'; // Mock token for admin
        localStorage.setItem('accessToken', mockToken);
        localStorage.setItem('isAdmin', 'true'); // Set isAdmin to true for admin

        navigate('/admin', { replace: true });
        return;
      } else {
        alert('Access denied. Invalid admin credentials.');
        return;
      }
    }

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ username, password, role: 'user' }),
      });

      const data = await response.json();
      console.log('🎟️ accessToken:', data.accessToken);
  
      if (response.ok) {
        //token is saved and sent to the backend.
        localStorage.setItem('accessToken', data.accessToken); // save token to local storage
        console.log('✅ Token saved, navigating...');
        localStorage.setItem('isAdmin', 'false'); // set isAdmin to false for regular users
        alert("You're logged in!");
        navigate('/dashboard', { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <img src="src/public/assets/login-person.png" alt="Logo" className="logoin" />
        <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button
          type="button"
          className="toggle-mode"
          onClick={() => setIsAdmin((prev) => !prev)}
        >
          Switch to {isAdmin ? 'User' : 'Admin'}
        </button>
      </form>
    </div>
  );
}

