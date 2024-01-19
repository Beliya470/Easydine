import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Define API_URL
const API_URL = 'http://localhost:5000';

const roomServicePageStyles = {
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
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
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
  ordersContainer: {
    marginTop: '40px',
  },
  orderItem: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

function RoomServicePage() {
  const [roomServiceItems, setRoomServiceItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    fetchRoomServiceItems();
  }, []);

  const fetchRoomServiceItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/room-service/items`);

      // const response = await axios.get('${API_URL}/room-service/items'); // Ensure this matches your API endpoint
      setRoomServiceItems(response.data);
    } catch (error) {
      console.error('Error fetching room service items:', error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems({
      ...selectedItems,
      [itemId]: !selectedItems[itemId]
    });
  };

  const handleSubmit = async () => {
    const orderedItems = roomServiceItems.filter(item => selectedItems[item.id]);
    const userId = sessionStorage.getItem('user_id'); // Retrieve user_id from session storage
    if (!userId) {
        alert('Please log in to place an order.');
        return;
    }
    try {
        await axios.post(`${API_URL}/room-service/order`, { user_id: userId, items: orderedItems }, { withCredentials: true });
        alert('Order placed successfully!');
        setSelectedItems({});
    } catch (error) {
        console.error('Error placing order:', error);
    }
};


  return (
    <div style={roomServicePageStyles.container}>
      <h1 style={roomServicePageStyles.heading}>Room Service Menu</h1>
      {roomServiceItems.map((item) => (
        <div key={item.id} style={roomServicePageStyles.orderItem}>
          <input
            type="checkbox"
            style={roomServicePageStyles.checkBox}
            checked={!!selectedItems[item.id]}
            onChange={() => handleCheckboxChange(item.id)}
          />
          {item.name} - ${item.price}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={Object.assign(
          {},
          roomServicePageStyles.button,
          roomServicePageStyles.buttonHover
        )}
      >
        Place Order
      </button>
    </div>
  );
}

export default RoomServicePage;
