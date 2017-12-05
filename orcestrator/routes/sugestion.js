const router = require('express').Router()
const sugestionController = require('../controllers/sugestion')

router.post('/', sugestionController.shopSuggestion)

module.exports = router
