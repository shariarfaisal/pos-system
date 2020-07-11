const mongoose = require('mongoose')
const exportItemSchema = require('./ExportItem')
const Schema = mongoose.Schema

const exportSchema = new Schema({
  request:{
    type: Schema.Types.ObjectId,
    ref:'exportRequest',
    required: true
  },
  employee:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'employee',
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
