const router = require('express').Router()
const { employees, employee, getMe, createEmployee, login, updateEmployee, deleteEmployee} = require('../controllers/employee')
const employeeAuth = require('../middleware/employeeAuth')
const idChecker = require('../middleware/idChecker')


router.get('/',employees)
router.get('/me',employeeAuth,getMe)
router.get('/:id',idChecker,employee)
router.post('/',createEmployee)
router.post('/login',login)
router.put('/',employeeAuth,updateEmployee)
router.delete('/:id',idChecker,deleteEmployee)

module.exports = router
