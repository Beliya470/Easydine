import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import LogoutPage from './components/LogoutPage';
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
    // Assuming you store the token in local storage or context after login
    const token = localStorage.getItem('token'); // or useContext to get the token from context
  
    if (token) {
      
      axios.get('http://localhost:8000/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          // Redirect to login if there's an error fetching user data
          // This might be because the token is invalid or expired
          // navigate('/login'); // Use navigate function from 'useNavigate' hook
        });
    }
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
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}
          {/* <Route path="/user" element={<ProfilePage />} /> */}
          <Route path="/user/:userId" element={<ProfilePage />} />


          <Route path="/register" element={<RegisterPage />} />
          <Route path="/room-service/items" element={<RoomServicePage />} />
          <Route path="/room-service/items" element={<RoomServicePage />} />
          <Route path="/special-order" element={<SpecialOrderPage />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Additional routes can be added as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
