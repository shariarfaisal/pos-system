const router = require('express').Router()
const { imports, getImport, createImport, deleteImport } = require('../controllers/import')
const idChecker = require('../middleware/idChecker')
const employeeAuth = require('../middleware/employeeAuth')

router.get('/',imports)
router.get('/:id',idChecker,getImport)
router.post('/',employeeAuth,createImport)
// router.put('/:id',idChecker,updateItem)
router.delete('/:id',idChecker,deleteImport)

module.exports = router
