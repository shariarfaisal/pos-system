const Export = require('../models/Export')
const mongoose = require('mongoose')

// const exportValidator = (data) => {
//   const error = {}
//   if(!branch) error.branch = "Branch required!"
//   if(branch && !mongoose.Types.ObjectId.isValid(branch)){
//     error.branch = "Invalid branch ID!"
//   }
//   return { error, isValid: Object.keys(error).length === 0}
// }

const getExports = async (req,res) => {
  const values = await Export.find().populate('request').populate(' products.subItems.item ')
  if(!values) return res.status(500).send(values)
  return res.status(200).send(values)
}

const getExport = async (req,res) => {
  const value = await Export.findById(req.params.id).populate('request').populate('products.subItems.item')
  if(!value) return res.status(400).send("Not found")
  return res.status(200).send(value)
}

const createExport = async (req,res) => {
  // const { request } = req.body
  // // Branch ID validation ...
  // if(!request) return res.status(400).send({requset: "Request ID required!"})
  // if(request && !mongoose.Types.ObjectId.isValid(request)){
  //   return res.status(400).send({request:"Invalid Request ID!"})
  // }
  //
  // const getExport = new Export({ request, employee: req.employee._id, products:[] })
  // await getExport.save()
  // if(!getExport) return res.status(400).send("Something wrong!")
  // return res.status(201).send(getExport)

  return res.send({msg: 'Request will create from acceptRequest...'})
}

const deleteExport = async (req,res) => {
  const value = await Export.findByIdAndDelete(req.params.id)
  if(!value) return res.status(400).send("Not found")
  return res.status(200).send(value)
}


module.exports = {
  getExports,
  getExport,
  createExport,
  deleteExport
}
