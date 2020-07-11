const Item = require('../models/Item')
const Brand = require('../models/Brand')
const itemValidator = require('../validators/item')


const items = async (req,res) => {
  const items = await Item.find({ product: req.params.id }).populate('brand').populate('product')
  if(!items) return res.status(500).send("Something wrong!")
  return res.status(200).send(items)
}

const itemsWithBrandAndProduct = async (req,res) => {
  const products = await Item.find({ brand: req.params.brandId, product: req.params.productId }).populate('product')
  if(!products) return res.status(500).send({msg: "Server Error!"})
  return res.status(200).send(products)
}

const itemsWithBrand = async (req,res) => {
  const products = await Item.find({ brand: req.params.brandId }).populate('product')
  if(!products) return res.status(500).send({msg: "Server Error!"})
  return res.status(200).send(products)
}

const item = async (req,res) => {
  const item = await Item.findById(req.params.id).populate('brand').populate('product')
  if(!item) return res.status(400).send("Not found!")
  return res.status(200).send(item)
}

const createItem = async (req,res) => {
  const { name, image, code, brand, product, description } = req.body
  const { error, isValide } = itemValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const nameExists = await Item.findOne({ name })
  if(nameExists) error.name = `${nameExists.name} already exists!`

  const codeExists = await Item.findOne({ code })
  if(codeExists) error.code = `${codeExists.code} already exists!`

  const getBrand = await Brand.findById(brand)
  if(!getBrand) error.brand = "Brand not found!"

  if(Object.keys(error).length > 0) return res.status(400).send(error)

  getBrand.products.push(product)
  await getBrand.save()

  // Make new item...
  const item = new Item({ name, image, code, brand, product, description })
  await item.save()
  if(!item) return res.status(500).send("Something wrong!")
  return res.status(201).send(item)
}

const updateItemName = async (req,res) => {
  const error = {}
  const { name } = req.body
  if(!name) error.name = "Name required"
  if(name.length < 2) error.name = "Name must be at least 2 character!"
  if(name.length > 100) error.name = "Name must not be in 100 characters!"

  const item = await Item.findById(req.params.id)
  if(!item) return res.status(400).send({msg: "Not found!"})

  if(name !== item.name){
    const nameExists = await Item.findOne({ name })
    if(nameExists) error.name = `${name} exists!`
  }

  if(Object.keys(error).length > 0) return res.status(400).send(error)

  const updated = await Item.findByIdAndUpdate(req.params.id,{$set:{ name }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}

const updateItem = async (req,res) => {
  const { name, image, code, description } = req.body
  const { error, isValide } = itemValidator(req.body,'update')
  if(!isValide) return res.status(400).send(error)

  const item = await Item.findById(req.params.id)
  if(!item) return res.status(400).send({msg: "Not found!"})


  if(name !== item.name){
    const nameExists = await Item.findOne({ name })
    if(nameExists) return res.status(400).send({name: `${nameExists.name} already exists!`})
  }

  if(code !== item.code){
    const codeExists = await Item.findOne({ code })
    if(codeExists) return res.status(400).send({code: `${codeExists.code} already exists!`})
  }

  const updated = await Item.findByIdAndUpdate(req.params.id,{$set:{ name, image, code, description }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}

const deleteItem = async (req,res) => {
  const exists = await Item.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await Item.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}

module.exports = {
  items,
  item,
  createItem,
  updateItem,
  deleteItem,
  itemsWithBrand,
  updateItemName,
  itemsWithBrandAndProduct
}
