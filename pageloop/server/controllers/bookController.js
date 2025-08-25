const Book = require('../models/Book');
const fs = require('fs');

// Add or Update Book
exports.addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    const coverImage = req.files?.cover?.[0]?.filename; // Ensure file exists before trying to get the filename
    const pdfPath = req.files?.pdf?.[0]?.filename; // Ensure file exists before trying to get the filename

    try {
        const book = await Book.create({ title, author, genre, coverImage, pdfPath });
        res.status(201).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        const result = books.map(book => ({
            _id: book._id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            coverUrl: `${req.protocol}://${req.get('host')}/uploads/${book.coverImage}`,
            pdfViewer: `${req.protocol}://${req.get('host')}/uploads/${book.pdfPath}#toolbar=0`
        }));
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json({
            ...book._doc,
            coverUrl: `${req.protocol}://${req.get('host')}/uploads/${book.coverImage}`,
            pdfViewer: `${req.protocol}://${req.get('host')}/uploads/${book.pdfPath}#toolbar=0`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Book
exports.updateBook = async (req, res) => {
    const { title, author, genre } = req.body;
    const updated = { title, author, genre };

    if (req.files?.cover) updated.coverImage = req.files.cover[0].filename;
    if (req.files?.pdf) updated.pdfPath = req.files.pdf[0].filename;

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, updated, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const coverPath = `./uploads/${book.coverImage}`;
        const pdfPath = `./uploads/${book.pdfPath}`;

        // Deleting the uploaded files from the server
        fs.unlinkSync(coverPath);
        fs.unlinkSync(pdfPath);

        await book.deleteOne();
        res.json({ message: 'Book and files deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
