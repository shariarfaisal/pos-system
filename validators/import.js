const mongoose = require('mongoose')
const vldr = require('validator')


const importValidator = (data) => {
  const { vendor, title, note  } = data
  const error = {}
  if(!title) error.title = "Title required!"
  if(title.length > 100) error.title = "Title must be in 100 characters!"

  if(note && (note.length > 1000)) error.note = "Note must be in 1000 characters!"

  if(!vendor) error.vendor = "Vendor required!"
  if(vendor && !mongoose.Types.ObjectId.isValid(vendor)){
    error.vendor = "Vendor ID is not valid!"
  }

  return {error,isValid: Object.keys(error).length === 0}
}

const updateValidator = (data) => {
  const error = {}
  const { quantity, isActive, pp, vat} = data

  if(!quantity && (quantity !== 0)) error.quantity = "Quantity is required!"
  if(typeof Number(quantity) !== "number") error.quantity = "Quantity must be a number!"

  if(!pp) error.pp = "Purchase price is required!"
  if(typeof Number(pp) !== "number") error.pp = "Purchase price must be a number!"

  if(typeof Number(vat) !== "number") error.vat = "Vat must be a number!"
  if(typeof isActive !== "boolean") error.isActive = "Active must be true or false"

  return {error, isValid: Object.keys(error).length === 0}
}

const itemValidator = (i) => {
  const x = {}
  if(!i.item) x.item = "Item required!"
  if(i.item && !mongoose.Types.ObjectId.isValid(i.item)){
    x.item = "Item ID is not valid!"
  }

  if(!i.quantity && (i.quantity !== 0)) x.quantity = "Quantity is required!"
  if(typeof Number(i.quantity) !== "number"){
    x.quantity = "Quantity must be a number!"
  }

  if(!i.pp && (i.pp !== 0)) x.pp = "Purchase price is required!"
  if(typeof Number(i.pp) !== "number"){
    x.pp = "Purchase price must be a number!"
  }

  return {error: x,isValid: Object.keys(x).length === 0}
}

module.exports = {
  importValidator,
  updateValidator,
  itemValidator
}
