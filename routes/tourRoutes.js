/*
//since using express so must import in evry file wherever using
const express = require('express');
//it our own module we are using
const tourController = require('../controllers/tourController');


// const router = express.Router(); creates an instance of an Express router.
// Routers allow you to define routes and their associated handlers separately from the main application.
//earlier we use app.route(....) but router is an instance of express router which also same as app method but its more cleaner and efficient
const router = express.Router();
// router.param('id', tourController.checkId)


router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;
*/
////////////////////////////////////////////////////

const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();


router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);
router.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;