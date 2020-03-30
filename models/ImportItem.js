const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subItemSchema = new Schema({
  item:{
    type: Schema.Types.ObjectId,
    ref:'subItem',
    required: true
  },
  quantity:{
    type: Number,
    default: 1
  },
  pp:{
    type: Number,
    required: true
  },
  exports: {
    type: Number,
    default: 0
  },
  expireDate: String
})

const importItemSchema = new Schema({
  item:{
    type: Schema.Types.ObjectId,
    ref:'item',
    required: true,
  },
  subItems:[subItemSchema],
  quantity:Number,
  pp:Number,
  vat: Number,
  expireDate: String,
  exports: {
    type: Number,
    default: 0
  }
})

module.exports = importItemSchema
