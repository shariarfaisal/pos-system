const mongoose = require('mongoose')

module.exports =  (data) => {
  const { name, code, category } = data
  const error = {}
  // Name Validation ...
  if(!name) error.name = "Name required!"
  if(name && name.length < 3) error.name = `Name must be at least 3 character!`
  if(name && name.length > 25) error.name = `Name must be in 25 character!`

  if(!code) error.code = "Code required!"

  if(!category) error.category = "Category required!"

  // Check Errors ...
  if(Object.keys(error).length !== 0) return {error,isValide: false}
  return {error,isValide: true}
}
