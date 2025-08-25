import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import your components
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import BookList from "./pages/BookList";
import Feedback from "./pages/Feedback";
import Contacts from "./pages/Contacts";
import AboutUs from "./pages/AboutUs";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/booklist" element={<BookList />} />
                    <Route path="/contact" element={<Contacts />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/aboutus" element={<AboutUs />} />


                    {/* Auth routes */}
                    <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
                    <Route path="/register" element={<ProtectedRoute requireAuth={false}><Register /></ProtectedRoute>} />

                    {/* Protected routes */}
                    <Route path="/admin" element={<ProtectedRoute requireAuth={true}><AdminDashboard /></ProtectedRoute>} />

                    {/* Redirect unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
