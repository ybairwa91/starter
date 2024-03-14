const fs = require('fs');
const Tour = require('../models/tourModels')


// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = async (req, res) => {
    // console.log(req.requestTime);
    try {

        const tours = await Tour.find();
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }
}
exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }
}
exports.createTour = async (req, res) => {
    try {

        // const newTour = new Tour({})
        // newTour.save()

        const newTour = await Tour.create(req.body);



        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        })
    } catch (err) {

        res.status(400).json({
            status: "Failed",
            message: "Invalid data sent!"
        })
    }
}
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here....>',
        },
    });
}
exports.deleteTour = (req, res) => {
    // if (req.params.id * 1 > tours.length) {
    //     return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    // }
    res.status(204).json({
        status: 'success',
        data: null,
    });
}