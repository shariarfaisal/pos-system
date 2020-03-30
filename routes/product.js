const router = require('express').Router()
const { product, items, products, createProduct, updateProduct, deleteProduct } = require('../controllers/product')
const idChecker = require('../middleware/idChecker')

router.get('/category/:id',products)
router.get('/:id',product)
router.get('/:id/items',items)
router.post('/',createProduct)
router.put('/:id',idChecker,updateProduct)
router.delete('/:id',idChecker,deleteProduct)

module.exports = router
