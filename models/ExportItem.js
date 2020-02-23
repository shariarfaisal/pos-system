const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exportItemSchema = new Schema({
  export:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'export',
    required: true
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'item',
    required: true
  },
  quantity:{type: Number,required: true},
  pp:{ type: Number,required: true},
  vat:{ type: Number,default: 0},
  mrp:{ type: Number,required: true},
  expireDate: String,
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = exportItemSchema
