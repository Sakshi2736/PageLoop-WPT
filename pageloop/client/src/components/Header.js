import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';
import logo from '../assets/pageloop.png';

const Header = () => {
    const { user, logout, isAdmin } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(window.scrollY > 10);

    // Handle scroll effect with debounce for better performance
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setScrolled(window.scrollY > 10);
            }, 50); // 50ms debounce
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    // Handle click outside to close dropdown - memoized for performance
    const handleClickOutside = useCallback((event) => {
        if (dropdownVisible && !event.target.closest('.profile-container')) {
            setDropdownVisible(false);
        }
    }, [dropdownVisible]);

    useEffect(() => {
        if (dropdownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dropdownVisible, handleClickOutside]);

    // Toggle dropdown with memoization
    const toggleDropdown = useCallback(() => {
        setDropdownVisible(prev => !prev);
    }, []);

    // Toggle mobile menu with memoization
    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(prev => !prev);
    }, []);

    // Handle logout with memoization
    const handleLogout = useCallback(() => {
        logout();
        setDropdownVisible(false);
    }, [logout]);

    // Memoize menu close handler
    const closeMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    // Memoize dropdown close handler
    const closeDropdown = useCallback(() => {
        setDropdownVisible(false);
    }, []);

    // Memoize navigation links for performance
    const NavLinks = memo(() => (
        <ul className="nav-links">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/booklist" onClick={closeMenu}>BookList</Link></li>
            <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contacts</Link></li>
            <li><Link to="/feedback" onClick={closeMenu}>Feedback</Link></li>
        </ul>
    ));

    // Memoize dropdown menu content
    const DropdownMenu = memo(() => {
        if (!dropdownVisible) return null;

        return (
            <div className="dropdown-menu">
                <div className="dropdown-header">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>
                    Profile
                </Link>
                <Link to="/settings" className="dropdown-item" onClick={closeDropdown}>
                    Settings
                </Link>

                {isAdmin && (
                    <Link to="/admin" className="dropdown-item" onClick={closeDropdown}>
                        Admin Dashboard
                    </Link>
                )}

                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        );
    });

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="PageLoop Logo" className="logo" />
                </Link>
                <div className="hamburger-menu" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className={`header-center ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <nav>
                    <NavLinks />
                </nav>
            </div>

            <div className={`header-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                {user ? (
                    <div className="profile-container">
                        <div className="profile-wrapper" onClick={toggleDropdown}>
                            <img
                                src={`https://www.gravatar.com/avatar/${user.emailHash}?d=mp`}
                                alt="Profile"
                                className="profile-icon"
                                loading="lazy"
                            />
                            <span className="profile-name">{user.name}</span>
                        </div>
                        <DropdownMenu />
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="login-button" onClick={closeMenu}>
                            Login
                        </Link>
                        <Link to="/register" className="register-button" onClick={closeMenu}>
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default React.memo(Header);
