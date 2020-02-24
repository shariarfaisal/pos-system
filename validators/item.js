const mongoose = require('mongoose')
const vldr = require('validator')


const itemValidator = (data,type="create") => {
  const { name, code, description } = data
  let error = {}

  // Name Validation ...
  if(!name) error.name = "Name required!"
  if(name && name.length < 3) error.name = `Name must be at least character!`
  if(name && name.length > 25) error.name = `Name must be in 25 character!`

  if(!code) error.code = "Code required!"


  if(type === 'create'){
    if(!data.brand) error.brand = "Brand required!"
    if(data.brand && !mongoose.Types.ObjectId.isValid(data.brand)){
      error.brand = "Invalid Brand ID!"
    }

    if(!data.product) error.product = "Product required!"
    if(data.product && !mongoose.Types.ObjectId.isValid(data.product)){
      error.product = "Invalid Product ID!"
    }
  }

  if(type === 'subItem'){
    if(!data.item) error.item = "Item required"
    if(data.item && !mongoose.Types.ObjectId.isValid(data.item)){
      error.item = "Item ID is not valid!"
    }
  }

  // Description Validation ...
  if(description && description.length > 5000) error.description = `Description must be in 5000 character!`

  // Check Errors ...
  if(Object.keys(error).length !== 0) return {error,isValide: false}
  return {error,isValide: true}
}

module.exports = itemValidator
