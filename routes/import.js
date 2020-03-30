const router = require('express').Router()
const {
  imports,
  getImport,
  createImport,
  deleteImport,
  updateImport,
  addImportItem,
  addImportSubItem,
  deleteImportSubItem,
  activeImport
} = require('../controllers/import')
const idChecker = require('../middleware/idChecker')
const employeeAuth = require('../middleware/employeeAuth')

router.get('/',employeeAuth,imports)
router.get('/active',employeeAuth,activeImport)
router.get('/:id',idChecker,employeeAuth,getImport)
router.post('/',employeeAuth,createImport)
router.post('/:importId/item',employeeAuth,addImportItem)
router.post('/:importId/:itemId/sub',employeeAuth,addImportSubItem)
router.put('/:id',employeeAuth,idChecker,updateImport)
router.delete('/:id',employeeAuth,idChecker,deleteImport)
router.delete('/:importId/:itemId/:subItemId',employeeAuth,deleteImportSubItem)

module.exports = router
