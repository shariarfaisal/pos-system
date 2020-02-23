const router = require('express').Router()
const { employeeTypes, employeeType, createEmployeeType, updateEmployeeType, deleteEmployeeType } = require('../controllers/employeeType')
const idChecker = require('../middleware/idChecker')

router.get('/',employeeTypes)
router.get('/:id',idChecker,employeeType)
router.post('/',createEmployeeType)
router.put('/:id',idChecker,updateEmployeeType)
router.delete('/:id',idChecker,deleteEmployeeType)

module.exports = router
