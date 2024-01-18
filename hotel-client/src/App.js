import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
  return (
    <Router>
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/room-service" element={<RoomServicePage />} />
        <Route path="/special-order" element={<SpecialOrderPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Additional routes can be added as needed */}
      </Routes>
    </Router>
  );
}

export default App;
