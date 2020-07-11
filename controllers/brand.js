const Brand = require('../models/Brand')
const Product = require('../models/Product')
const mongoose = require('mongoose')


const brandValidator = (data) => {
  const { name, code } = data
  const error = {}
  if(!name) error.name = "Name required!"
  if(name.length < 2) error.name = "Name must be at least 2 characters!"
  if(name.length > 25) error.name = "Name must be in 25 characters!"
  if(!code) error.code = "Code required!"
  return {error,isValide: Object.keys(error).length === 0}
}

const brands = async (req,res) => {
  const brands = await Brand.find()
  if(!brands) return res.status(500).send("Something wrong!")
  return res.status(200).send(brands)
}

const brand = async (req,res) => {
  const brand = await Brand.findById(req.params.id).populate('categories')
  if(!brand) return res.status(400).send({msg: "Not found!"})
  return res.status(200).send(brand)
}

const createBrand= async (req,res) => {
  const { name, code } = req.body
  const { error, isValide } = brandValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const nameExists = await Brand.findOne({ name })
  if(nameExists) error.name = `${nameExists.name} already exists!`

  const codeExists = await Brand.findOne({ code })
  if(codeExists) error.code = `${codeExists.code} already exists!`

  if(Object.keys(error).length > 0) return res.status(400).send(error)

  // Make new Brand...
  const brand = new Brand({ name, code })
  await brand.save()
  if(!brand) return res.status(500).send("Something wrong!")
  return res.status(201).send(brand)
}

const addProduct = async (req,res) => {
  const { product } = req.body

  if(!mongoose.Types.ObjectId.isValid(product)){
    return res.status(400).send({product: "Invalid Product ID!"})
  }

  const getBrand = await Brand.findById(req.params.id)
  if(!getBrand) return res.status(400).send({msg: "Brand not found!"})

  const getProduct = await Product.findById(product)
  if(!getProduct) return res.status(404).send({msg: 'Product not found!'})

  const index = getBrand.products.push(product)
  await getBrand.save()

  return res.status(201).send(getProduct)
}

const updateBrand = async (req,res) => {
  const { name, code } = req.body
  const { error, isValide } = brandValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const brand = await Brand.findById(req.params.id)
  if(!brand) return res.status(400).send({msg: "Not found!"})

  if(name !== brand.name){
    const nameExists = await Brand.findOne({ name })
    if(nameExists) return res.status(400).send({name: `${nameExists.name} already exists!`})
  }

  if(code !== brand.code){
    const codeExists = await Brand.findOne({ code })
    if(codeExists) return res.status(400).send({code: `${codeExists.code} already exists!`})
  }

  const updated = await Brand.findByIdAndUpdate(req.params.id,{$set:{ name, code }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}

const deleteBrand = async (req,res) => {
  const exists = await Brand.findById(req.params.id)
  if(!exists) return res.status(400).send({msg: "Not found!"})
  const deleted = await Brand.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}

module.exports = {
  brands,
  brand,
  createBrand,
  updateBrand,
  deleteBrand,
  addProduct
}
