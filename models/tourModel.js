
/* eslint-disable prefer-arrow-callback */
//DEFINING
//bhai ye to tourschema or tour model hogyaa par naye doc banaooge kahaa
//khol le controller file or chalu hojaa application logic likhnee ke liyee
//kyuki database to logic se hi connect hota hai na boss




//VIRTUAL PROPERTIES,MIDDLEWARE-DOC
/*

const mongoose = require('mongoose');
const slugify = require('slugify')

const tourSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true
        },
        slug: {
            type: String
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
        startDates: [Date],
    }
    ,
    //ye bhai schema ka second parameter h jaha bhi hum ek object pass karwa skte h or
    //basically kuch functionalities use kr skte h
    //like virtual enable kiye h


    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// VIRTUAL PROPERTIES
//means ki they are schema that are not actually persist ,they define on our schema but not persist for long
//not saved to database
//its saved some space for us
//deriving ke time helpful h bohot
//get method use krke apan ne ye dikhaadiya ki
//jab bhi database se get krengee it means we take something this virtual property
//will be created then
//but we cant query on virual properties because technically they are not the  schema model properties that wll be available all the time

//durationWeeks naam hai field ka
//or iski value apan ne return karwayi wo h
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7
})

//bhai virtual fields certain situation me hi creates hoti hai
//now look onto the another concept
// MIDDLEWARE
//just like middleware in expressjs here also
//function which are run in btw sending document saving condition and actually saving the doc
// 4 types of middleware
//DOCUMENT MIDDLEWARE
//QUERY MIDDLEWARE
//AGGREGATE MIDDLEWARE
//MODEL MIDDLEWARE

//lets define some
//DOCUMENT MIDDLEWARE:run before .save command and the .create() command
//but not before .insertMany()
//pre-run before an event
//the event is save here as we defined
tourSchema.pre('save', function (next) {
    //this points to currently pointing document
    //matlab ki jo doc apan create kr rhee h wo save hone wali h kisme
    //basically tours collection me
    //par is middleware ke pass just before saving have to powers to manipulate it
    // console.log(this)
    //slug nayi field add on kr rhee h to bro schema me honi chahiye na
    this.slug = slugify(this.name, { lower: true })
    next();
})

tourSchema.pre('save', function (next) {
    console.log('Will save document')
    next();
})

//POST MIDDLEWARE
tourSchema.post('save', function (doc, next) {
    console.log(doc)
    next();
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;
*/

//////////////////////////////////
//QUERY MIDDLWARE
/*
const mongoose = require('mongoose');
const slugify = require('slugify')

const tourSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true
        },
        slug: {
            type: String
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

        images: [String],

        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false
        }

    }
    , {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7
})


tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})

//QUERY MIDDLWARE
//bhai phle argument hi find h to obviously query document h ye

//ye execute nahi hai agar apan ek tour find karne baithengee to
tourSchema.pre(/^find/, function (next) {
    //concept h ye ki apan ek or field banate h secretTour ki and
    //query ke time inko exclude kardengee ..maze ..maze
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now()
    next();
})
// tourSchema.pre('findOne', function (next) {
//     //concept h ye ki apan ek or field banate h secretTour ki and
//     //query ke time inko exclude kardengee ..maze ..maze
//     this.find({ secretTour: { $ne: true } })
//     next();
// })
//run after query executes
tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} miliseconds`);
    console.log(docs);
    next();
})



//ye tour model hai jo ki import karliyaa apnee controller ne
//controller handle karta hai application logic
//matlab core tech part
//means ki request and response handle karnaa controller ke hath me h boss.
const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;

*/



//AGGREGATION MIDDLEWARE
/*
const mongoose = require('mongoose');
const slugify = require('slugify')

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true
        },
        slug: {
            type: String
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

        images: [String],

        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false
        }

    }
    , {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7
})

//this keyword in document middleware points to document
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})


//this keyword in query middleware points to current query
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now()
    next();
})

tourSchema.post(/^find/, function (docs, next) {
    // console.log(`Query took ${Date.now() - this.start} milliseconds`);
    // console.log(docs);
    next();
})

//aggregation middleware
//in aggregation pipeline secretTour is still considering
//so we need to exclude it
//lets use aggregation middleware
//this keyword in aggregation middleware points to current aggregation object
//here with the help of middleware we added a match operator in aggregate function dynamically
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })

    console.log(this);
    // console.log(this.pipeline());
    next()

})




const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;

*/

////////////////////////////////////
//DATA VALIDATION
//checking whether entered values are in right format for each field as per our schema
//and document entered for required field also
//SANITIZATION-means entered data is clean or no malicious code is entered,in that condition we remove unwanted character
//or codes,this is a golden rule for a backend developer to never accept the code or data as it is,we always sanitize
//lets do data validation on this model,and mongoose have a bunch of tool to perform the same




const mongoose = require('mongoose');
const slugify = require('slugify')

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            //required is one data validation tool,available for all data types
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true,
            //length
            maxLength: [40, 'A tour name must have maximum 40 characters or less than 40 characters'],
            minLength: [10, 'A tour name must have minimum 10 characters or equal to 10']

        },
        slug: {
            type: String
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
            required: [true, 'A tour must have a difficulty'],
            //which type of difficulties
            enum: {
                values: ['easy', 'medium', 'difficult'],
                message: "Difficulty is either: easy,medium or difficult"
            }
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            //On numbers ratings limit
            min: [1, 'A rating must be above or equals to 1.0'],
            max: [5, 'A rating must be below or equals to 5.0']

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

        images: [String],

        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false
        }

    }
    , {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7
})


tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})


//this keyword in query middleware points to current query
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now()
    next();
})

tourSchema.post(/^find/, function (docs, next) {
    next();
})

tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
    next()

})




const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;
