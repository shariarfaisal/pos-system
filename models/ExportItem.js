const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exportItemSchema = new Schema({
  item:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'item',
    required: true
  },
  quantity: Number,
  pp:{
    type: Number,
    required: function(){
      return this.quantity !== 0
    }
  },
  vat:{ type: Number,default: 0},
  mrp:{
    type: Number,
    required: function(){
    return this.quantity !== 0
  }},
  subItems:[
    {
      item:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subItem',
        required: true
      },
      quantity:{
        type: Number,
        required: true
      },
      pp:{
        type: Number,
        required: true
      },
      mrp:{
        type: Number,
        required: true
      },
      vat: Number
    }
  ],
  expireDate: String,
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = exportItemSchema
