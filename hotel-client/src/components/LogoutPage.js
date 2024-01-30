import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#ff6b6b',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
};

function LogoutPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the backend's /logout endpoint to log the user out
      await axios.get(`${API_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`,
        },
      });

      // Clear the session storage and redirect to the login page
      sessionStorage.removeItem('jwt_token');
      sessionStorage.removeItem('user_id');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error);
      // Handle logout error, if any
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>Logout</h1>
        <p>Are you sure you want to logout?</p>
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutPage;
