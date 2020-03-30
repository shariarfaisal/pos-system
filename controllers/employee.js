const Employee = require('../models/Employee')
const bcrypt = require('bcryptjs')
const { createValidator, updateValidator } = require('../validators/employee')

// Get All Employees Info...
const employees = async (req,res) => {
  const values = await Employee.find().populate('type')
  if(!values) return res.status(500).send("Something wrong!")
  return res.status(200).send(values)
}

// Get Self Info ...
const getMe = async (req,res) => {
  const value = await Employee.findById(req.employee._id).populate('type')
  if(!value) return res.status(400).send({msg: "Not found!"})
  return res.status(200).send(value)
}

// Get One Employee Info By Id ...
const employee = async (req,res) => {
  const value = await Employee.findById(req.params.id).populate('type')
  if(!value) return res.status(400).send({msg: "Not found!"})
  return res.status(200).send(value)
}

// Register New Employee ...
const createEmployee = async (req,res) => {
  const { name, username, email, phone, type, password } = req.body
  const { error, isValide } = createValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const emailExist = await Employee.findOne({ email })
  const usernameExist = await Employee.findOne({ username })

  if(emailExist && usernameExist) res.status(400).send({email: 'Email taken!',username: 'Username taken!'})
  if(emailExist) return res.status(400).send({email: 'Email taken!'})
  if(usernameExist) return res.status(400).send({username: 'Username taken!'})

  const employee = new Employee({ name, username, email, phone, type, password })
  const salt = await bcrypt.genSalt(10)
  employee.password = await bcrypt.hash(password,salt)
  await employee.save()
  if(!employee) return res.status(500).send("Something wrong!")
  return res.status(201).send(employee)
}

// Login with credentials ...
const login = async (req,res) => {
  const { password } = req.body

  const employee = req.body.username ?
    await Employee.findOne({ username: req.body.username }):
     await Employee.findOne({ email: req.body.email })

  if(!employee) return res.status(400).send({
    msg: "Unable to login!"
  })

  const passValid = await bcrypt.compare(password,employee.password)
  if(!passValid) return res.status(400).send({
    msg: "Unable to login!"
  })
  const token = employee.getToken()
  return res.header('employee-token',token).status(200).send(token)
}

// Update info ...
const updateEmployee = async (req,res) => {
  const { name, username, email, phone } = req.body
  const { error, isValide } = updateValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const employee = await Employee.findById(req.employee._id)
  if(!employee) return res.status(400).send({msg: "Not Found!"})

  if(employee.email !== email){
    const emailExist = await Employee.findOne({ email })
    if(emailExist) return res.status(400).send({email: "Emaili taken!"})
  }

  if(employee.username !== username){
    const usernameExist = await Employee.findOne({ username })
    if(usernameExist) return res.status(400).send({username: "Username taken!"})
  }

  const update = await Employee.findByIdAndUpdate(req.employee._id,{$set:{ name, username, email, phone }},{new: true})
  if(!update) return res.status(500).send("Something wrong!")
  return res.status(200).send(update)
}

// Delete account...
const deleteEmployee = async (req,res) => {
  const exists = await Employee.findById(req.params.id)
  if(!exists) return res.status(400).send({msg: "Not found!"})
  const deleted = await Employee.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  res.status(200).send(deleted)
}



module.exports = {
  employees,
  employee,
  getMe,
  createEmployee,
  login,
  updateEmployee,
  deleteEmployee
}
