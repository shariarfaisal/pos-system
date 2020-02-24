const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subItemSchema = new Schema({
  item:{
    type: Schema.Types.ObjectId,
    ref:'item',
    required: true
  },
  name:{
    type: String,
    required: true,
    trim: true,
    max: 25
  },
  image: String,
  code:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: false,
    max: 5000
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


module.exports = mongoose.model('subItem',subItemSchema)
