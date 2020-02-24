const SubItem = require('../models/SubItem')
const itemValidator = require('../validators/item')


const subItems = async (req,res) => {
  const subItems = await SubItem.find().populate('item')
  if(!subItems) return res.status(500).send("Something wrong!")
  return res.status(200).send(subItems)
}

const subItem = async (req,res) => {
  const subItem = await SubItem.findById(req.params.id).populate('item')
  if(!subItem) return res.status(400).send("Not found!")
  return res.status(200).send(subItem)
}

const createSubItem = async (req,res) => {
  const { item, name, image, code, description } = req.body
  const { error, isValide } = itemValidator(req.body,'subItem')
  if(!isValide) return res.status(400).send(error)

  const nameExists = await SubItem.findOne({ name, item })
  if(nameExists) return res.status(400).send({name: `${nameExists.name} already exists!`})

  const codeExists = await SubItem.findOne({ code })
  if(codeExists) return res.status(400).send({code: `${codeExists.code} already exists!`})

  // Make new subItem...
  const subItem = new SubItem({ item, name, image, code, description })
  await subItem.save()
  if(!subItem) return res.status(500).send("Something wrong!")
  return res.status(201).send(subItem)
}

const updateSubItem = async (req,res) => {
  const {item, name, image, code, description } = req.body
  const { error, isValide } = itemValidator(req.body,'subItem')
  if(!isValide) return res.status(400).send(error)

  const subItem = await SubItem.findById(req.params.id)
  if(!subItem) return res.status(400).send("Not found!")


  if(name !== subItem.name){
    const nameExists = await SubItem.findOne({ name, item })
    if(nameExists) return res.status(400).send({name: `${nameExists.name} already exists!`})
  }

  if(code !== subItem.code){
    const codeExists = await SubItem.findOne({ code, item })
    if(codeExists) return res.status(400).send({code: `${codeExists.code} already exists!`})
  }

  const updated = await SubItem.findByIdAndUpdate(req.params.id,{$set:{ name, image, code, description }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}

const deleteSubItem = async (req,res) => {
  const exists = await SubItem.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await SubItem.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}

module.exports = {
  subItems,
  subItem,
  createSubItem,
  updateSubItem,
  deleteSubItem
}
