import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import footerLogo from '../assets/footerlogo.png';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="sub-footer">
                <div className="footer-col">
                    <img src={footerLogo} alt="PageLoop Logo" className="footer-logo" />
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                    <h4>Links</h4>
                    <ul>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Disclaimer</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="/"><FaFacebookF /></a>
                        <a href="/"><FaTwitter /></a>
                        <a href="/"><FaInstagram /></a>
                        <a href="/"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 <strong>PageLoop</strong>. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
