const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestItemSchema = new Schema({
  item:{
    type: Schema.Types.ObjectId,
    ref: 'item'
  },
  quantity: Number,
  subItems:[{
    item:{
      type: Schema.Types.ObjectId,
      ref: 'subItem'
    },
    quantity: Number
  }]
})

const exportRequestSchema = new Schema({
  branch:{
    type: Schema.Types.ObjectId,
    ref: 'branch'
  },
  title: String,
  message: String,
  items:[requestItemSchema],
  status:{
    type: String,
    enum:['create','pending','process','complete']
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  requestedAt: String
})

module.exports = mongoose.model('exportRequest',exportRequestSchema)
