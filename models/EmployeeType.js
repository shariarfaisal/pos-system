const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const accessType = new Schema({
//   data:{ type: Boolean, default: true},
//   create:{ type: Boolean, default: true},
//   update:{ type: Boolean, default: true}
// })

const enums = ['rwud','rw--','rwu-','r---','----']
// '0000','0001','0010','0011','0100','0101','0111','1000','1001',
// '1010','1011','1100','1101','1110','1111'
const employeeTypeSchema = new Schema({
  name:{
    type: String,
    max: 25,
    required: true,
    trim: true,
    lowercase: true
  },
  access:{
    employeeType: {type:String, enum: enums, default: 'rwud'},
    employee: {type:String, enum: enums, default: 'rwud'},
    category: {type:String, enum: enums, default: 'rwud'},
    product: {type:String, enum: enums, default: 'rwud'},
    item: {type:String, enum: enums, default: 'rwud'},
    subItem: {type:String, enum: enums, default: 'rwud'},
    branch: {type:String, enum: enums, default: 'rwud'},
    import: {type:String, enum: enums, default: 'rwud'},
    refund: {type:String, enum: enums, default: 'rwud'},
    export: {type:String, enum: enums, default: 'rwud'},
    exportReturn: {type:String, enum: enums, default: 'rwud'},
    vendor: {type:String, enum: enums, default: 'rwud'},
    sale: {type:String, enum: enums, default: 'rwud'},
    customer: {type:String, enum: enums, default: 'rwud'},
    brand: {type:String, enum: enums, default: 'rwud'},
    order: {type:String, enum: enums, default: 'rwud'},
    review: {type:String, enum: enums, default: 'rwud'}
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('employeeType',employeeTypeSchema)
