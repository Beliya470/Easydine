import axios from 'axios';

const API_URL = 'http://localhost:5000';

const ApiService = {
    fetchAdminBookings() {
        return fetch(`${API_URL}/admin/bookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` 
                // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Assuming the token is stored in localStorage
            }
        }).then(response => response.json());
    }, // Added comma here

    fetchAdminOrders() {
        return fetch(`${API_URL}/admin/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` 
                // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Assuming the token is stored in localStorage
            }
        }).then(response => response.json());
    }, // Added comma here

    // Example of another API call (can be customized as needed)
    fetchUserData: async (userId) => {
        const response = await axios.get(`${API_URL}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`
            }
        });
        return response.data;
    },

    // Add other API calls as required...
};

export default ApiService;
