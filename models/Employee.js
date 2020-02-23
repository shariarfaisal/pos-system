const mongoose = require('mongoose')
const Schema = mongoose.Schema


const employeeSchema = new Schema({
  name:{
    type: String,
    max: 25,
    required: true,
    trim: true
  },
  username:{
    type: String,
    max: 25,
    required: true,
    unique: true
  },
  email:{
    type: String,
    max: 255,
    required: true,
    unique: true
  },
  phone:{
    type: String,
    required: false,
    max: 25
  },
  type:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employeeType'
  },
  password:{
    type: String,
    required: true,
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

module.exports = mongoose.model('employee',employeeSchema)
