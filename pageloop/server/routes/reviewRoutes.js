const express = require('express');
const { addOrUpdateReview, getReviewsByBook } = require('../controllers/reviewController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Add or Update Review Route
router.post('/', auth, addOrUpdateReview);

// Get Reviews by Book Route
router.get('/:bookId', getReviewsByBook);

module.exports = router;


