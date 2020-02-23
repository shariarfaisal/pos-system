const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  body:{
    type: String,
    required: true,
    trim: true,
    max: 1000
  },
  star:{
    type: Number,
    required: true
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'item'
  },
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
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


module.exports = mongoose.model('review',reviewSchema)
