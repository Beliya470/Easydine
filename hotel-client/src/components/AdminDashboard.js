import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get('/booking');
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Bookings:</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.name} - {booking.room_type} from {booking.check_in} to {booking.check_out}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
