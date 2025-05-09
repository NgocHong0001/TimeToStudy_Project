import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const[newPassword, setNewPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);
    console.log("changePassword function called");
    console.log("currentPassword:", currentPassword);
    console.log("newPassword:", newPassword);
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

  let handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  let changePassword = async () => {
    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);
    if (newPassword !== confirmPassword) {
      alert("The new passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      alert("The new password must be at least 6 characters long.");
      return;
    }
    if (currentPassword === newPassword) {
      alert("The new password must be different from the current password.");
      return;
    }    
    try {
      const response = await fetch(`${apiUrl}/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the request headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
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

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Full Name:</strong> {firstname}</p>
        <p><strong>Last Name:</strong> {lastname}</p>
        <p><strong>Email:</strong> {email}</p>
        
        <p>Password</p>
        <form onSubmit={changePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={handlePasswordChange}
          name="currentPassword"
          required
        />  
        <p>New Password</p>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handlePasswordChange}
          name="newPassword"
          required
        /> 
        <p>Re-enter New Password</p>
        <input
          type="password"
          placeholder="Re-enter New Password"
          value={confirmPassword}
          onChange={handlePasswordChange}
          name="confirmPassword"
          required
        /> 
        <button type="submit">Change Password</button>
        </form>
    </div>
    </div>
  );
}