

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create the context
const AuthContext = createContext(null);

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth()
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is already logged in on app load
    useEffect(() => {
        const checkLoggedIn = () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                // Set the auth token for all future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(storedUser));
            }

            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post(
                'http://localhost:5001/api/auth/login',
                { email, password }
            );

            const { token, user } = response.data;

            // Store user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Set auth header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Update state
            setUser(user);

            return { success: true, message: response.data.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // Logout function
    const logout = () => {
        // Remove user data from storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Remove auth header
        delete axios.defaults.headers.common['Authorization'];

        // Update state
        setUser(null);

        // Redirect to home
        navigate('/');
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            const response = await axios.post(
                'http://localhost:5001/api/auth/register',
                { name, email, password }
            );

            return { success: true, message: response.data.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
                errors: error.response?.data?.errors
            };
        }
    };

    // Context value
    const value = {
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;