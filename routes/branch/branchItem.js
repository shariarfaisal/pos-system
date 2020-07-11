const router = require('express').Router()
const {
  branchItems,
  branchItem,
  setItem,
  setSubItem,
  removeItem,
  removeSubItem
} = require('../../controllers/branch/branchItem')
const branchAuth = require('../../middleware/branchAuth')

router.get('/',branchAuth,branchItems)
router.get('/:itemId',branchAuth,branchItem)
router.post('/',branchAuth,setItem)
router.post('/:itemId',branchAuth,setSubItem)
router.delete('/:id',branchAuth,removeItem)
router.delete('/:itemId/:subId',branchAuth,removeSubItem)


module.exports = router
