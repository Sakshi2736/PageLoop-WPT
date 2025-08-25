const Review = require('../models/Review');
const Book = require('../models/Book');

// Add or Update Review
exports.addOrUpdateReview = async (req, res) => {
    const { bookId, review, rating } = req.body;
    const userId = req.user.id;

    try {
        const updated = await Review.findOneAndUpdate(
            { bookId, userId },
            { review, rating },
            { new: true, upsert: true }
        );

        const reviews = await Review.find({ bookId });
        const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

        await Book.findByIdAndUpdate(bookId, {
            $set: { ratings: reviews.map(r => ({ userId: r.userId, rating: r.rating })) }
        });

        res.json({ review: updated, averageRating: avg.toFixed(1) });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Reviews by Book
exports.getReviewsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({ bookId }).populate('userId', 'name email');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

