import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import authorizedFetch from '../utils/authFetch';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

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
        const response = await authorizedFetch(`${apiUrl}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include the token in the request headers
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

  let changePassword = async (e) => {
    e.preventDefault(); //Web reader plz don't do default action of the form. Let me handle it.
    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);   

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length <= 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }

    if (currentPassword === newPassword) {
      alert("New password cannot be the same as the current password.");
      return;
    }

    if (currentPassword === '') {
      alert("Current password cannot be empty.");
      return;
    }

    if (newPassword === '') {
      alert("New password cannot be empty.");
      return;
    }

    if (confirmPassword === '') {
      alert("Confirm password cannot be empty.");
      return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passwordPattern.test(newPassword)) {
      alert("Password must be at least 6 characters long and contain at least one letter, one number, and one special character.");
      return;
}

    try {
      const response = await authorizedFetch(`${apiUrl}/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include the token in the request headers
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ currentPassword, newPassword }),

      });
      const data = await response.json();
      console.log(data); // see success message from backend
      if (response.ok) {
        alert('Password changed successfully!');
         // empty the password fields
         setCurrentPassword('');
         setNewPassword('');
         setConfirmPassword('');
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
        

        <p>Change Password</p>
        <form onSubmit={changePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={handlePasswordChange}
          name="currentPassword"
          required
        />  
       
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handlePasswordChange}
          name="newPassword"
          required
        /> 
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