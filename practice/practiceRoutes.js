const express = require('express');
const practiceController = require('./practiceController');
const router = express.Router();

router
    .route('/')
    .get(getRequest)
    .post(createHttpRequest)
router.
    route('/:id')
    .get(getRequestWithId)
router
    .route('/update')
    .patch(updateRequest)
router
    .route('/delete')
    .delete(deleteRequest)


module.exports = router;