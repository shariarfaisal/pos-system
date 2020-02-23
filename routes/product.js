const router = require('express').Router()
const { product, products, createProduct, updateProduct, deleteProduct } = require('../controllers/product')
const idChecker = require('../middleware/idChecker')

router.get('/',products)
router.get('/:id',idChecker,product)
router.post('/',createProduct)
router.put('/:id',idChecker,updateProduct)
router.delete('/:id',idChecker,deleteProduct)

module.exports = router
