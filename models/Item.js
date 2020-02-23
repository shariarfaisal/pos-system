const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    max: 25
  },
  image: String,
  code: String,
  brand:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'brand',
    required: true
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'product',
    required: true
  },
  description:{
    type: String,
    required: false,
    max: 5000
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


module.exports = mongoose.model('item',itemSchema)
