const mongoose = require('mongoose')
const Schema = mongoose.Schema
const importItemSchema = require('./importItem')

const importSchema = new Schema({
  vendor:{
    type: Schema.Types.ObjectId,
    ref: 'vendor',
    required: true
  },
  title:{
    type: String,
    trim: true,
    max: 100,
    required: true
  },
  note:{
    type: String,
    trim: true,
    max: 1000
  },
  employee:{
    type: Schema.Types.ObjectId,
    ref:'employee',
    required: true,
  },
  items:[importItemSchema],
  importDate: String,
  total:{
    type: Number,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('import',importSchema)
