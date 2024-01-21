import React, { useState } from 'react';

import './BookingPage.css'; 


function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000';
  // In BookingPage.js
const fetchAdminBookings = () => {
  const token = sessionStorage.getItem('jwt_token'); // Retrieve token from storage
  fetch(`${API_URL}/admin/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => setBookings(data))
    .catch(error => console.error('Error fetching available rooms:', error));
};

  
  // const handleFetchRooms = () => {
  //   fetch(`${API_URL}/booking`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Check if data.rooms is an array or do any necessary data transformation
  //       const roomsArray = Array.isArray(data) ? data : [];
  
  //       setAvailableRooms(roomsArray);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching available rooms:', error);
  //     });
  // };
  

  const handleRoomSelection = (roomId) => {
    console.log('Selected room ID:', roomId);
    // Additional logic for room selection can be added here
  };

  const roomList = availableRooms.map(room => (
    <div key={room.id} className="room-card">
      {/* <img src={`${API_URL}/${room.image_url.replace('static/', '')}`} alt={room.category} className="room-image" /> */}
      {/* <img src={`${API_URL}${room.image_url}`} alt={room.category} className="room-image" /> */}
      <img src={`${API_URL}/${room.image_url.split('static/').pop()}`} alt={room.category} className="room-image" />

      {/* <img src={`${API_URL}/static/${room.image_url}`} alt={room.category} className="room-image" /> */}
      <div className="room-details">
        <h2>{room.category}</h2>
        <p>{room.style}</p>
        {bookingRoomId === room.id ? (
          <>
            <div className="date-picker-container">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
              <button onClick={confirmDates} className="confirm-dates-button">Select Dates</button>
            </div>
            {showBookingForm && (
              <form onSubmit={handleBookingSubmission} className="booking-form">
                <input type="text" placeholder="Your Name" onChange={e => { /* your handler here */ }} required />
                <input type="email" placeholder="Your Email" onChange={e => { /* your handler here */ }} required />
                <button type="submit" className="submit-booking-button">Save Booking</button>
              </form>
            )}
          </>
        ) : (
          <button onClick={() => handleBookRoom(room.id)} className="book-now-button">Book Now</button>
        )}
      </div>
    </div>
  ));
  

  return (
    <div className="booking-page">
      <nav className="navigation-bar">
        {/* Navigation content */}
        {/* <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/login">Login</a> */}
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Perfect Stay</h1>
          <p>Explore our hotel's exquisite rooms and gourmet dining experiences for your next luxurious escape..</p>
          <form onSubmit={handleSubmit} className="search-form">
            {/* Input fields */}
            {/* <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} /> */}
            <button type="submit">Search</button>
          </form>
        </div>
        <img src="https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Hero" className="hero-image" />
      </section>
      {bookingSuccess && <SuccessMessage />}
      <section className="available-rooms" id="available-rooms-section">
  <h2>Available Rooms</h2>
  <button onClick={handleFetchRooms}>Fetch Available Rooms</button>
  <div className="room-grid">
    {availableRooms.map((room) => (
      <div key={room.id} className="room-card">
        <img
          src={`${API_URL}/${room.image_url}`}
          alt={room.category}
          className="room-image"
        />
        <div className="room-details">
          <h2>{room.category}</h2>
          <p>Style: {room.style}</p>
          <p>Occupancy: {room.occupancy}</p>
          <p>Size: {room.size}</p>
          <p>Bed Type: {room.bed_type}</p>
          <p>Price: {room.price}</p>
          
          {bookingRoomId === room.id ? (
            <>
              <div className="date-picker-container">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
                <button onClick={() => setBookingRoomId(null)} className="cancel-button">
                Cancel
                </button>
                <button onClick={handleBookingSubmission} className="confirm-dates-button">
                Confirm Booking
                </button>
                
              </div>
              
            </>
          ) : (
            <button onClick={() => handleBookRoom(room.id)} className="book-now-button">
              Book Now
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

      

      <section className="subscription-section">
        {/* Subscription content */}
      </section>

      


      <footer className="footer">
        <div>
          <h3>About Us</h3>
          <p>Learn more about our company and values.</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>Have questions? Feel free to reach out.</p>
        </div>
        <div>
          <h3>Follow Us</h3>
          <p>Connect with us on social media.</p>
        </div>
      </footer>
    </div>
  );
}

export default BookingPage;