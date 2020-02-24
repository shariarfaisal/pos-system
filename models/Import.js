const mongoose = require('mongoose')
const Schema = mongoose.Schema

const importSchema = new Schema({
  vendor:{
    type: Schema.Types.ObjectId,
    ref: 'vendor',
    required: true
  },
  employee:{
    type: Schema.Types.ObjectId,
    ref:'employee',
    required: true,
  },
  item:{
    type: Schema.Types.ObjectId,
    ref:'item',
    required: true,
  },
  subItems:[{
    item:{
      type: Schema.Types.ObjectId,
      ref:'subItem',
      required: true
    },
    quantity: Number,
    pp: Number
  }],
  quantity:{
    type: Number,
    required: function(){
      return this.subItems.length === 0
    }
  },
  pp:{
    type: Number,
    required:function(){
      return this.subItems.length === 0
    }
  },
  vat: Number,
  expireDate: String,
  importDate: String,
  createdAt:{
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('import',importSchema)
