const router = require('express').Router()
const { items, item, createItem, updateItem, deleteItem } = require('../controllers/item')
const idChecker = require('../middleware/idChecker')

router.get('/',items)
router.get('/:id',idChecker,item)
router.post('/',createItem)
router.put('/:id',idChecker,updateItem)
router.delete('/:id',idChecker,deleteItem)

module.exports = router
