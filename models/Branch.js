const mongoose = require('mongoose')
const Schema = mongoose.Schema

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 255
  },
  username:{
    type: String,
    required: true,
    unique: true,
    max: 25
  },
  email:{
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  address:{
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('branch',branchSchema)
