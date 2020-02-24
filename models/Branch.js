const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 255
  },
  username:{
    type: String,
    required: true,
    unique: true,
    max: 25
  },
  email:{
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  phone:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true,
    trim: true,
    max: 255
  },
  password:{
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

branchSchema.methods.getToken = function(){
  return jwt.sign({_id: this._id,username: this.username},'secret')
}


module.exports = mongoose.model('branch',branchSchema)
