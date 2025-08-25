import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component to protect routes that require authentication or block access to specific routes for authenticated users
const ProtectedRoute = ({ children, requireAuth = true }) => {
    const { user, loading, isAuthenticated } = useAuth();

    // If authentication is still loading, show nothing or a loading spinner
    if (loading) {
        return <div>Loading...</div>;
    }

    // If the route requires authentication and user is not authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If the route is for unauthenticated users and user is already authenticated, redirect to home
    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/" />;
    }

    // If the route does not require authentication, or the user is authenticated, render the children
    return children;
};

export default ProtectedRoute;
