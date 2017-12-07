const router = require('express').Router()
const transactionsController = require('../controllers/transactions')

router.post('/', transactionsController.addData)

router.get('/', transactionsController.findAll)

router.get('/byuser/:userId', transactionsController.findByUser)

router.get('/detail/:transactionId', transactionsController.findDetail)

router.put('/:transactionId', transactionsController.changeData)

router.delete('/:transactionId', transactionsController.deleteData)


module.exports = router
