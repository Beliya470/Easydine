
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import './BookingPage.css'; 
import 'react-datepicker/dist/react-datepicker.css';
import whatsappIcon from './whatsapp.png'; // Adjust the path if necessary









function BookingPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookingRoomId, setBookingRoomId] = useState(null);

  // Remove this line:
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const navigate = useNavigate();


  const API_URL = 'https://easydine2024-8.onrender.com'; // Backend API URL
  const [showBookingForm, setShowBookingForm] = useState(false);
 

  // const [bookingSuccess, setBookingSuccess] = useState(false);

  // const handleBookingSubmission = (event) => {
  //   event.preventDefault();
  //   // Implement your booking logic here.
  //   // After the booking logic:
  //   setBookingSuccess(true); // Set the success message to true
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the function to fetch rooms or handle the submission logic here
    handleFetchRooms(); // This will fetch rooms when the form is submitted
  };
  
  



  const handleBookRoom = (roomId) => {
    
    setBookingRoomId(roomId); // Set the current room id for booking
    // You might want to toggle visibility of the date-picker here or navigate the user to the booking details page
  };

  const confirmDates = () => {
    setShowBookingForm(true);
  };
  const handleSuccessAcknowledgement = () => {
    setBookingSuccess(false); // Hide the success message
    setShowBookingForm(false);
    setBookingRoomId(null);
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

  // Check if the user is logged in
  if (!userId) {
    alert('Please log in to confirm your booking.');
    navigate('/login'); // Replace '/login' with your login route
    return;
  }

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
  
    // useEffect hook added to fetch rooms automatically on component mount
    useEffect(() => {
      handleFetchRooms();
    }, []); // Empty array as second argument to only run once on mount
  
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

  

  const handleRoomSelection = (roomId) => {
    console.log('Selected room ID:', roomId);
    // Additional logic for room selection can be added here
  };

  const roomList = Array.isArray(availableRooms) ? availableRooms.map(room => (
  //  const roomList = availableRooms.map(room => (
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
              inline
            />

              {/* <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              /> */}
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
  )): null;
  

  return (
    <div className="booking-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Perfect Stay</h1>
          <p>Explore our hotel's exquisite rooms and gourmet dining experiences for your next luxurious escape..</p>
          <form onSubmit={handleSubmit} className="search-form">
            {/* Input fields */}
            {/* <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} /> */}
            {/* <button type="submit">Search</button> */}
          </form>
        </div>
        <img src="https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Hero" className="hero-image" />
      </section>
  
      <section className="available-rooms" id="available-rooms-section">
        <h2>Available Rooms</h2>
        <div className="room-grid">

        {Array.isArray(availableRooms) && availableRooms.map((room) => (
          // {availableRooms.map((room) => (
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
                <p>Price: £{room.price}</p>
                
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
                      {bookingSuccess ? (
                        <SuccessMessage />
                      ) : (
                        <button onClick={handleBookingSubmission} className="confirm-dates-button">
                          Confirm Booking
                        </button>
                      )}
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



      <footer className="footer">
  <div>
    <h3>About Us</h3>
    <p>At our hotel, we are committed to providing an unparalleled experience for our guests. Our team is dedicated to ensuring every stay is memorable, combining luxury with the comforts of home.</p>
  </div>
  <div>
    <h3><a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a></h3>
    
    <p>If you have any inquiries or need assistance, please don't hesitate to <a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>reach out</a>. <a href="https://wa.me/+447477181743" style={{ textDecoration: 'none', color: 'inherit' }}><img src={whatsappIcon} alt="WhatsApp" style={{ width: '114px', height: '20px' }}/></a></p>

    {/* <p>If you have any inquiries or need assistance, please don't hesitate to <a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>reach out</a>. <a href="https://wa.me/+447477181743" style={{ textDecoration: 'none', color: 'inherit' }}><img src="whatsapp.png" alt="WhatsApp"/></a></p> */}

    {/* <p>If you have any inquiries or need assistance, please don't hesitate to <a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>reach out</a>. <a href="https://wa.me/+447477181743" style={{ textDecoration: 'none', color: 'inherit' }}><img src="whatsapp_icon_url" alt="WhatsApp"/></a></p> */}
  </div>
</footer>

    </div>
  );
}

export default BookingPage;