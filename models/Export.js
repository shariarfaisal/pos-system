const mongoose = require('mongoose')
const exportItemSchema = require('./ExportItem')
const Schema = mongoose.Schema

const exportSchema = new Schema({
  branch:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'branch',
    required: true
  },
  products:[exportItemSchema],
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('export',exportSchema)
