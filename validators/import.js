const mongoose = require('mongoose')
const vldr = require('validator')


const importValidator = (data) => {
  const { vendor, item, subItems, quantity, pp, vat } = data
  const error = {}

  if(!vendor) error.vendor = "Vendor required!"
  if(vendor && !mongoose.Types.ObjectId.isValid(vendor)){
    error.vendor = "Vendor ID is not valid!"
  }

  if(!item) error.item = "Item required!"
  if(item && !mongoose.Types.ObjectId.isValid(item)){
    error.item = "Item ID is not valid!"
  }


  if(subItems.length === 0){
    if(!quantity) error.quantity = "Quantity is required!"
    if(quantity && (typeof Number(quantity) !== 'number')){
      error.quantity = "Quantity must be a number!"
    }

    if(!pp) error.pp = "Purchase price is required!"
    if(pp && (typeof Number(pp) !== 'number')){
      error.pp = "Purchase price must be a number!"
    }
  }


  return {error,isValid: Object.keys(error).length === 0}
}

module.exports = {
  importValidator
}
