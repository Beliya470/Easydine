import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [details, setDetails] = useState('');
  const [roomServiceItems, setRoomServiceItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch room service items and existing orders from the database
    fetchRoomServiceItems();
    fetchOrders();
  }, []);

  const fetchRoomServiceItems = async () => {
    try {
      const response = await axios.get('/room-service/items'); // Adjust the API endpoint
      setRoomServiceItems(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/room-service/orders'); // Adjust the API endpoint
      setOrders(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/room-service/order', { details }); // Adjust the API endpoint
      // Handle successful order placement
      fetchOrders(); // Refresh the list of orders after placing a new one
      setDetails('');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div style={roomServicePageStyles.container}>
      <h1 style={roomServicePageStyles.heading}>Room Service Order</h1>
      <form onSubmit={handleSubmit} style={roomServicePageStyles.form}>
        <div className="form-group">
          <label htmlFor="item_id">Select Room Service Item</label>
          <select
            style={roomServicePageStyles.select}
            id="item_id"
            name="item_id"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          >
            <option value="" disabled>
              Select an item...
            </option>
            {roomServiceItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name} - ${item.price}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="details">Additional Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            style={roomServicePageStyles.textarea}
            id="details"
            name="details"
            rows="4"
            placeholder="Order details"
          />
        </div>
        <button
          type="submit"
          style={Object.assign(
            {},
            roomServicePageStyles.button,
            roomServicePageStyles.buttonHover
          )}
          className="btn btn-primary"
        >
          Place Order
        </button>
      </form>

      {/* Display My Orders */}
      <div style={roomServicePageStyles.ordersContainer}>
        <h2>My Orders</h2>
        {orders.map((order, index) => (
          <div key={index} style={roomServicePageStyles.orderItem}>
            {order.details}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomServicePage;
