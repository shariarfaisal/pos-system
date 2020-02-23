const mongoose = require('mongoose')
const Schema = mongoose.Schema


const vendorSchema = new Schema({
  name:{
    type: String,
    required: true,
    max: 25,
    trim: true
  },
  email:{
    type: String,
    required: false
  },
  phone:{
    type: String,
    required: true,
    max: 25,
  },
  address:{
    type: String,
    required: true,
    max: 255,
    trim: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('vendor',vendorSchema)
