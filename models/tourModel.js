const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true
        },
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration']
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a group Size']

        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a difficulty']
        },
        ratingsAverage: {
            type: Number,
            default: 4.5
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
            unique: false
        },
        priceDiscount: Number,
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a summary']
        },
        description: {
            type: String,
            trim: true,

        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have a cover image']
        },
        //bhai ke nayi chiz batau
        //lets say bohot  sari images store krni h to ab kya kreee 
        //lets  pass [string] means passing array and type is String
        images: [String],
        //createdAt basically a timestamp that is set by the time that the user gets a new tour
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        startDate: [Date]
    }
);




const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;

//bhai ye to tourschema or tour model hogyaa par naye doc banaooge kahaa
//khol le controller file or chalu hojaa application logic likhnee ke liyee
//kyuki database to logic se hi connect hota hai na boss