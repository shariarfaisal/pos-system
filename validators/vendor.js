const vldr = require('validator')

const vendorValidator = (data) => {
  const { name, email, phone, address} = data
  let error = {}

  // Name Validation ...
  if(!name) error.name = "Name required!"
  if(name && name.length < 3) error.name = `Name must be at least character!`
  if(name && name.length > 25) error.name = `Name must be in 25 character!`

  // Name Validation ...
  if(!address) error.address = "Address required!"
  if(address && address.length > 255) error.address = `Address must be in 255 character!`
  if(address && address.length < 10) error.address = `Address must be at least 10 character!`

  // Email Validation ...
  if(!email) error.email = "Email required!"
  if(email && !vldr.isEmail(email)) error.email = "Invalid email!"

  // Phone Validation ...
  if(!phone) error.phone = "Phone number required!"
  if(phone.length > 25) error.phone = "Invalid phone number!"

  // Check Errors ...
  return {error,isValide: Object.keys(error).length === 0}
}

module.exports = vendorValidator
