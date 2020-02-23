const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const EmployeeType = require('../routes/employeeType')
const Employee = require('../routes/employee')
const Vendor = require('../routes/vendor')
const Category = require('../routes/category')
const Product = require('../routes/product')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'))

  app.use('/api/employeeType/',EmployeeType)
  app.use('/api/employee/',Employee)
  app.use('/api/vendor/',Vendor)
  app.use('/api/category/',Category)
  app.use('/api/product/',Product)
}
