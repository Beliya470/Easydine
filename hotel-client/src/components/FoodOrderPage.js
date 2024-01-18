import React, { useState } from 'react';
import axios from 'axios';

function FoodOrderPage() {
    const [details, setDetails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/food/order', { details });
            // Handle successful order placement
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <h1>Food Order</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Order details"
                />
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
}

export default FoodOrderPage;
