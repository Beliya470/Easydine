import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admindashboard.css'; 
function OrderManagement() {
  const [rooms, setRooms] = useState([]);
  const [roomServiceItems, setRoomServiceItems] = useState([]);
  const [newRoom, setNewRoom] = useState({ category: '', size: '', occupancy: '', bed_type: '', style: '', image_url: '', price: '' });
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image_url: '' });

  const API_URL = 'http://localhost:5000'; // Backend API URL
  const token = sessionStorage.getItem('jwt_token'); // JWT token from session storage
  

  useEffect(() => {
    fetchRooms();
    fetchRoomServiceItems();
  }, []);

  const handleRoomChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };
  
  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/booking`, { headers: { Authorization: `Bearer ${token}` } });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchRoomServiceItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/room-service/items`);
    //   const response = await axios.get(`${API_URL}/room-service-items`, { headers: { Authorization: `Bearer ${token}` } });
      setRoomServiceItems(response.data);
    } catch (error) {
      console.error('Error fetching room service items:', error);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/booking`, newRoom, { headers: { Authorization: `Bearer ${token}` } });
      fetchRooms();
      setNewRoom({ category: '', size: '', occupancy: '', bed_type: '', style: '', image_url: '', price: '' });
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending new item:', newItem);  // Log the data being sent
      const response = await axios.post(`${API_URL}/room-service/items`, newItem);
      console.log('Response:', response);  // Log the response

      fetchRoomServiceItems();
      setNewItem({ name: '', description: '', price: '', image_url: '' });
    } catch (error) {
      console.error('Error adding item:', error.response || error);  // Log detailed error
    }
};



//   const handleDeleteRoom = async (roomId) => {
//     try {
//       await axios.delete(`${API_URL}/booking/${roomId}`);
//       fetchRooms();
//     } catch (error) {
//       console.error('Error deleting room:', error);
//     }
//   };
const handleDeleteRoom = async (roomId) => {
    try {
      console.log(`Attempting to delete room with ID: ${roomId}`);
      await axios.delete(`${API_URL}/booking/${roomId}`);
      console.log(`Room with ID: ${roomId} deleted successfully`);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };
  
  

  const handleDeleteItem = async (itemId) => {
    try {
      console.log(`Attempting to delete item with ID: ${itemId}`);  // Log the item ID being deleted
      const response = await axios.delete(`${API_URL}/room-service/items/${itemId}`);
      console.log('Deletion response:', response);  // Log the response from the server
      fetchRoomServiceItems();
    } catch (error) {
      console.error('Error deleting item:', error.response || error);  // Log detailed error information
    }
};



  const handleEditRoom = async (roomId, updatedRoomData) => {
    try {
      await axios.put(`${API_URL}/booking/${roomId}`, updatedRoomData, { headers: { Authorization: `Bearer ${token}` } });
      fetchRooms();
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleEditItem = async (itemId, updatedItemData) => {
    try {
      await axios.put(`${API_URL}/room-service-items/${itemId}`, updatedItemData, { headers: { Authorization: `Bearer ${token}` } });
      fetchRoomServiceItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  

  return (
    <div className="order-management">
      <div className="rooms-column">
        <h2>Rooms</h2>
        {rooms.map(room => (
          <div key={room.id} className="room-entry">
            <p>Category: {room.category}</p>
            <p>Size: {room.size}</p>
            <p>Occupancy: {room.occupancy}</p>
            <p>Bed Type: {room.bed_type}</p>
            <p>Style: {room.style}</p>
            <p>Price: ${room.price}</p>
            <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
            {/* Implement edit button if needed */}
          </div>
        ))}
        <form onSubmit={handleAddRoom} className="add-room-form">
          <input name="category" onChange={handleRoomChange} value={newRoom.category} placeholder="Category" />
          <input name="size" onChange={handleRoomChange} value={newRoom.size} placeholder="Size" />
          <input name="occupancy" onChange={handleRoomChange} value={newRoom.occupancy} placeholder="Occupancy" />
          <input name="bed_type" onChange={handleRoomChange} value={newRoom.bed_type} placeholder="Bed Type" />
          <input name="style" onChange={handleRoomChange} value={newRoom.style} placeholder="Style" />
          <input name="image_url" onChange={handleRoomChange} value={newRoom.image_url} placeholder="Image URL" />
          <input name="price" type="number" onChange={handleRoomChange} value={newRoom.price} placeholder="Price" />
          <button type="submit">Add Room</button>
        </form>
      </div>
  
      <div className="items-column">
        <h2>Room Service Items</h2>
        {roomServiceItems.map(item => (
          <div key={item.id} className="item-entry">
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            {/* Implement edit button if needed */}
          </div>
        ))}
        <form onSubmit={handleAddItem} className="add-item-form">
          <input name="name" onChange={handleItemChange} value={newItem.name} placeholder="Name" />
          <textarea name="description" onChange={handleItemChange} value={newItem.description} placeholder="Description" />
          <input name="price" type="number" onChange={handleItemChange} value={newItem.price} placeholder="Price" />
          <input name="image_url" onChange={handleItemChange} value={newItem.image_url} placeholder="Image URL" />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
  
}

export default OrderManagement;
