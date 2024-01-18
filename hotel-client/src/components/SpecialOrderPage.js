import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const specialOrderPageStyles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif', // Add your preferred font-family
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#007bff', // Adjust the color
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textarea: {
    width: '100%',
    minHeight: '150px',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical', // Allow vertical resizing
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

function SpecialOrderPage() {
  const [request, setRequest] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const API_URL = 'http://localhost:5000/special-order'; // Replace with your server URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(API_URL, {
        user_id: 'current_user_id', // Replace with actual user ID
        request: request,
      });

      if (response.data.success) {
        history.push('/success'); // Redirect to a success page or another page
        // Display a success message if needed
      } else {
        setError('Failed to place special order.');
      }
    } catch (error) {
      console.error('Error placing special order:', error);
      setError('An error occurred while placing the order.');
    }
  };

  return (
    <div style={specialOrderPageStyles.container}>
      <h1 style={specialOrderPageStyles.heading}>Place a Special Order</h1>
      {error && <div style={specialOrderPageStyles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={specialOrderPageStyles.form}>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          style={specialOrderPageStyles.textarea}
          placeholder="Describe your special request"
        />
        <button
          type="submit"
          style={Object.assign(
            {},
            specialOrderPageStyles.button,
            specialOrderPageStyles.buttonHover
          )}
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default SpecialOrderPage;
