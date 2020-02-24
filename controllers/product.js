const Product = require('../models/Product')
const productValidator = require('../validators/product')


const products = async (req,res) => {
  const products = await Product.find().populate('category')
  if(!products) return res.status(500).send("Something wrong!")
  return res.status(200).send(products)
}

const product = async (req,res) => {
  const product = await Product.findById(req.params.id).populate('category')
  if(!product) return res.status(400).send("Not found!")
  return res.status(200).send(product)
}

// Make product ...
const createProduct = async (req,res) => {
  const { name, category } = req.body
  const { error, isValide } = productValidator(req.body)
  if(!isValide) return res.status(400).send(error)

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
  updateProduct,
  deleteProduct
}
