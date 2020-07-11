const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
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
    type: Schema.Types.ObjectId,
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
  },
  active:{
    type: Boolean,
    default: true
  }
})

employeeSchema.methods.getToken = function(){
  return jwt.sign({_id: this._id, type: this.type},'secret')
}

module.exports = mongoose.model('employee',employeeSchema)
