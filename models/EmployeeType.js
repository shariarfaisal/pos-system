const mongoose = require('mongoose')
const Schema = mongoose.Schema


const employeeTypeSchema = new Schema({
  name:{
    type: String,
    max: 25,
    required: true,
    trim: true,
    lowercase: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('employeeType',employeeTypeSchema)
