const mongoose = require('mongoose')
const Schema = mongoose.Schema

const importSchema = new Schema({
  vendor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor',
    required: true
  },
  employee:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'employee',
    required: true,
  },
  item:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'employee',
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
    max: 10000000,
  },
  pp:{
    type: Number,
    required: true,
    max: 1000000000,
  },
  vat: Number,
  expireDate: String,
  importDate: String,
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('import',importSchema)
