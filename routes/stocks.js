const router = require('express').Router()
const { stocks } = require('../controllers/stocks')

router.get('/:id',stocks)

module.exports = router
