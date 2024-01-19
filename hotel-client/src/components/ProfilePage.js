import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing user icon from react-icons

function ProfilePage() {
    const [userDetails, setUserDetails] = useState({ username: '', email: '', phone_number: '', orders: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_URL = 'http://localhost:5000';
    const navigate = useNavigate();

    const userID = sessionStorage.getItem('user_id');

    useEffect(() => {
        if (!userID) {
            navigate('/login');
        } else {
            setLoading(true);
            axios.get(`${API_URL}/profile/${userID}`)
                .then(response => {
                    setUserDetails(response.data);
                })
                .catch(error => {
                    console.error("Error fetching profile data:", error);
                    setError('Error fetching profile data');
                })
                .finally(() => {
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

    return (
        <div style={styles.profileContainer}>
            <div style={styles.profileIcon}><FaUserCircle size={100} /></div>
            <h1 style={styles.profileHeader}>Profile</h1>
            <p style={styles.username}>Hello, {userDetails.username || 'User'}</p>
            <div style={styles.info}>
                <strong>Email:</strong> {userDetails.email || 'N/A'}
            </div>
            <div style={styles.info}>
                <strong>Phone Number:</strong> {userDetails.phone_number || 'N/A'}
            </div>
            <div style={styles.info}>
                <strong>My Orders:</strong>
                {userDetails.orders ? (
                    userDetails.orders.length > 0 ? (
                        userDetails.orders.map((order) => (
                            <div key={order.id} style={styles.orderDetails}>{order.details}</div>
                        ))
                    ) : (
                        <p>No orders made yet.</p>
                    )
                ) : (
                    <p>Loading orders...</p>
                )}
            </div>
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
