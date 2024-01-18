import React, { useState } from 'react';
import axios from 'axios';

function DeliveryPage() {
    const [details, setDetails] = useState('');
    const [address, setAddress] = useState('');
    // Additional fields like delivery time can be added

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/delivery', { details, address });
            // Handle successful order placement
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <h1>Delivery Order</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Delivery details"
                />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Delivery Address"
                />
                {/* Additional fields like delivery time can be added here */}
                <button type="submit">Place Delivery Order</button>
            </form>
        </div>
    );
}

export default DeliveryPage;
