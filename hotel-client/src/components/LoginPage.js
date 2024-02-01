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
    
        if (!isLogin && credentials.password !== credentials.confirmPassword) {
            setError("Passwords don't match.");
            return;
        }
    
        try {
            const response = await axios.post(`${API_URL}${endpoint}`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
        
            console.log("Received from server:", response.data); // Debug: Log the entire response
        
            if (response.data.success) {
                if (!isLogin) {
                    alert('Registration successful. Please log in.');
                    setIsLogin(true);
                } else {
                    // Correctly retrieve user_id from the response. Adjust this line based on your actual response structure.
                    // If the user ID is directly in the response, use response.data.user_id or similar.
                    const userId = response.data.user_id; // Adjust this according to your response structure
            
                    if (userId) {
                        // sessionStorage.setItem('user_id', userId.toString()); // Ensure userId is a string
                        // After successful login
                        sessionStorage.setItem('user_id', response.data.user_id.toString());

                        sessionStorage.setItem('jwt_token', response.data.token);
                        sessionStorage.setItem('is_admin', response.data.is_admin.toString());
                        
                        navigate(response.data.is_admin ? '/admin' : '/booking');
                    } else {
                        console.error('User ID is undefined.');
                        setError('Login failed due to server error.');
                    }
                }
            } else {
                setError(response.data.message || 'Invalid credentials.');
            }
            
        } catch (error) {
            console.error('Auth error:', error.response ? error.response.data : error);
            setError('An unexpected error occurred');
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
