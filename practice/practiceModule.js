const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A practice must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A Practice must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A practice must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A practice must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingQuality: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a name"],
        unique: true
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    }
})

const Tour = mongoose.model('Tour', practiceSchema);

module.exports = Tour;