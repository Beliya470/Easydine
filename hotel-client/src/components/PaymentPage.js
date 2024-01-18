import React, { useState } from 'react';
import axios from 'axios';

function PaymentPage() {
    const [amount, setAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/pay', { amount });
            // Assuming the response contains payment status information
            // You can use this data to display a message to the user
            setPaymentStatus(response.data.status);
        } catch (error) {
            // Handle error
            console.error('Payment failed:', error);
            setPaymentStatus('Payment Failed');
        }
    };

    return (
        <div>
            <h1>Payment</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount in cents"
                />
                <button type="submit">Proceed to Payment</button>
            </form>
            {paymentStatus && (
                <p>Payment Status: {paymentStatus}</p>
            )}
        </div>
    );
}

export default PaymentPage;
