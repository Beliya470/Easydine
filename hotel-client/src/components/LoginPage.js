import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = 'http://localhost:5000';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const payload = { 
            username: credentials.username, 
            password: credentials.password 
        };

        if (!isLogin && credentials.password !== credentials.confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}${endpoint}`, payload);
            if (response.data.success) {
                if (isLogin) {
                    const redirectPath = response.data.is_admin ? '/admin/dashboard' : '/profile';
                    navigate(redirectPath);
                } else {
                    alert('Registration successful. Please log in.');
                    setIsLogin(true); // Switch to the login form
                }
            } else {
                setError(response.data.error || 'Invalid credentials.');
            }
        } catch (error) {
            console.error('Auth error:', error);
            setError('An error occurred.');
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
