// src/pages/Home.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // Add your search logic or API call here
    };

    return (
        <>
            <Header />
            <div className="home">
                <h1>Welcome to PageLoop</h1>
                <p>Read & Rate for Trending Books Online</p>
                <div className="search-container">
                    <form className="search-form" onSubmit={handleSearch}>
                        <div className="search-input-container">
                            <input
                                type="text"
                                placeholder="Search Book Here..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-button">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;

