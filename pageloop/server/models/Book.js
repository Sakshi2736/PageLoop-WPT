const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    coverImage: { type: String, required: true },
    pdfPath: { type: String, required: true },
    ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: { type: Number, min: 1, max: 5 } }]
});

BookSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / this.ratings.length).toFixed(1);
});

BookSchema.set('toJSON', { virtuals: true });
BookSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Book', BookSchema);



