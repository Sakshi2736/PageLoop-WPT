import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // API endpoint for login
    const API_URL = 'http://localhost:5001/api/auth/login';

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset error state
        setError('');
        setLoading(true);

        try {
            console.log('Attempting to log in with:', email);

            const response = await axios.post(
                API_URL,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('Login successful:', response.data);

            // Store user data and token in localStorage or context
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Display success message (optional)
            alert(response.data.message || 'Login successful!');

            // Redirect to home page and force refresh
            navigate('/', { replace: true });
            window.location.reload(); // Refresh the page

        } catch (err) {
            console.error('Login error:', err);

            if (err.response) {
                // Handle different types of errors
                if (err.response.data.errors) {
                    // Validation errors
                    const errorMessages = err.response.data.errors.map(err => err.msg).join(', ');
                    setError(errorMessages);
                } else if (err.response.data.message) {
                    // Single error message
                    setError(err.response.data.message);
                } else {
                    // Generic error
                    setError(`Login failed (${err.response.status})`);
                }
            } else if (err.request) {
                // No response received
                setError('Server did not respond. Please check your connection.');
            } else {
                // Error in request setup
                setError('Error: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back</h2>

                {/* Display error message if any */}
                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="login-note">
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

