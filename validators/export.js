const mongoose = require('mongoose')


const exportItemValidator = (data) => {
  const error = {}
  if(!data.export) error.export = "Export requied!"
  if(data.export && !mongoose.Types.ObjectId.isValid(data.export)){
    error.export = "Export ID is not valid!"
  }

  if(!data.item) error.item = "Item is required!"
  if(data.item && !mongoose.Types.ObjectId.isValid(data.item)){
    error.export = "Item ID is not valid!"
  }

  if(!data.subItems || data.subItems.length === 0){
    if(!data.quantity) error.quantity = "Quantity required!"
    if(typeof Number(data.quantity) !== 'number'){
      error.quantity = "Quantity must be a Number!"
    }
    if(data.quantity){
      if(!data.pp) error.pp = "Purchase price is required!"
      if(typeof Number(data.pp) !== 'number'){
        error.pp = "Purchase price must be a Number!"
      }
      if(!data.mrp) error.mrp = "MRP requied!"
      if(typeof Number(data.pp) !== 'number'){
        error.mrp = "MRP must be a Number!"
      }
    }
  }
  // else{
  //   data.quantity = 0
  //   data.pp = 0
  //   data.mrp = 0
  // }

  if(data.subItems && data.subItems.length !== 0){
    const subError = []
    data.subItems.forEach(i => {
      const err = {}
      if(!i.item) err.item = "Item required!"
      if(i.item && !mongoose.Types.ObjectId.isValid(i.item)){
        err.item = "Item ID is not valid!"
      }

      if(!i.quantity) err.quantity = "Quantity required!"
      if(!i.pp) err.pp = "Purchase price required!"
      if(!i.mrp) err.mrp = "MRP required!"

      if(Object.keys(err).length !== 0){
        subError.push(err)
      }
    })
    if(subError.length !== 0) error.subError = subError
  }

  return { error, isValid: Object.keys(error).length === 0 }
}

module.exports = {
  exportItemValidator
}
