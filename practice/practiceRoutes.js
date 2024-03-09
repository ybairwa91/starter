const express = require('express')
const practiceController = require('./practiceController')

const router = express.Router()

router.route('/').get(practiceController.getRequest).post(practiceController.createHttpRequest)
router.route('/:id').get(practiceController.getRequestWithId)
router.route('/update').patch(practiceController.updateRequest)
router.route('/delete').delete(practiceController.deleteRequest)

module.export = router;