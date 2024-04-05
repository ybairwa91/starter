
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

//////////////////////////////
//lets use mongoDb
const fs = require('fs')
const Tour = require('../models/tourModel');


/*
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
*/

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