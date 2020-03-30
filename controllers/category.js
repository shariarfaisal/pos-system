const Category = require('../models/Category')

const categories = async (req,res) => {
  const categories = await Category.find()
  if(!categories) return res.status(500).send("Something wrong!")
  return res.status(200).send(categories)
}

const category = async (req,res) => {
  const value = await Category.findById(req.params.id)
  if(!value) return res.status(400).send({msg: "Not found!"})
  return res.status(200).send(value)
}

const createCategory= async (req,res) => {
  const { name } = req.body
  if(!name) return res.status(400).send({name: "Name required!"})
  if(name.length > 25) return res.status(400).send({name: "Name must be in 25 characters!"})
  const exists = await Category.findOne({ name })
  if(exists) return res.status(400).send({name: `${exists.name} already exists!`})

  // Make new category...
  const category = new Category({ name })
  await category.save()
  if(!category) return res.status(500).send("Something wrong!")
  return res.status(201).send(category)
}

const updateCategory = async (req,res) => {
  const { name } = req.body

  if(!name) return res.status(400).send({name: "Name required!"})
  if(name.length > 25) return res.status(400).send({name: "Name must be in 25 characters!"})
  // Check existence ...
  const category = await Category.findById(req.params.id)
  if(!category) return res.status(400).send({msg: "Not found!"})
  // Check duplicates ....
  const nameExists = await Category.findOne({ name })
  if(nameExists) return res.status(400).send({name: `${nameExists.name} already exists!`})

  const updated = await Category.findByIdAndUpdate(req.params.id,{$set:{ name }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}

const deleteCategory = async (req,res) => {
  const exists = await Category.findById(req.params.id)
  if(!exists) return res.status(400).send({msg: "Not found!"})
  const deleted = await Category.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}

module.exports = {
  categories,
  category,
  createCategory,
  updateCategory,
  deleteCategory
}
