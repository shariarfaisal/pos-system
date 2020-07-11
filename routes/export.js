const router = require('express').Router()
const {
  getExports,
  getExport,
  createExport,
  deleteExport
} = require('../controllers/export')
const { addItemInExport } = require('../controllers/exportItem')
const idChecker = require('../middleware/idChecker')
const employeeAuth = require('../middleware/employeeAuth')

router.get('/',getExports)
router.get('/:id',idChecker,getExport)
router.post('/',employeeAuth,createExport)
router.post('/addItem',employeeAuth,addItemInExport)
// router.put('/:id',idChecker,updateEXport)
router.delete('/:id',/*employeeAuth,*/idChecker,deleteExport)

module.exports = router
