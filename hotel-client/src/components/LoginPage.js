import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        is_admin: false,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    

    const API_URL = 'http://localhost:8000';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const endpoint = isLogin ? '/login' : '/register';
        const payload = isLogin ? { 
            username: credentials.username, 
            password: credentials.password 
        } : { 
            username: credentials.username, 
            password: credentials.password,
            is_admin: credentials.is_admin
        };
        console.log("Sending to server:", payload);

        if (!isLogin && credentials.password !== credentials.confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}${endpoint}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Received from server:", response.data);

            if (response.data.success) {
                if (isLogin) {
                    // User is logging in
                    // const userID = response.data.user_id; // Adjust according to your actual response structure
                    // sessionStorage.setItem('user', JSON.stringify(response.data));
                    sessionStorage.setItem('user_id', response.data.user_id);
                    sessionStorage.setItem('jwt_token', response.data.token);
                    
                    navigate(`/booking`);
                    // sessionStorage.setItem('user_logged_in', true);
                    const redirectPath = response.data.is_admin ? '/admin' : `/booking`;

                    // const redirectPath = response.data.is_admin ? '/admin' : `/profile/${userID}`;
                    navigate(redirectPath);
                } else {
                    // User has registered successfully
                    // New: Alert user and switch to login form without redirecting
                    alert('Registration successful. Please log in.');
                    setIsLogin(true); // Switch to the login form
                }
            } else {
                setError(response.data.message || 'Invalid credentials.');
            }
        } catch (error) {
            console.error('Auth error:', error.response ? error.response.data : error);
            setError('Username already exists');
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#8ecae6',
        transition: 'all 0.5s',
        transform: isLogin ? 'translateY(0)' : 'translateY(-100px)',
        opacity: isLogin ? 1 : 0.8,
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.5s',
        transform: isLogin ? 'scale(1)' : 'scale(1.05)',
    };

    const buttonStyle = {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#ffafcc',
        color: 'white',
        fontWeight: 'bold',
    };

    const switchButtonStyle = {
        background: 'none',
        border: 'none',
        color: '#023047',
        textDecoration: 'underline',
        cursor: 'pointer',
    };
    

    return (
        <div style={pageStyle}>
            <h1>{isLogin ? 'Welcome Back!' : 'Join Us!'}</h1>
            {error && <div style={{ color: '#f94144' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    name="username"
                    type="text"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                {!isLogin && (
                    <input
                        name="confirmPassword"
                        type="password"
                        value={credentials.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                )}
                {!isLogin && (
                    <label>
                        <input
                            name="is_admin"
                            type="checkbox"
                            checked={credentials.is_admin}
                            onChange={(e) => setCredentials({ ...credentials, is_admin: e.target.checked })}
                            // onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.checked ? 'true' : 'false' } })}
                            // onChange={handleChange}
                            // onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'is_admin', value: e.target.checked } })}
                        />
                        Register as admin
                    </label>
                )}
                
                <button type="submit" style={buttonStyle}>
                    {isLogin ? 'Log In' : 'Register'}
                </button>
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    style={switchButtonStyle}
                >
                    {isLogin ? 'New here? Register' : 'Already a member? Log In'}
                </button>
            </form>
        </div>
    );
}

export default AuthPage;
