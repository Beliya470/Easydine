import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Corrected import path
import { useState, useEffect } from 'react';
import axios from 'axios';

// Importing all necessary components
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import ContactPage from './components/ContactPage';
import DeliveryPage from './components/DeliveryPage';
import FeedbackPage from './components/FeedbackPage';
import FoodOrderPage from './components/FoodOrderPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import OrderPage from './components/OrderPage';
import PaymentPage from './components/PaymentPage';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import RoomServicePage from './components/RoomServicePage';
import SpecialOrderPage from './components/SpecialOrderPage';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make an authenticated request to fetch user data
    axios.get('http://localhost:5000/user') // Replace with your actual API endpoint
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Router>
      <AuthProvider> {/* Wrap your app with AuthProvider */}
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/food-order" element={<FoodOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/profile/:userID" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/room-service/items" element={<RoomServicePage />} />
          <Route path="/room-service/order" element={<RoomServicePage />} />
          <Route path="/special-order" element={<SpecialOrderPage />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Additional routes can be added as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
