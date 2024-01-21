import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const navStyle = {
        display: 'flex',
        flexDirection: 'row', /* Align items horizontally */
        backgroundColor: '#333', /* Background color for the navbar */
        padding: '200px 100', /* Vertical padding to navbar */
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#fff', /* Text color for links */
        padding: '10px 15px', /* Balanced padding to the buttons */
        marginRight: '10px', /* Right margin for spacing between buttons */
        borderRadius: '5px',
        transition: 'transform 0.2s ease-in-out, background-color 0.2s',
        display: 'inline-flex', /* Use inline-flex for aligning text inside anchors */
        alignItems: 'right', /* Center the text vertically */
        justifyContent: 'right', /* Center the text horizontally */
    };

    const linkHoverStyle = {
        backgroundColor: '#ff6b6b', /* Background color on hover */
        transform: 'translateY(-3px)', /* 'Dance' move upwards */
    };

    const linkActiveStyle = {
        transform: 'scale(0.95)', /* Slightly shrink the button when clicked */
        transition: 'transform 0.2s', /* Smooth transition for the transform */
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
            {/* <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link> */}
            <Link to="/booking" style={linkStyle}>Book a Room</Link>
            {/* <Link to="/profile/user_id" style={linkStyle}>Profile</Link> */}
            {/* <Link to="/orders">View Orders</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/admin">Admin Dashboard</Link> */}
            <Link to="/special-order" style={linkStyle}>Special Orders</Link>
            <Link to="/admin" style={linkStyle}>Admin Dashboard</Link>
            <Link to="/room-service/items" style={linkStyle}>Room Service</Link>
            {/* <Link to="/admin" style={linkStyle}>Admin Dashboard</Link> */}
            {/* <Link to="/food-order" style={linkStyle}>Food Order</Link> */}
            {/* <Link to="/delivery">Delivery</Link>
            <Link to="/payment">Make Payment</Link> */}
            <Link to="/contact" style={linkStyle}>Contact Us</Link>
            {/* Additional links can be added as needed */}
        </nav>
    );
}

export default Navbar;
