const mongoose = require('mongoose')
const vldr = require('validator')


const createValidator = (data) => {
  const { name, username, email, phone, type, password } = data
  let error = {}

  // Name Validation ...
  if(!name) error.name = "Name required!"
  if(name && name.length < 3) error.name = `Name must be at least 3 character!`
  if(name && name.length > 25) error.name = `Name must be in 25 character!`

  // Username Validation ...
  if(!username) error.username = "Username required!"
  if(username && username.length < 3) error.username = "Username must be at least 3 character!"
  if(username && username.length > 25) error.username = "Username must be in 25 character!"

  // Email Validation ...
  if(!email) error.email = "Email required!"
  if(email && !vldr.isEmail(email)) error.email = "Invalid email!"

  // Phone Validation ...
  if(phone.length > 25) error.phone = "Invalid phone number!"

  // Type Validation ...
  if(!type) error.type = "Employee Type is required!"
  if(type && !mongoose.Types.ObjectId.isValid(type)) error.type = "Employee Type is not valid!"

  // Password Validation ...
  if(!password) error.password = "Password required!"
  if(password && password.length > 6) error.password = "Password must be minimum 6 character!"

  // Check Errors ...
  if(Object.keys(error).length !== 0) return {error,isValide: false}
  return {error,isValide: true}
}


// Update validator
const updateValidator = (data) => {
  const { name, username, email, phone } = data
  let error = {}

  // Name Validation ...
  if(!name) error.name = "Name required!"
  if(name && name.length > 25) error.name = `Name must be in 25 character!`

  // Username Validation ...
  if(!username) error.username = "Username required!"
  if(username && username.length > 25) error.username = "Username must be in 25 character!"

  // Email Validation ...
  if(!email) error.email = "Email required!"
  if(email && email.length > 255) error.email = "Email must be in 255 character"

  // Phone Validation ...
  if(phone.length > 25) error.phone = "Invalid phone number!"

  // Check Errors ...
  if(Object.keys(error).length !== 0) return {error,isValide: false}
  return {error,isValide: true}
}

module.exports = {
  createValidator,
  updateValidator
}
