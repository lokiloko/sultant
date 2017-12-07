const router = require('express').Router()
// const controller = require('../controllers/userController')
const controller = require('../controllers/users')

router.get('/', controller.findAll)

router.get('/:id', controller.findDetail)


router.post('/', controller.insert)
//
// router.post('/login', controller.login)
//
router.put('/:id', controller.update)
//
router.delete('/:id', controller.delete)

module.exports = router
