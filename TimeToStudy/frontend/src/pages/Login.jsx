import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data); // see success message from backend
      if (response.ok) {
      localStorage.setItem('token', data.token); // save token to local storage
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
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="src/assets/login-person.png" alt="Logo" className="logo" />
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
      </form>
    </div>
  );
}

