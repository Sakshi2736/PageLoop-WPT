import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Contacts.css';

const Contacts = () => {
    const [message, setMessage] = useState({ name: '', email: '', msg: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Message sent:', message);
        setMessage({ name: '', email: '', msg: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <>
            <Header />
            <main className="contact-container">
                <div className="contact-box">
                    <div className="contact-left">
                        <h2>Contact Us</h2>
                        <p>Have questions? We're here to help. Fill out the form or reach us through the details below.</p>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" name="name" value={message.name} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" name="email" value={message.email} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Message</label>
                                <textarea name="msg" value={message.msg} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="contact-button">Send Message</button>
                            {submitted && <span className="contact-success">Message sent successfully!</span>}
                        </form>
                    </div>
                    <div className="contact-right">
                        <h3>Contact Information</h3>
                        <p><strong>Email:</strong> support@pageloop.com</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                        <p><strong>Address:</strong> Kharghar, Mumbai, Maharashtra, India</p>
                        <div className="map-container">
                            <iframe
                                title="AITCAL Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.887553087124!2d73.06428241490118!3d19.062229387097264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9b0ea8c827f%3A0x7c9f8aefdd2ccf65!2sKharghar%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1683801506576!5m2!1sen!2sin"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: "12px", marginTop: "1rem" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Contacts;

