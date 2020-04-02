const router = require('express').Router()
const branchAuth = require('../middleware/branchAuth')
const employeeAuth = require('../middleware/employeeAuth')
const {
  branchRequests,
  requests,
  request,
  createRequest,
  sendRequest,
  cancelRequest,
  removeRequest,
  addItemToRequest,
  addSubItemToRequest,
  removeItem,
  removeSubItem
} = require('../controllers/exportRequest')


router.get('/',employeeAuth,requests)
router.get('/branch',branchAuth,branchRequests)
router.get('/:requestId',request)
router.post('/',branchAuth,createRequest)
router.post('/:requestId/item',branchAuth,addItemToRequest)
router.post('/:requestId/:itemId/subItem',branchAuth,addSubItemToRequest)
router.put('/:requestId/send',branchAuth,sendRequest)
router.put('/:requestId/cancel',branchAuth,cancelRequest)
router.delete('/:requestId',branchAuth,removeRequest)
router.delete('/:requestId/:itemId',branchAuth,removeItem)
router.delete('/:requestId/:itemId/:subItemId',branchAuth,removeSubItem)

module.exports = router 
