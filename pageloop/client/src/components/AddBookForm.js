import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/AddBookForm.css';

const AddBookForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        cover: null,
        pdf: null,
    });

    const [coverPreview, setCoverPreview] = useState(null);
    const [showPdfPopup, setShowPdfPopup] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    const fileInputRef = useRef(null);
    const pdfInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));

            // Handle cover image preview
            if (name === 'cover') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setCoverPreview(reader.result);
                };
                reader.readAsDataURL(files[0]);
            }

            // Handle PDF preview URL
            if (name === 'pdf') {
                const pdfFile = files[0];
                const url = URL.createObjectURL(pdfFile);
                setPdfUrl(url);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return alert('User not authenticated');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('genre', formData.genre);
        data.append('cover', formData.cover);
        data.append('pdf', formData.pdf);

        try {
            const res = await axios.post('http://localhost:5001/api/books/addbook', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Book added successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Failed to add book');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', author: '', genre: '', cover: null, pdf: null });
        setCoverPreview(null);
        setPdfUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (pdfInputRef.current) pdfInputRef.current.value = '';
    };

    const openPdfPopup = () => {
        if (pdfUrl) {
            setShowPdfPopup(true);
        } else {
            alert('Please upload a PDF file first');
        }
    };

    const closePdfPopup = () => {
        setShowPdfPopup(false);
    };

    return (
        <div className="add-book-form-container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit} className="add-book-form" encType="multipart/form-data">
                <div className="form-columns">
                    <div className="form-left-column">
                        <label>Title:
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </label>
                        <label>Author:
                            <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                        </label>
                        <label>Genre:
                            <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
                        </label>
                        <label>Cover Image:
                            <input
                                type="file"
                                name="cover"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                ref={fileInputRef}
                            />
                        </label>
                        <label>Book PDF:
                            <input
                                type="file"
                                name="pdf"
                                accept="application/pdf"
                                onChange={handleChange}
                                required
                                ref={pdfInputRef}
                            />
                        </label>
                    </div>
                    <div className="form-right-column">
                        {coverPreview && (
                            <div className="cover-preview">
                                <h3>Cover Preview</h3>
                                <img src={coverPreview} alt="Cover preview" />
                            </div>
                        )}
                        {pdfUrl && (
                            <div className="pdf-preview">
                                <h3>PDF Uploaded</h3>
                                <button
                                    type="button"
                                    className="view-pdf-btn"
                                    onClick={openPdfPopup}
                                >
                                    View PDF
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">Add Book</button>
                    <button type="button" className="reset-btn" onClick={resetForm}>Reset</button>
                </div>
            </form>

            {/* PDF Viewer Popup */}
            {showPdfPopup && (
                <div className="pdf-popup-overlay">
                    <div className="pdf-popup">
                        <div className="pdf-popup-header">
                            <h3>PDF Preview</h3>
                            <button className="close-btn" onClick={closePdfPopup}>×</button>
                        </div>
                        <div className="pdf-viewer">
                            <iframe
                                src={pdfUrl}
                                title="PDF Viewer"
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBookForm;