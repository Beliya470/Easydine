import React, { useState, useEffect } from 'react';
import ApiService from './ApiService';

function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            setLoading(true);
            try {
                const bookingsData = await ApiService.fetchAdminBookings();
                setBookings(bookingsData.bookings);

                const ordersData = await ApiService.fetchAdminOrders();
                setOrders(ordersData.orders);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setError(error);
            }
            setLoading(false);
        };

        fetchAdminData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Bookings:</h2>
            <ul>
                {Array.isArray(bookings) && bookings.map(booking => (
                    <li key={booking.id}>
                        {booking.user?.username} - {booking.room} from {booking.check_in} to {booking.check_out}, Total: ${booking.total}
                    </li>
                ))}
            </ul>
            <h2>Orders:</h2>
            <ul>
                {Array.isArray(orders) && orders.map(order => (
                    <li key={order.id}>
                    {order.user?.username} - {order.details}, Total: ${
                        Array.isArray(order.items) ? order.items.reduce((total, item) => total + item.price, 0) : 'No items'
                    }
                </li>
                ))}
            </ul>
        </div>
    );
    
}

export default AdminDashboard;
