const EmployeeType = require('../models/EmployeeType')


const employeeTypes = async (req,res) => {
  const types = await EmployeeType.find()
  if(!types) return res.status(500).send("Something wrong!")
  return res.status(200).send(types)
}

const employeeType = async (req,res) => {
  const value = await EmployeeType.findById(req.params.id)
  if(!value) return res.status(400).send("Not found!")
  return res.status(200).send(value)
}


const createEmployeeType = async (req,res) => {
  const { name } = req.body
  // Check Existence ...
  const exists = await EmployeeType.findOne({ name })
  if(exists) return res.status(400).send(`${exists.name} already exists!`)
  // Make new employee type
  const value = new EmployeeType({ name })
  await value.save()
  if(!value) return res.status(500).send("Something wrong!")
  return res.status(201).send(value)
}

const updateEmployeeType = async (req,res) => {
  const { name } = req.body
  const exists = await EmployeeType.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const update = await EmployeeType.findByIdAndUpdate(req.params.id,{$set:{ name }},{new: true})
  if(!update) return res.status(500).send("Something wrong!")
  return res.status(200).send(update)
}

const deleteEmployeeType = async (req,res) => {
  const exists = await EmployeeType.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await EmployeeType.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}



module.exports = {
  employeeTypes,
  employeeType,
  createEmployeeType,
  updateEmployeeType,
  deleteEmployeeType
}