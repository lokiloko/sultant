const router = require('express').Router()
const controller = require('../controllers/userController')

router.get('/', controller.findAll)

router.post('/', controller.insert)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router
