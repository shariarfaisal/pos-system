const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 25
  },
  code:{
    type: String,
    required: true,
    unique: true,
    max: 20
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
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


module.exports = mongoose.model('product',productSchema)
