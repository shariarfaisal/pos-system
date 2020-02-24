const Brand = require('../models/Brand')

const brandValidator = (data) => {
  const { name, code } = data
  const error = {}
  if(!name) error.name = "Name required!"
  if(name.length < 3) error.name = "Name must be at least 3 characters!"
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
  const brand = await Brand.findById(req.params.id)
  if(!brand) return res.status(400).send("Not found!")
  return res.status(200).send(brand)
}

const createBrand= async (req,res) => {
  const { name, code } = req.body
  const { error, isValide } = brandValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const nameExists = await Brand.findOne({ name })
  if(nameExists) return res.status(400).send({name: `${nameExists.name} already exists!`})

  const codeExists = await Brand.findOne({ code })
  if(codeExists) return res.status(400).send({code: `${codeExists.code} already exists!`})

  // Make new Brand...
  const brand = new Brand({ name, code })
  await brand.save()
  if(!brand) return res.status(500).send("Something wrong!")
  return res.status(201).send(brand)
}

const updateBrand = async (req,res) => {
  const { name, code } = req.body
  const { error, isValide } = brandValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const brand = await Brand.findById(req.params.id)
  if(!brand) return res.status(400).send("Not found!")

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
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await Brand.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}

module.exports = {
  brands,
  brand,
  createBrand,
  updateBrand,
  deleteBrand
}
