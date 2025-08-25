import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ManageBooksTable.css';

const ManageBooksTable = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', author: '', genre: '', cover: null, pdf: null });
    const [coverPreview, setCoverPreview] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => { fetchBooks(); }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/books');
            setBooks(res.data);
        } catch {
            alert('Failed to fetch books.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await axios.delete(`http://localhost:5001/api/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBooks();
        } catch {
            alert('Failed to delete book.');
        }
    };

    const handleEditClick = (book) => {
        setEditingId(book._id);
        setFormData({ title: book.title, author: book.author, genre: book.genre, cover: null, pdf: null });
        setCoverPreview(`http://localhost:5001/uploads/${book.cover}`);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files?.length) {
            const file = files[0];
            setFormData(prev => ({ ...prev, [name]: file }));
            if (name === 'cover') {
                const reader = new FileReader();
                reader.onloadend = () => setCoverPreview(reader.result);
                reader.readAsDataURL(file);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdate = async (id) => {
        const data = new FormData();
        ['title', 'author', 'genre'].forEach(key => data.append(key, formData[key]));
        if (formData.cover) data.append('cover', formData.cover);
        if (formData.pdf) data.append('pdf', formData.pdf);

        try {
            await axios.put(`http://localhost:5001/api/books/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setEditingId(null);
            setCoverPreview(null);
            fetchBooks();
        } catch {
            alert('Update failed.');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setCoverPreview(null);
    };

    const filteredBooks = books.filter(b =>
        [b.title, b.author, b.genre].some(field => field.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="manage-books-table">
            <h2>Manage Books</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by title, author, genre"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Title</th><th>Author</th><th>Genre</th><th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredBooks.length > 0 ? filteredBooks.map(book => (
                        <tr key={book._id}>
                            {editingId === book._id ? (
                                <>
                                    <td><input type="text" name="title" value={formData.title} onChange={handleInputChange} /></td>
                                    <td><input type="text" name="author" value={formData.author} onChange={handleInputChange} /></td>
                                    <td><input type="text" name="genre" value={formData.genre} onChange={handleInputChange} /></td>
                                    <td>
                                        <input type="file" name="pdf" accept="application/pdf" onChange={handleInputChange} />
                                        <div className="file-notice">Leave empty to keep current PDF</div>
                                    </td>
                                    <td className="action-cell">
                                        <input type="file" name="cover" accept="image/*" onChange={handleInputChange} className="file-input" />
                                        <div className="file-notice">Leave empty to keep current cover</div>
                                        <div className="edit-buttons">
                                            <button className="save-btn" onClick={() => handleUpdate(book._id)}>Save</button>
                                            <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td className="action-cell">
                                        <button className="edit-btn" onClick={() => handleEditClick(book)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    )) : (
                        <tr><td colSpan="5" className="no-books">No books found matching your search</td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBooksTable;
