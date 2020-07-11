const mongoose = require('mongoose')
const Schema = mongoose.Schema

const branchItemSchema = new Schema({
  branch:{
    type: Schema.Types.ObjectId,
    ref:'branch'
  },
  item:{
    type: Schema.Types.ObjectId,
    ref:'item',
    unique: true
  },
  subItems:[{
    item:{
      type: Schema.Types.ObjectId,
      ref:'subItem',
      unique: true
    }
  }]
})

module.exports = mongoose.model('branchItem',branchItemSchema)
