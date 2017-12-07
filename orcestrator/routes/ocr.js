const router = require('express').Router()

const { multer, uploadFile } = require('../helpers/images')
const controller = require('../controllers/ocrController')

router.post('/', multer.single('image'), uploadFile, controller.postOcr)

module.exports = router
