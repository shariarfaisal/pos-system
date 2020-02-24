const mongoose = require('mongoose')
const vldr = require('validator')


const branchValidator = (data,type='create') => {
  const { name, username, email, phone, address, password } = data
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

  // Address validation ...
  if(address && address.length > 255) error.address = "Address must be in 255 character!"

  if(type !== 'update'){
    // Password Validation ...
    if(!password) error.password = "Password required!"
    if(password && password.length > 6) error.password = "Password must be minimum 6 character!"
  }

  // Check Errors ...
  return {error,isValide: Object.keys(error).length === 0}
}

module.exports = branchValidator
