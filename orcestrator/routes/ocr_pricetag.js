const router = require('express').Router()
const controller = require('../controllers/ocr_pricetag')

router.post('/', controller.ocrGoogleVision)


module.exports = router
