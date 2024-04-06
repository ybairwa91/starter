
/*
//Before Mvc architcure and mongoDB
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

/*

//////////////////////////////
//lets use mongoDb
const fs = require('fs')
const Tour = require('../models/tourModel');


//How to create new Document in Database

exports.createTour = async (req, res) => {

    //Create a new tour logic here,with the help of data come from requested body
    //1st.method) first created a doc from tour models and then used save method
    //return promise
    // const newTours = new Tour({})
    // newTours.save()

    ////More easier way
    //here directly using create method on Tour model
    //also return promise

    // Tour.create().then()

    //better is to use async await now
    const newTour = await Tour.create(req.body)

    //now stored object in newTour

    //lets follow jsend to send reponse
    res.status(201).json({
        status: 'successs',
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
        //phla argument for query,second argument for the body should be there and third argu also there to use some options
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

//         //req.qury give us nicely formated object with the data
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
        if (req.query.sort) {
            query = query.sort(req.query.sort);
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