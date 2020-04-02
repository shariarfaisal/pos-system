const ExportRequest = require('../models/ExportRequest')
const Item = require('../models/Item')
const SubItem = require('../models/SubItem')

const branchRequests = async (req,res) => {
  const rqsts = await ExportRequest.find({ branch: req.branch._id })
  return res.status(200).send(rqsts)
}

const requests = async (req,res) => {
  const query = {}
  if(req.query.status) query.status = req.query.status
  if(req.query.branch) query.branch = req.query.branch
  const results = await ExportRequest.find(query).select(' -items ')
  return res.status(200).send(results)
}

const request = async (req,res) => {
  const request = await ExportRequest.findById(req.params.requestId).populate('items.item').populate('items.subItems.item')
  if(!request) return res.status(404).send({msg: "Not Found!"})
  return res.status(200).send(request)
}

const createRequest = async (req,res) => {
  const { title, message } = req.body
  if(!title) return res.status(400).send({title: "Title required!"})
  if(title.length > 100) return res.status(400).send({title: "Title must be in 100 characters!"})
  if(message.length > 1000) return res.status(400).send({note: "Message must be in 1000 characters"})
  const create = new ExportRequest({
    branch: req.branch._id,
    title,
    message,
    items: [],
    status: 'create',
  })
  await create.save()
  return res.status(201).send(create)
}

const sendRequest = async (req,res) => {
  const exists = await ExportRequest.findById(req.params.requestId)
  if(!exists) return res.status(404).send({msg: "Request not found!"})

  const sendRqst = await ExportRequest.findByIdAndUpdate(req.params.requestId,{$set:{ status: 'pending'}},{new: true})
  return res.status(200).send(sendRqst)
}

const cancelRequest = async (req,res) => {
  const exists = await ExportRequest.findById(req.params.requestId)
  if(!exists) return res.status(404).send({msg: "Request not found!"})
  if(exists.status !== 'pending') return res.status({msg: "The Request is not cancel able at this moment!"})
  const cancel = await ExportRequest.findByIdAndUpdate(req.params.requestId,{$set:{ status: 'create' }},{new: true})
  return res.status(200).send({status: cancel.status})
}

const removeRequest = async (req,res) => {
  const remove = await ExportRequest.findByIdAndDelete(req.params.requestId)
  if(!remove) return res.status(404).send({msg: "Request Not Found!"})
  return res.status(200).send(remove)
}

const addItemToRequest = async (req,res) => {
  const { code, quantity } = req.body

  if(!code) return res.status(400).send({code: "Code required!"})
  if(!quantity && quantity != 0) return res.status(400).send({quantity: "Quantity required"})

  if(quantity != 0 && !(Number(quantity) > -1)) return res.status(400).send({quantity: "Quantity must be a positive number!"})

  const request = await ExportRequest.findById(req.params.requestId)
  if(!request) return res.status(404).send({msg: "Export Request Not Found!"})

  const getItem = await Item.findOne({ code })
  if(!getItem) return res.status(404).send({code: "Item not found!"})

  const index = request.items.push({ item: getItem._id, quantity: Number(quantity) })
  await request.save()
  return res.status(201).send(request.items[index-1])
}

const addSubItemToRequest = async (req,res) => {
  const { code, quantity } = req.body

  const request = await ExportRequest.findOne({ _id: req.params.requestId, branch: req.branch._id})
  if(!request) return res.status(404).send({msg: "Export Request Not Found!"})


  const reqItem = request.items.find(i => i._id.toString() === req.params.itemId)

  if(!reqItem) return res.status(404).send({msg: "Item Not Found!"})

  const subItem = await SubItem.findOne({ code, item: reqItem.item })
  if(!subItem) return res.status(404).send({msg: "Code isn't valid!"})


  const exists = reqItem.subItems.find(i => i.item.toString() === subItem._id.toString())
  if(exists) return res.status(400).send({msg: 'Sub Item already exists!'})

  const index = reqItem.subItems.push({ item: subItem._id, quantity })
  await request.save()
  const resItem = request.items.find(i => i._id.toString() === req.params.itemId).subItems[index-1]
  return res.status(201).send(resItem)
}

const removeItem = async (req,res) => {
  const request = await ExportRequest.findOne({ _id: req.params.requestId, branch: req.branch._id })
  if(!request) return res.status(404).send({msg: "Export Request Not Found!"})

  const index = request.items.findIndex(i => i._id.toString() === req.params.itemId.toString())
  if(index === -1) return res.status(404).send({msg: "Item not found!"})

  const deleteItem = request.items[index]
  request.items.splice(index,1)
  await request.save()
  return res.status(200).send(deleteItem)
}

const removeSubItem = async (req,res) => {
  const request = await ExportRequest.findOne({ _id: req.params.requestId, branch: req.branch._id })
  if(!request) return res.status(404).send({msg: "Export Request Not Found!"})

  const item = request.items.find(i => i._id.toString() === req.params.itemId.toString())
  if(!item) return res.status(404).send({msg: "Item not found!"})


  const subIndex = item.subItems.findIndex(i => i._id.toString() === req.params.subItemId.toString())
  if(subIndex === -1) return res.status(404).send({msg: "Sub Item not found!"})

  const deleteItem = item.subItems[subIndex]
  item.subItems.splice(subIndex,1)
  await request.save()
  return res.status(200).send(deleteItem)
}

module.exports = {
  branchRequests,
  requests,
  request,
  createRequest,
  sendRequest,
  cancelRequest,
  removeRequest,
  addItemToRequest,
  addSubItemToRequest,
  removeItem,
  removeSubItem
}
