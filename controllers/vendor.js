const Vendor = require('../models/Vendor')
const vendorValidator = require('../validators/vendor')

const vendors = async (req,res) => {
  const vendor = await Vendor.find()
  if(!vendor) return res.status(500).send("Something wrong!")
  return res.status(200).send(vendor)
}

const vendor = async (req,res) => {
  const value = await Vendor.findById(req.params.id)
  if(!value) return res.status(400).send("Not found!")
  return res.status(200).send(value)
}

const createVendor = async (req,res) => {
  const { name, phone, email, address } = req.body
  const { error, isValide } = vendorValidator(req.body)
  if(!isValide) return res.status(400).send(error)
  // Check Existence ...
  const exists = await Vendor.findOne({ name })
  if(exists) return res.status(400).send(`${exists.name} already exists!`)

  if(email){
    const emailExists = await Vendor.findOne({ email })
    if(emailExists) return res.status(400).send(`Email taken!`)
  }

  // Make new vendor...
  const vendor = new Vendor({ name, phone, email, address })
  await vendor.save()
  if(!vendor) return res.status(500).send("Something wrong!")
  return res.status(201).send(vendor)
}

const updateVendor = async (req,res) => {
  const { name, phone, email, address } = req.body
  const { error, isValide } = vendorValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const vendor = await Vendor.findById(req.params.id)
  if(!vendor) return res.status(400).send("Not found!")

  if(name !== vendor.name){
    // Check Name Existence ...
    const nameExists = await Vendor.findOne({ name })
    if(nameExists) return res.status(400).send(`${nameExists.name} already exists!`)
  }

  if(email && vendor.email && (email !== vendor.email)){
    // Check Email Existence ...
    const emailExists = await Vendor.findOne({ email })
    if(emailExists) return res.status(400).send(`Email taken!`)
  }

  const updated = await Vendor.findByIdAndUpdate(req.params.id,{$set:{ name, phone, email,address }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}

const deleteVendor = async (req,res) => {
  const exists = await Vendor.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await Vendor.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}

module.exports = {
  vendors,
  vendor,
  createVendor,
  updateVendor,
  deleteVendor
}
