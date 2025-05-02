import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Reg.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Fake validation — in real apps, you'd send this to a backend
    if (form.name && form.email && form.password) {
      alert('Account created!');
      navigate('/dashboard'); // Redirect after "registering"
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}