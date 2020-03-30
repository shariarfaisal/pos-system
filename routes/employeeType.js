const router = require('express').Router()
const { employeeTypes, employeeType, createEmployeeType, updateEmployeeType, deleteEmployeeType } = require('../controllers/employeeType')
const idChecker = require('../middleware/idChecker')
const employeeAuth = require('../middleware/employeeAuth')


router.get('/',employeeAuth,employeeTypes)
router.get('/:id',employeeAuth,idChecker,employeeType)
router.post('/',employeeAuth,createEmployeeType)
router.put('/:id',employeeAuth,idChecker,updateEmployeeType)
router.delete('/:id',employeeAuth,idChecker,deleteEmployeeType)

module.exports = router
