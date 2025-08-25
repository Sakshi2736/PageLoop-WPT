const express = require('express');
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const upload = require('../middlewares/upload');  // File upload middleware

const router = express.Router();

// Add Book Route
router.post('/addbook', upload, addBook);

// Get All Books Route
router.get('/', getBooks);

// Get Book by ID Route
router.get('/:id', getBookById);

// Update Book Route
router.put('/:id', upload, updateBook);

// Delete Book Route
router.delete('/:id', deleteBook);

module.exports = router;
