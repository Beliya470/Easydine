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
    fontSize: '1.5rem',
    fontFamily: '"Brush Script MT", cursive',  // Add your preferred font-family
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#007bff', // Adjust the color
    fontFamily: '"Brush Script MT", cursive', // Sets a cursive, more elegant font-family
    fontSize: '2.5rem', // Increases font size for better readability
    // color: '#5D4037', // Sets a deep, rich color for the text
    marginLeft: '15px', // Adds spacing between the image and the text
    display: 'inline-block', // Ensures the text is inline with the image
    verticalAlign: 'middle', // Aligns text vertically with the image
  },
  image: {
    width: '200px',     // Sets a fixed width for the images
    height: '150px',    // Sets a fixed height for the images
    objectFit: 'cover', // Ensures the image covers the area, maintaining aspect ratio
    padding: '5px',     // Adds padding around the image
    border: '1px solid #ddd', // Adds a border around the image
    borderRadius: '10px', // Rounds the corners of the border
    background: '#f8f8f8', // Sets a light grey background color
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Adds a subtle shadow effect
  },

  itemName: {
    fontFamily: '"Brush Script MT", cursive', // Sets a cursive, more elegant font-family
    fontSize: '1.2rem', // Adjusts font size for better readability
    color: '#5D4037', // Sets a deep, rich color for the text
    marginLeft: '15px', // Adds spacing between the image and the text
    display: 'block', // Ensures the text is displayed as a block to align correctly
    verticalAlign: 'middle', // Aligns text vertically with the image
    textAlign: 'left', // Aligns text to the left
  },

  orderItem: {
    display: 'flex', // Uses flexbox for alignment
    alignItems: 'left', // Aligns items vertically in the center
    justifyContent: 'flex-start', // Aligns content to the start (left)
    marginBottom: '10px', // Adds space below each order item
    // ... existing styles
  },
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
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
    display: 'flex', // Uses flexbox for alignment
    alignItems: 'left', // Aligns items vertically in the center
    justifyContent: 'flex-start', // Aligns content to the start (left)
    marginBottom: '10px', // Adds space below each order item
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
      const response = await axios.get(`${API_URL}/room-service/items`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
        }
      });
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
    const userId = sessionStorage.getItem('user_id');
    if (!userId) {
        alert('Please log in to place an order.');
        return;
    }
    try {
        await axios.post(`${API_URL}/room-service/order`, 
          { items: orderedItems }, 
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
            }
          }
        );
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
          {/* <img src={`${API_URL}/${item.image_url}`} alt={item.name} /> */}
          <img src={`${API_URL}/${item.image_url}`} alt={item.name} style={roomServicePageStyles.image} />

          {/* <img src={`${API_URL}/${room.image_url.split('static/').pop()}`} alt={room.category} className="room-image" /> */}

          {/* <img src={`${API_URL}/${item.image_url.split('static/').pop()}`} alt={item.name} /> */}
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
