const router = require('express').Router()
const { subItems, subItem, createSubItem, updateSubItem, deleteSubItem } = require('../controllers/subItem')
const idChecker = require('../middleware/idChecker')

router.get('/:id/item',idChecker,subItems)
router.get('/:id',idChecker,subItem)
router.post('/',createSubItem)
router.put('/:id',idChecker,updateSubItem)
router.delete('/:id',idChecker,deleteSubItem)

module.exports = router
