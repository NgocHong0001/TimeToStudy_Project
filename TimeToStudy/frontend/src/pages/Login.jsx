import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // simulate login check (replace with real logic)
    if (email && password) {
      // On success, redirect to dashboard
      navigate('/dashboard', { replace: true });
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <img src="src/assets/login-person.png" alt="Logo" className="logo" />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}