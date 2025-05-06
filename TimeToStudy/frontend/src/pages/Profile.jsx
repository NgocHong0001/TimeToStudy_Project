import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the request headers
          },
        });
        const data = await response.json();
        console.log(data); // see success message from backend
        setUsername(data.username);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchUserProfile();
  }, []);

  let changePassword = async () => {
    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);
    try {
      const response = await fetch(`${apiUrl}/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the request headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      console.log(data); // see success message from backend
      if (response.ok) {
        alert('Password changed successfully!');
      } else {
        alert(data.message || 'Password change failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Full Name:</strong> {firstname}</p>
        <p><strong>Last Name:</strong> {lastname}</p>
        <p><strong>Email:</strong> {email}</p>
        
        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />  
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={handlePasswordChange}
          required
        /> 
        <input
          type="password"
          placeholder="Re-enter New Password"
          value={password}
          onChange={handlePasswordChange}
          required
        /> 
        <button onClick={changePassword}>Change Password</button>
    </div>
    </div>
  );
}