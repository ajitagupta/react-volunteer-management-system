import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     //const response = await fetch('http://localhost:5000/api/auth/register', {
      const response = await fetch('https://react-volunteer-management-system-backend.vercel.app/api/auth/register', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(window.location.origin);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <center><h2>Register</h2></center>
      <form onSubmit={handleSubmit}>
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="volunteer">Volunteer</option>
          <option value="organizer">Organizer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
