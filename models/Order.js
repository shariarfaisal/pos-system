const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'customer'
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'item'
  },
  deliveryStatus:{
    type: String,
    enum:['pending','process','complete']
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


module.exports = mongoose.model('order',orderSchema)
