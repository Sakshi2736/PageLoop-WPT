import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Feedback.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', feedback);
        setSubmitted(true);
        setFeedback('');
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <>
            <Header />
            <main className="feedback-container">
                <div className="feedback-box">
                    <h2 className="feedback-title">Share Your Experience</h2>
                    <form className="feedback-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <textarea
                                placeholder="Your feedback about PageLoop..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="feedback-button">Submit Feedback</button>
                        {submitted && <span className="success-message">Thank you for your feedback!</span>}
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Feedback;
