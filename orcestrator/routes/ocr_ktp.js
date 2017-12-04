const router = require('express').Router()
const controller = require('../controllers/ocr_ktp')

router.post('/', controller.ocrKtp)


module.exports = router
