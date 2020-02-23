const router = require('express').Router()
const { category, categories, createCategory, updateCategory, deleteCategory } = require('../controllers/category')
const idChecker = require('../middleware/idChecker')

router.get('/',categories)
router.get('/:id',idChecker,category)
router.post('/',createCategory)
router.put('/:id',idChecker,updateCategory)
router.delete('/:id',idChecker,deleteCategory)

module.exports = router
