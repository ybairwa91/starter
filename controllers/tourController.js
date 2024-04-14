//Before mvc
/*
//Before Mvc architecture and mongoDB
const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};
*/

//mongoose basics methods
/*

//////////////////////////////
//lets use mongoDb
const fs = require('fs')

//ye basically model import kiya hai or saying kind a Tour class ab iske basis pe document create honge
//jis naam ka model create karengee usi naam ka collection create ho jayega apne database me
//yaad rakhnaa mongoDB store collection name in lowercase so Tour jo yaha pe collection name h tour se save hogaa

const Tour = require('../models/tourModel');
//ye Tour model hai or model se hi apan bohot sareee doc create krngee dekhna
//by using multiple queries

//How to create new Document in Database

exports.createTour = async (req, res) => {

    //create ke liyee method in mongoDB
    //collectionName.insertOne()
    //collectionName.insertMany()

    //Create a new tour logic here,with the help of data come from requested body
    //1st.method) first created a doc from tour models and then used save method
    //return promise
    // const newTours = new Tour({})
    // newTours.save()

    ////More easier way
    //here directly using create method on Tour model
    //also return promise

    // Tour.create().then()

    //const newTour=Tour.create(req.body).then(data)

    //better is to use async await now
    //yaad rakhnaa ye jo bhi saree Methods h mongoose me on model all return promises and they provide queries in promise
    //and queries are object in mongoose so chaining dikh jayee to normal h
    //mongoose tried to make as close as js as possible
    const newTour = await Tour.create(req.body)

    //now stored object in newTour

    //lets follow jsend to send reponse
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    })
}

//HANDLE ERRORS AS WELL SINCE NOW ITS ASYNCHRONOUS GAME
exports.createTour = async (req, res) => {
    try {
        //mongodb--db.tour.insertMany({},{},{})
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',

            data: {
                tour: newTour
            }
        })

    } catch (err) {
        //yaad kar wo required field jisme true kiya h or err msz dala h wo sab yaha ayenge dost
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


////////////////////////////////////////////////////
//READING DOCUMENT WITH MONGOOSE

exports.getAllTours = async (req, res) => {

    //Tour model hai jo tourSchema se banaya hai
    //check compass or atlas waha pe jo data h tour collection it will be fetched here bro
    //or async banado function ko kyuki bhai promise dega ye Tour.find() to
    //mongodb me kaise hota thaa using find() method

    try {
        //in mongodb=db.tour.find({})//using projection
        const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.send(404).json({
            status: 'Failed',
            message: err
        })
    }
};


/////////////////////////
//Finding specific tour

exports.getTour = async (req, res) => {

    try {


        //mongo-Tour.findOne({ _id:req.params.id })
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}

///////////////////////////////////
///UPDATING TOUR HANDLER


exports.updateTour = async (req, res) => {
    try {
        //update krna hai phle ye dekhnaa hoga ki konsa element h uski id ke through query krenge bro
        //fir update krdengee
        //phla argument for query,second argument for the body should be there and third argu also
        // there to use some options
        //basically new:true means return the new one jo hi chahiye hamee
        //these query basically update the field after comparing and not completely replace it,
        //so put request doesnot work for this query
        //well patch is more useful rather than put in real life.

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

////////////////////////////////////////
///deleting document

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

*/

//////////////////////////////////////////////////

//querying
/*
///QUERY STRING GAME

const fs = require('fs')
const Tour = require('../models/tourModel');
const { query } = require('express');

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',

            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}




// exports.getAllTours = async (req, res) => {
//     try {

//         //req.query give us nicely formated object with the data
//         // console.log(req.query);

//         //GET ALL TOURS WITHOUT ANY QUERY
//         // const tours = await Tour.find();

//         //GET ALL TOURS BUT WITH FILTERING THROUGH PASSING Queries
//         // const tours = await Tour.find({
//         //     duration: 5,
//         //     difficulty: 'easy'
//         // })

//         //Another way[dynamic depends on your url]
//         // const tours = await Tour.find(req.query)

//         //Another way
//         //special mongoose methods
//         // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')

//         ///////////////////////////////////
//         //issues with these all are what if we have a url which have other parameters then what to do
//         //so we need to exclude this fields from out accessing query methods lets see how


//         //Handle it in better way
//         //step1.make a copy of request url query and remove them
//         const queryObj = { ...req.query }
//         //array of wanting to exclude fields
//         const excludedFields = ['page', 'sort', 'limit', 'fields']
//         //Foreach change original array
//         excludedFields.forEach(el => delete queryObj[el]);

//         console.log(req.query, queryObj)


//         //thoda filter out krdiya to ab apan queryObj use krenge
//         const tours = await Tour.find(queryObj)

//         res.status(200).json({
//             status: 'success',
//             results: tours.length,
//             data: {
//                 tours
//             }
//         });
//     } catch (err) {
//         res.send(404).json({
//             status: 'Failed',
//             message: err
//         })
//     }
// };



exports.getAllTours = async (req, res) => {
    try {

        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el]);
        console.log(req.query, queryObj)
        //basically all these methods return queries
        //and queries are itself objects in mongoose thats why we can chaining methods
        // const tours = await Tour.find(queryObj)

        ////////////////////////////
        //bhai apan Tour.find ek query return karwayega to usko store krte h phle fir baad me await krwayngee
        //1st We build the query
        const query = Tour.find()

        //2.EXECUTE THE QUERY
        const tours = await query;


        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.send(404).json({
            status: 'Failed',
            message: err
        })
    }
};


exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

////////////////////////////////////////////////////

//MORE COMPLEX QUERY
//handling lte,gte,gt,lt

const fs = require('fs')
const Tour = require('../models/tourModel');


exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',

            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}




exports.getAllTours = async (req, res) => {
    try {
        console.log(req.query)

        // 1) Build Query
        //Filtering
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el]);


        // 2) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))


        //COMPLEX QUERIES WE PERFORMING NOW
        //in mongoDB native
        //{difficulty:'easy',duration:{ $gte : 5}}
        //what req.query gave us after query for same is
        //{ difficulty: "'easy'", duration: { gte: '5' } }
        //gte,gt,lte,lt

        //bhai apan ne req.query use ki phlee
        //fir thoda execution krke queryObj banaya jo exclude krdeta h kuch chizo ko taki error na aye
        //ab apan se or queries jo ki less than or greater than wali h unko bhi handle kiyaa hai
        //to pass krengee queryStr

        const query = Tour.find(JSON.parse(queryStr));



        //EXECUTE QUERY
        const tours = await query;
        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.send(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

*/

//////////////////////////////////////////////////////////////////////

/*
// SORTING

const fs = require('fs')
const Tour = require('../models/tourModel');


exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',

            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.getAllTours = async (req, res) => {
    try {

        console.log(req.query)

        // 1) FILTERING
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);



        // 2) ADVANCE FILTERING
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))

        let query = Tour.find(JSON.parse(queryStr));


        // 3) SORTING
        //request is
        // [http://127.0.0.1:3000/api/v1/tours?sort=price]
        // [http://127.0.0.1:3000/api/v1/tours?sort=-price]
        // [http://127.0.0.1:3000/api/v1/tours?sort=ratingsAverage,price]
        //response
        
        //its simple as u can see

        //Only single field sorting
        // if (req.query.sort) {
        //     // query = query.sort('price')
        //     query = query.sort(req.query.sort)
        // }

        // more than one field sorting
        if (req.query.sort) {
            // query = query.sort('price ratingAverage')
            //now from req.query we are geeting { sort: '-price,ratingAverage' } this
            //let manipulate { sort: '-price,ratingAverage' } this to achieve 'price ratingAverage' this
            //how es6
            const sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy)
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }


        //EXECUTE QUERY
        const tours = await query;
        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.send(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};


*/

/////////////////////////////////////////////////////////////////////////////////

/*
//LIMITING FIELDS
//To allow client to choose which field they want back
//its always better for a client to receive as little data as possible to reduce bandwidth at each request
const fs = require('fs')
const Tour = require('../models/tourModel');


exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',

            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.getAllTours = async (req, res) => {
    try {

        console.log(req.query)

        // 1) FILTERING
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2) ADVANCE FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))

        let query = Tour.find(JSON.parse(queryStr));

        // 3) SORTING
        if (req.query.sort) {

            const sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy)
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // 4) FIELD LIMITING
        //we can do projection from schema as well.
        //means things like password should never be seen to client
        //request is
        //[http://127.0.0.1:3000/api/v1/tours?fields=name,duration,price]
        //[http://127.0.0.1:3000/api/v1/tours?fields=name,-duration,price]
        //we call it projection since we provide response by providing only chosen field
        // use select in that model and put false

        if (req.query.fields) {
            //so using select method we can achieve
            //and passing arguments hard coded
            // query = query.select('name difficulty price')
            //lets check what req.param provide us if we request through url
            // { fields: 'name,duration,price' }
            //so we need to convert { fields: 'name,duration,price' }  to 'name difficulty price'
            //lets ES6
            const fields = req.query.fields.split(',').join(' ');
            // console.log(projection)
            query = query.select(fields)

        } else {
            // - in select parameter doesnot include v field
            query = query.select('-__v')
        }





        //EXECUTE QUERY
        const tours = await query;




        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.send(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};


*/
////////////////////////////////////////////////////

/*
//PAGINATION
//1000 document in a collection
//on each page we have 100 document
//means having 10 pages
//now do certain actions on pages called pagination

const fs = require('fs')
const Tour = require('../models/tourModel');


exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',

            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.getAllTours = async (req, res) => {
    try {

        console.log(req.query)

        // 1) FILTERING
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2) ADVANCE FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))

        let query = Tour.find(JSON.parse(queryStr));

        // 3) SORTING
        if (req.query.sort) {

            const sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy)
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // 4) FIELD LIMITING
        if (req.query.fields) {

            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)

        } else {
            query = query.select('-__v')
        }

        // 5) PAGINATION
        //[http://127.0.0.1:3000/api/v1/tours?page=2&limit=10]
        //url means on page 1 we have 1-10 results and next 11-20 results are on next page 2 so we have to skip 10 results
        // query = query.skip(10).limit(10)
        //if
        // //[http://127.0.0.1:3000/api/v1/tours?page=3&limit=10]
        // //url means on page 1 we have 1-10 results and next 11-20 results are on next page 2 so we have to skip 20 results for page 3
        // query = query.skip(20).limit(10)


        //we always default pagination whether user ask for it or not
        //lets consider for one page and 100 results
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        // const skip=(page number-1)*limit
        const skip = (page - 1) * limit

        query = query.skip(skip).limit(limit)


        //handle error means if page is not there
        if (req.query.page) {
            const numTours = await Tour.countDocuments()
            if (skip >= numTours) throw new Error('The page does not exist')
        }

        //EXECUTE QUERY
        const tours = await query;
        //query.sort().select().skip().limit()


        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.send(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};


*/
//////////////////////////////////////

/*
//ALIASING
//REFRACTORING
//how to
//create a class and one feature for each api
//purpose is to create resusuable modules


const fs = require('fs')
const Tour = require('../models/tourModel');

//CREATE aliasTopTour middleware here
exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

class APIFeatures {

    //yaha bhai req.query ko apan ne parameter leke object creation ke time pas karwayenge
    //matlab ki this.queryString=req.query jo url hai client ne manga h response ke liye
    //or first argument query ka wo query object h
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString }
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        //bhai page me doc nhi h wo iske bina show hoga
        //ye koi error nhi h no need of it
        // if (this.queryString.page) {
        //     const numTours = await Tour.countDocuments()
        //     if (skip >= numTours) throw new Error('The page does not exist')
        // }
        return this;
    }



}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',

            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.getAllTours = async (req, res) => {

    try {

        console.log(req.query)

        // 1) FILTERING
        // const queryObj = { ...req.query }
        // const excludedFields = ['page', 'sort', 'limit', 'fields'];
        // excludedFields.forEach(el => delete queryObj[el]);

        // // 2) ADVANCE FILTERING
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        // let query = Tour.find(JSON.parse(queryStr));

        // // 3) SORTING
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' ')
        //     query = query.sort(sortBy)
        // } else {
        //     query = query.sort('-createdAt')
        // }

        // // 4) FIELD LIMITING
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields)
        // } else {
        //     query = query.select('-__v')
        // }

        // 5) PAGINATION
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit
        // query = query.skip(skip).limit(limit)
        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments()
        //     if (skip >= numTours) throw new Error('The page does not exist')
        // }

        // 6) ALIASING
        //here task is solve some unconventional url request
        //lets take a task of finding top 5 cheap tour places

        //how to do that
        // 1) first create a specific route for it in tourRoutes


        //EXECUTE QUERY
        const features = new APIFeatures(Tour.find(), req.query()).filter().sort().limitFields().paginate()

        const tours = await features.query.exec();


        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};


*/

///////////////////////////////////////////////////////////////////////

/*
Final version

const fs = require('fs')
const Tour = require('../models/tourModel');


exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}


class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.getAllTours = async (req, res) => {
    try {
        const features =
            new APIFeatures(Tour.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate()

        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

*/
//////////////////////////////////
//PUT INTO ANOTHER FILE

//AGGREGATION PIPELINE
//a mongoDB library for data aggregation
//idea is to process all collection process step by step in order to transform into get desired aggregate result

/*
const fs = require('fs')
const APIFeatures = require('../utils/APIFeatures')
const Tour = require('../models/tourModel');
const { match } = require('assert');


exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}




exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}


exports.getAllTours = async (req, res) => {
    try {
        const features =
            new APIFeatures(Tour.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate()

        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}



exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour,
                runValidators: true
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};



exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

//for aggregation pipeline
exports.getTourStats = async (req, res) => {
    try {
        //aggregation pipeline is mongoDB feature but yes we can use through mongoose driver as well
        //we can basically use multiple steps in aggregate and do have multiple stages
        //and all the collection pass from these stages one by one
        const stats = await Tour.aggregate([
            //lets define some stages
            //each stages define in object
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            //group stage,basically helps to group documents together using accumulator
            
//             {
//                 $group: {
//                     //here we are doing operation by only one group which is whole collection document
//                     _id: null,
//                     //here we creating a new field called avgRating and then specify the operation on which field of document and the 
//                     //operations to be performed
//                     numRatings: { $sum: '$ratingsQuantity' },
//                     numTours: { $sum: 1 },
//                     avgRating: { $avg: '$ratingsAverage' },
//                     avgPrice: { $avg: '$price' },
//                     minPrice: { $min: '$price' },
//                     maxPrice: { $max: '$price' },
//                 }
//             }
            

//  {
//      $group: {
//          //here we are doing operation by only one group which is whole collection document
//          _id: '$difficulty',
//          //here we creating a new field called avgRating and then specify the operation on which field of document and the operations to be performed
//          numRatings: { $sum: '$ratingsQuantity' },
//          numTours: { $sum: 1 },
//          avgRating: { $avg: '$ratingsAverage' },
//          avgPrice: { $avg: '$price' },
//          minPrice: { $min: '$price' },
//          maxPrice: { $max: '$price' },
//      }
//      //iska mtlab h ki apan difficulty level ke hisab se grouping kar denge
//      //matlab ki easy wale alag,medium wala alag or hard wale alag
//  }
 

{
    $group: {

        // _id: '$ratingsAverage',
        _id: { $toUpper: '$difficulty' },

        numRatings: { $sum: '$ratingsQuantity' },
        numTours: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
    }

},
//ye sort basically ye jo upar walee results h unko legaa or sort krdenaa in ascending order of avgPrice
{
    $sort: { avgPrice: 1 }
},
            //ab hum is pipeline se doc lengee or firse match karwangee and include karengee except EASY one
            // {
            //     $match: { _id: { $ne: 'EASY' } }
            // }


        ])
//is upar ke masle ka matlab yahi h ki match karo wo doc jinki rating 4.5  ya usse greater ho fir unko ek group me dalo bade se me
//or unke avg wageraa nikaal ke bhejdo client ko ...maze maze
res.status(200).json({
    status: 'success',
    data: {
        stats
    }
});
    } catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })

}
}

*/

/////////////////////////////////////////

//AGGREGATION PIPELINE:UNWINDING AND PROJECTION
/*


const APIFeatures = require('../utils/APIFeatures')
const Tour = require('../models/tourModel');

exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        })
    }
}

exports.getAllTours = async (req, res) => {
    try {

        const features =
            new APIFeatures(Tour.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate()

        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failed',
            message: err
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findOneAndUpdate(req.params.id, req.body, { new: true }, { runValidators: true })
        res.status(200).json({
            status: 'success',
            data: {
                // tour: tour, Thanks to ES6
                tour
                //ye isliye ki data validation should be true while performing updateTour as well
                //bhai validation work tabhi karega jab findOneAndUpdate use kregaa and uske parameter me {runValidatours:true} kregea
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getTourStats = async (req, res) => {

    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } },
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ])
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })

    }
}

exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1; //2021

        const plan = await Tour.aggregate([
            //ye unwind startDates me 3 array hai sab array ko alag kr krke new doc banadegaa

            {
                $unwind: '$startDates'
            },
            //ye match kareagee ki startDates me 2021 wale hi doc h na bus
            {
                $match: {
                    startDates:
                    {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                },
            },
            {
                $addFields: { months: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numTourStarts: -1 }
            },
            {
                $limit: 12
            }

        ])

        res.status(200).json({
            status: 'success',
            data: {
                plan
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////

// TOPIC-ERROR HANDLING
/*

//till now we are using try and catch to error handling while sending reponse to client
//when this is more of a general way to handle errors in async and await method but in specific expressjs
//we need to be more and more focus
//duplication is one such issue here
//take help of function here
//we handled try and catch of createTour here in this exercise how check it by urself

const APIFeatures = require('../utils/APIFeatures');
const Tour = require('../models/tourModel');
//Import catchAsync
const catchAsync=require('../utils/catchAsync')


exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};


//send to utility folder and import it
// const catchAsync = (fn) => (req, res, next) => {
// //   fn(req, res, next).catch((err) => next(err));
//   fn(req, res, next).catch(next);
// };
  
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });

  //   try {
  //     // const newTour = await Tour.create(req.body);

  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     tour: newTour,
  //   },
  // });
  //   } catch (err) {
  //     res.status(400).json({
  //       status: 'Failed',
  //       message: err,
  //     });
  //   }
});

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      { runValidators: true },
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; //2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },

      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { months: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};



*/

////////////////////////////////////////////////////////////////////////////////////

//DO SAME FOR ALL NOW

const APIFeatures = require('../utils/APIFeatures');
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOneAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    { runValidators: true },
  );

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; //2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },

    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { months: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
