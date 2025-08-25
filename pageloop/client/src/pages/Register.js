import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // API base URL - can be moved to environment variable
    const API_URL = 'http://localhost:5001/api/auth/register';

    const validateForm = () => {
        const newErrors = [];

        if (!name.trim()) {
            newErrors.push('Name is required');
        }

        if (!email.trim()) {
            newErrors.push('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.push('Please enter a valid email');
        }

        if (password.length < 6) {
            newErrors.push('Password must be at least 6 characters');
        }

        if (password !== confirmPassword) {
            newErrors.push('Passwords do not match');
        }

        return newErrors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset error states
        setError('');
        setErrors([]);

        // Client-side validation
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            console.log('Sending registration data:', { name, email, password });

            const response = await axios.post(
                API_URL,
                { name, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('Registration response:', response.data);

            // Registration successful
            alert(response.data.message || 'Registration successful!');

            // Store token if needed or handle as required by your app
            localStorage.setItem('token', response.data.token);

            // Redirect to login page
            navigate('/login');

        } catch (err) {
            console.error('Registration error:', err);

            if (err.response) {
                // Server returned an error response
                console.error('Error response:', err.response);

                if (err.response.data.errors) {
                    // Handle validation errors from backend
                    const serverErrors = err.response.data.errors.map(err => err.msg);
                    setErrors(serverErrors);
                } else if (err.response.data.message) {
                    // Handle single error message
                    setError(err.response.data.message);
                } else {
                    // Generic error with status code
                    setError(`Registration failed (${err.response.status})`);
                }
            } else if (err.request) {
                // No response received from server
                console.error('No response received:', err.request);
                setError('No response from server. Please check your connection.');
            } else {
                // Error in request setup
                console.error('Request setup error:', err.message);
                setError('Error: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Create Account</h2>

                {/* Display main error message */}
                {error && <p className="error">{error}</p>}

                {/* Display validation errors */}
                {errors.length > 0 && (
                    <div className="error-list">
                        <ul>
                            {errors.map((err, index) => (
                                <li key={index}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleRegister} className="register-form">
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <p className="register-note">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;