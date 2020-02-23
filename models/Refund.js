const mongoose = require('mongoose')
const Schema = mongoose.Schema

const refundSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'item',
    required: true,
  },
  vendor:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'vendor',
    required: true
  },
  quantity:{
    type: Number,
    required: true
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


module.exports = mongoose.model('refund',refundSchema)
