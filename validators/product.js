const mongoose = require('mongoose')

module.exports =  (data) => {
  const { name, category } = data
  const error = {}
  // Name Validation ...
  if(!name) error.name = "Name required!"
  if(name && name.length < 3) error.name = `Name must be at least 3 character!`
  if(name && name.length > 25) error.name = `Name must be in 25 character!`

  if(!category) error.category = "Category required!"
  else if(!mongoose.Types.ObjectId.isValid(category)){
    error.category = `Category ID isn't valid!`
  }

  // Check Errors ...
  if(Object.keys(error).length !== 0) return {error,isValide: false}
  return {error,isValide: true}
}
