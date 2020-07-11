const router = require('express').Router()
const { items, item, createItem, updateItem, deleteItem, itemsWithBrand, updateItemName, itemsWithBrandAndProduct } = require('../controllers/item')
const idChecker = require('../middleware/idChecker')

router.get('/:id/product',idChecker,items)
router.get('/:brandId/brand',itemsWithBrand)
router.get('/:brandId/:productId/bandp',itemsWithBrandAndProduct)
router.get('/:id',idChecker,item)
router.post('/',createItem)
router.put('/:id',idChecker,updateItem)
router.put('/:id/name',idChecker,updateItemName)
router.delete('/:id',idChecker,deleteItem)

module.exports = router
