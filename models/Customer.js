const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
  name:{
    type: String,
    max: 25,
    trim: true,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  phone:{
    type: String,
    max: 25,
  },
  district:{
    type: String,
    max: 25,
    required: true
  },
  region:{
    type: String,
    max: 25,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})


module.exports =  mongoose.model('customer',customerSchema)
