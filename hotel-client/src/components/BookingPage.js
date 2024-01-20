import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import './BookingPage.css'; 
import 'react-datepicker/dist/react-datepicker.css';


function BookingPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookingRoomId, setBookingRoomId] = useState(null);

  // Remove this line:
const [bookingSuccess, setBookingSuccess] = useState(false);


  
  const [showBookingForm, setShowBookingForm] = useState(false);
 

  // const [bookingSuccess, setBookingSuccess] = useState(false);

  // const handleBookingSubmission = (event) => {
  //   event.preventDefault();
  //   // Implement your booking logic here.
  //   // After the booking logic:
  //   setBookingSuccess(true); // Set the success message to true
  // };



  const handleBookRoom = (roomId) => {
    
    setBookingRoomId(roomId); // Set the current room id for booking
    // You might want to toggle visibility of the date-picker here or navigate the user to the booking details page
  };

  const confirmDates = () => {
    setShowBookingForm(true);
  };
  const handleSuccessAcknowledgement = () => {
    setBookingSuccess(false); // Hide the success message
    // Here you can also reset form values or redirect the user as needed
    // For example, to reset the form you could setStartDate(new Date()), setEndDate(new Date()), etc.
    // To redirect the user, you could use window.location.href = '/some-path';
  };


    // Modify your SuccessMessage component
const SuccessMessage = () => (
  <div className="success-message">
    <p>Reservation was successful!</p>
    <button onClick={handleSuccessAcknowledgement} className="acknowledge-button">OK</button>
  </div>
);

const handleBookingSubmission = async (event) => {
  event.preventDefault();

  const userId = sessionStorage.getItem('user_id'); // Retrieve user ID from storage
  const bookingDetails = {
    userId: userId,
    roomId: bookingRoomId,
    checkIn: startDate.toISOString(),
    checkOut: endDate.toISOString(),
  };

  // Log the booking details to the console
  console.log('Booking Details:', bookingDetails);

  try {
    const response = await fetch(`${API_URL}/make-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`,
      },
      body: JSON.stringify(bookingDetails)
    });

    const data = await response.json();
    if (response.ok) {
      setBookingSuccess(true);
    } else {
      console.error('Booking error:', data);
    }
  } catch (error) {
    console.error('Error submitting booking:', error);
  }
};






  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // Here you would handle the date change, perhaps updating state or making a booking API call
  };


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1,
  });

  const [availableRooms, setAvailableRooms] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('available-rooms-section').scrollIntoView({ behavior: 'smooth' });
  };

  const API_URL = 'http://localhost:5000';
  // In BookingPage.js
const handleFetchRooms = () => {
  const token = sessionStorage.getItem('jwt_token'); // Retrieve token from storage
  fetch(`${API_URL}/booking`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => setAvailableRooms(data))
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
