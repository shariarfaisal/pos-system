const Product = require('../models/Product')
const Item = require('../models/Item')
const Category = require('../models/Category')
const productValidator = require('../validators/product')
const mongoose = require('mongoose')

const products = async (req,res) => {
  let payload = {}
  let products = []
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    products = await Product.find({ category: req.params.id }).populate('category')
  }else{
    const category = await Category.findOne({ name: req.params.id })
    if(!category) return res.status(400).send({ msg: "Not Found!"})
    products = await Product.find({ category: category._id }).populate('category')
  }
  return res.status(200).send(products)
}



const product = async (req,res) => {
  const product = await Product.findById(req.params.id).populate('category')
  if(!product) return res.status(400).send("Not found!")
  return res.status(200).send(product)
}

const items = async (req,res) => {
  const items = await Item.find({ product : req.params.id })
  if(!items) return res.status(500).send("Something wrong!")
  return res.status(200).send(items)
}

// Make product ...
const createProduct = async (req,res) => {
  let { name, category } = req.body
  const { error, isValide } = productValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  if(!mongoose.Types.ObjectId.isValid(category)){
    const cat = await Category.findOne({ name: category })
    if(!cat) return res.status(400).send({ msg: "Category not found!"})
    category = cat._id
  }

  const exists = await Product.findOne({ name, category })
  if(exists) return res.status(400).send({name: `${name} exists!`})

  const product = new Product({ name, category })
  await product.save()
  if(!product) return res.status(500).send("Something wrong!")
  return res.status(201).send(product)
}

// Update product ...

const updateProduct = async (req,res) => {
  const { name } = req.body
  const error = {}
  // Name Validation ...
  if(!name) error.name = "Name required!"
  if(name && name.length < 3) error.name = `Name must be at least 3 character!`
  if(name && name.length > 25) error.name = `Name must be in 25 character!`
  if(error.name) return res.status(400).send(error)


  const product = await Product.findById(req.params.id)
  if(!product) return res.status(400).send("Not found!")
  if(name !== product.name){
    const exists = await Product.find({ name, category: product.category })
    if(exists) return res.status(400).send({name: `${name} exists!`})
  }

  const updated = await Product.findByIdAndUpdate(req.params.id,{$set:{ name }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}


// Delete product ...
const deleteProduct = async (req,res) => {
  const exists = await Product.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await Product.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}


module.exports = {
  createProduct,
  products,
  product,
  items,
  updateProduct,
  deleteProduct
}
