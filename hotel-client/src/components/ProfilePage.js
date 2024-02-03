import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing user icon from react-icons

function ProfilePage() {
    const [selectedSpecialOrder, setSelectedSpecialOrder] = useState(null);
    const [userDetails, setUserDetails] = useState({ username: '', email: '', phone_number: '', room_service_orders: [] });
    const [ordersConfirmed, setOrdersConfirmed] = useState(false); 

    // const [userDetails, setUserDetails] = useState({ username: '', email: '', phone_number: '', orders: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// axios.get call within useEffect

    //    const API_URL = 'http://localhost:8000';
    const navigate = useNavigate();

    const userID = sessionStorage.getItem('user_id');

    const handleConfirmOrders = () => {
        setOrdersConfirmed(true);
    };



    // ProfilePage.js - Modified useEffect hook
    useEffect(() => {
        if (!userID) {
            navigate('/login');
        } else {
            setLoading(true);
            
            const token = sessionStorage.getItem('jwt_token');
            axios.get(`${API_URL}/user/${userID}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // .then(response => {
            //     const userData = response.data;
            //     setUserDetails(userData);
            //     setLoading(false);
            //   })
            .then(response => {
                const userData = response.data;
                // Assuming userData contains 'room_service_orders' and 'special_orders'
                const formattedUserData = {
                    ...userData,
                    username: userData.username,
                    ordersCount: userData.orders ? userData.orders.length : 0,
                    // bookedRoomsCount: userData.hotel_bookings_count,
                    bookedRoomsCount: userData.hotel_bookings_count || 0,

                    roomServiceOrdersCount: userData.room_service_orders ? userData.room_service_orders.length : 0,
                    specialOrdersCount: userData.special_orders ? userData.special_orders.length : 0
                };
                setUserDetails(formattedUserData);
                setLoading(false);
            })
           
            .catch(error => {
                if (error.message === "Network Error") {
                    setError('Network error, please check your connection and try again');
                } else {
                    console.error("Error fetching profile data:", error);
                    setError('Error fetching profile data');
                }
                setLoading(false);
            });
        }
    }, [userID, navigate]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>{error}</p>;
    if (!userDetails) return <p>User not found or not logged in.</p>;

    


    const handleDeleteBookedRoom = (roomId) => {
        // Send a request to your backend to delete the booked room
        const token = sessionStorage.getItem('jwt_token'); // Retrieve the JWT token
        axios
          .delete(`${API_URL}/delete-booked-room/${roomId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // Handle success or show a confirmation message
            console.log('Booked room deleted successfully');
            // Update userDetails to remove the deleted room
            setUserDetails((prevUserDetails) => ({
              ...prevUserDetails,
              hotel_bookings: prevUserDetails.hotel_bookings.filter(
                (booking) => booking.id !== roomId
              ),
            }));
          })
          .catch((error) => {
            if (error.response) {
              // The request was made, but the server responded with an error
              console.error('Error deleting booked room:', error.response.data);
            } else if (error.request) {
              // The request was made, but no response was received
              console.error('No response received from the server. Please check your server.');
            } else {
              // Something happened in setting up the request that triggered an error
              console.error('Error setting up the request:', error.message);
            }
          });
      };
      
    
    
      const handleDeleteRoomServiceOrder = (orderId) => {
        const token = sessionStorage.getItem('jwt_token');
        axios
          .delete(`${API_URL}/delete-room-service-order/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // Log success message
            console.log('Room Service Order deleted successfully');
            // Update state to remove the deleted room service order
            setUserDetails((prevUserDetails) => ({
              ...prevUserDetails,
              
              // Assuming room_service_orders is the correct key and it contains an array of orders
              room_service_orders: prevUserDetails.room_service_orders.filter(

                (order) => order.id !== orderId
              ),
            }));
          })
          .catch((error) => {
            console.error('Error deleting Room Service Order:', error.response.data);
            // Optionally, refresh or fetch user details again to ensure UI consistency
          });
      };
      
      
      const handleDeleteSpecialOrder = (orderId) => {
        const token = sessionStorage.getItem('jwt_token');
        axios
          .delete(`${API_URL}/delete-special-order/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // Handle success or show a confirmation message
            console.log('Special Order deleted successfully');
            // You can also update the state to remove the deleted order from the list
            setUserDetails((prevUserDetails) => ({
              ...prevUserDetails,
              special_orders: prevUserDetails.special_orders.filter(
                (order) => order.id !== orderId
              ),
            }));
          })
          .catch((error) => {
            console.error('Error deleting Special Order:', error);
          });
      };
      

    return (
        <div style={styles.profileContainer}>
            <div style={styles.profileIcon}><FaUserCircle size={100} /></div>
            <h1 style={styles.profileHeader}>Profile</h1>
            {/* <p style={styles.username}>Hello, {userDetails.username || 'User'}</p> */}
            <p style={styles.username}>Hello, {userDetails.username || 'Guest'}</p>

            {/* <div style={styles.info}>
                <strong>Email:</strong> {userDetails.email || 'N/A'}
            </div>
            <div style={styles.info}>
                <strong>Phone Number:</strong> {userDetails.phone_number || 'N/A'}
            </div> */}

<div style={styles.info}>
  <strong>Room Service Orders:</strong>
  {userDetails.ordersCount === 0 ? (
    <p>No room service orders</p>
  ) : (
    userDetails.orders.map((order) => (
      <div key={order.id} style={styles.orderDetails}>
        <p>{order.details}</p>
        <button onClick={() => handleDeleteRoomServiceOrder(order.id)}>Delete</button>
      </div>
    ))
  )}
</div>
<div style={styles.info}>
    <strong>Booked Rooms:</strong>
    {userDetails.hotel_bookings.length === 0 ? (
  <p>No hotel bookings</p>
) : (
  userDetails.hotel_bookings.map((booking) => (
    <div key={booking.id} style={styles.orderDetails}>
      <p>
        Room Details: {`${booking.room.category}, ${booking.room.style}`}
        <br />
        Check-In: {new Date(booking.check_in).toLocaleDateString()}
        <br />
        Check-Out: {new Date(booking.check_out).toLocaleDateString()}
      </p>
      <button onClick={() => handleDeleteBookedRoom(booking.id)}>Delete</button>

      {/* <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button> */}
    </div>
  ))
)}

    {/* <p>{userDetails.bookedRoomsCount}</p> Use the updated key here */}
</div>
{/* <div style={styles.info}>
    <strong>Booked Rooms:</strong>
    <p>{userDetails.roomServiceOrdersCount === 0 ? '0' : userDetails.roomServiceOrdersCount}</p>
</div> */}
<div style={styles.info}>
  <strong>Special Orders:</strong>
  {userDetails.specialOrdersCount === 0 ? (
    <p>No special orders</p>
  ) : (
    userDetails.special_orders.map((specialOrder) => (
      <div key={specialOrder.id} style={styles.orderDetails}>
        <p><strong>Details:</strong> {specialOrder.request}</p>
        {/* <p><strong>Status:</strong> {specialOrder.status}</p> */}
        {/* You can display any other relevant details here */}
        <button onClick={() => handleDeleteSpecialOrder(specialOrder.id)}>Delete</button>
      </div>
    ))
  )}
</div>



            {/* Button to confirm orders */}
{!ordersConfirmed ? (
    <button onClick={handleConfirmOrders} style={styles.confirmButton}>
        Confirm All Orders
    </button>
) : (
    <>
        <p style={styles.confirmMessage}>Orders Confirmed</p>
        <button onClick={() => setOrdersConfirmed(false)} style={styles.confirmButton}>
            Return to Orders
        </button>
    </>
)}


            {/* Display confirmation message */}
            {ordersConfirmed && <p style={styles.confirmMessage}>Orders Confirmed</p>}

            <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
        </div>
    );
}

const styles = {
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Roboto', sans-serif",
        color: '#333',
        backgroundColor: '#f0f8ff', // Soft blue background
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    profileIcon: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    profileHeader: {
        color: '#5f9ea0', // Soft blue color for the text
        fontSize: '2rem',
        textAlign: 'center'
    },
    username: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    info: {
        fontSize: '1rem',
        margin: '5px 0',
    },
    orderDetails: {
        backgroundColor: '#e6f7ff', // Lighter blue for order details
        padding: '5px 10px',
        borderRadius: '5px',
        margin: '5px 0'
    },
    logoutButton: {
        backgroundColor: '#5f9ea0', // Soft blue color for the button
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        margin: '20px 0'
    }
};

export default ProfilePage;