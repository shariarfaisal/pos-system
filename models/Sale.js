const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new Schema({
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'exportItem'
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


module.exports = mongoose.model('sale',saleSchema)
