const mongoose = require('mongoose')
const exportItemSchema = require('./ExportItem')
const Schema = mongoose.Schema

const exportReturnSchema = new Schema({
  products:[exportItemSchema],
  branch:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'branch',
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


module.exports = mongoose.model('exportReturn',exportReturnSchema)
