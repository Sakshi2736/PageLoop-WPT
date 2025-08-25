import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/BookList.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/books')
            .then((res) => setBooks(res.data))
            .catch((err) => console.error('Error:', err));
    }, []);

    return (
        <>
            <Header />
            <div className="book-list-container">
                <h1>Explore Books</h1>
                <div className="book-grid">
                    {books.map((book) => (
                        <div className="book-card" key={book._id}>
                            <div className="card-image">
                                <img src={book.coverUrl} alt={book.title} />
                            </div>
                            <div className="card-content">
                                <h2>{book.title}</h2>
                                <p className="author">{book.author}</p>
                                <p className="genre">{book.genre}</p>
                                <p className="rating">⭐ {book.averageRating}</p>
                                <a href={`/book/${book._id}`} className="btn-review">Write a Review</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BookList;
