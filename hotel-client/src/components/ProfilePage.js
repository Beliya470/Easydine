import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the current user's profile
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/profile');
                setUsername(data.username);
                setEmail(data.email);
            } catch (error) {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/profile', { username, email });
            alert('Profile updated successfully!');
        } catch (error) {
            setError('Error updating profile');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default ProfilePage;
