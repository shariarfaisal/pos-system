const router = require('express').Router()
const { items, item, createItem, updateItem, deleteItem, itemsWithBrand } = require('../controllers/item')
const idChecker = require('../middleware/idChecker')

router.get('/:id/product',idChecker,items)
router.get('/:brandId/brand',itemsWithBrand)
router.get('/:id',idChecker,item)
router.post('/',createItem)
router.put('/:id',idChecker,updateItem)
router.delete('/:id',idChecker,deleteItem)

module.exports = router
