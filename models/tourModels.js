const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A Tout must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a diffculty']
    },

    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingQuantity: {
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
});


const Tour = mongoose.model('Tour', tourSchema)


module.exports = Tour;
