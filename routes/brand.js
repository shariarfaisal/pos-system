const router = require('express').Router()
const {   brands, brand, createBrand, updateBrand, deleteBrand, addProduct } = require('../controllers/brand')
const idChecker = require('../middleware/idChecker')

router.get('/',brands)
router.get('/:id',idChecker,brand)
router.post('/',createBrand)
router.post('/:id/product',addProduct)
router.put('/:id',idChecker,updateBrand)
router.delete('/:id',idChecker,deleteBrand)

module.exports = router
