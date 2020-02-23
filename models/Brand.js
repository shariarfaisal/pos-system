const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 25
  },
  code:{
    type: String,
    required: true,
    max: 255
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


module.exports = mongoose.model('brand',brandSchema)
