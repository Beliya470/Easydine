import axios from 'axios';

// Define the base URL for the API
const API_URL = 'http://localhost:5000'; // or the URL where your Flask app is hosted

// Place a special order
export const placeSpecialOrder = async (request) => {
    try {
        const response = await axios.post(`${API_URL}/special-order`, { request });
        return response.data;
    } catch (error) {
        console.error('Error placing special order:', error);
        throw error;
    }
};

// Fetch room service items
export const fetchRoomServiceItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/room-service/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching room service items:', error);
        throw error;
    }
};

// Place a room service order
export const placeRoomServiceOrder = async (orderDetails) => {
    try {
        const response = await axios.post(`${API_URL}/room-service/order`, orderDetails);
        return response.data;
    } catch (error) {
        console.error('Error placing room service order:', error);
        throw error;
    }
};

// Place a food order
export const placeFoodOrder = async (orderDetails) => {
    try {
        const response = await axios.post(`${API_URL}/food/order`, orderDetails);
        return response.data;
    } catch (error) {
        console.error('Error placing food order:', error);
        throw error;
    }
};

// Get the status of an order
export const getOrderStatus = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/order/status/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order status:', error);
        throw error;
    }
};

// Complete the payment process
export const completePayment = async (amount) => {
    try {
        const response = await axios.post(`${API_URL}/pay`, { amount });
        return response.data;
    } catch (error) {
        console.error('Error completing payment:', error);
        throw error;
    }
};

// Fetch all bookings
export const fetchBookings = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/bookings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

// Add other API functions as necessary to match your backend routes


// Make an API request to fetch room service items
axios.get('/room-service/items')
    .then(response => {
        const items = response.data;
        const selectElement = document.getElementById('item_id');

        // Populate the dropdown with room service items
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = `${item.name} - $${item.price}`;
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching room service items:', error);
    });
// ...

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};


// Login a user and check for admin status
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        // The response should contain `is_admin` property if login is successful
        if (response.data.success && response.data.is_admin) {
            // You could store the admin status in the session/local storage or handle as needed
            console.log('Admin logged in');
        }
        return response.data; // This object contains the success flag and the is_admin flag
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Logout the current user
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/logout`);
        // Here you should also clear the admin status from session/local storage
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};



// Submit feedback
export const submitFeedback = async (feedbackData) => {
    try {
        const response = await axios.post(`${API_URL}/feedback`, feedbackData);
        return response.data;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};

// Place a delivery order
export const placeDeliveryOrder = async (deliveryData) => {
    try {
        const response = await axios.post(`${API_URL}/delivery`, deliveryData);
        return response.data;
    } catch (error) {
        console.error('Error placing delivery order:', error);
        throw error;
    }
};

// Get the status of a delivery
export const getDeliveryStatus = async (deliveryId) => {
    try {
        const response = await axios.get(`${API_URL}/delivery/status/${deliveryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching delivery status:', error);
        throw error;
    }
};

// Update profile
export const updateProfile = async (profileData) => {
    try {
        const response = await axios.post(`${API_URL}/profile`, profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// Add any other missing API functions here as needed

// ...
