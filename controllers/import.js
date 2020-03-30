const Import = require('../models/Import')
const { importValidator, updateValidator, itemValidator } = require('../validators/import')


const getTotal = (impt) => {
  let total = 0
   total += (impt.quantity * impt.pp)
   if(impt.subItems && (impt.subItems.length !== 0)){
     impt.subItems.forEach(i => {
       total += i.quantity * i.pp
     })
   }
   if(impt.vat) total += (total * impt.vat) / 100
   return total
}


// Get All Imports ...
const imports = async (req,res) => {
  const imports = await Import.find().populate('vendor').populate('employee')
  if(!imports) return res.status(500).send("Something wrong!")
  return res.status(200).send(imports)
}


const activeImport = async (req,res) => {
  const imports = await Import.find()
                        .where('employee').equals(req.employee._id)
                        .where('importDate').gt(req.query.gt).lt(req.query.lt)
                        .populate('vendor').populate('employee')
  if(!imports) return res.status(500).send({msg: "Server error!"})
  return res.status(200).send(imports)
}


// Get Single Import
const getImport = async (req,res) => {
  const impt = await Import.findById(req.params.id)
    .populate('vendor')
    .populate('employee')
    .populate('items.item')
    .populate('items.subItems.item')
  if(!impt) return res.status(400).send("Not found!")
  return res.status(200).send(impt)
}


// Create New Import ...
const createImport = async (req,res) => {
  const { vendor, importDate, title, note } = req.body
  const { error, isValid } = importValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  const impt = new Import({
     vendor,
     title,
     note,
     employee: req.employee._id,
     total: 0,
     items:[],
     importDate: importDate? importDate : Date.now()
   })

  await impt.save()
  if(!impt) return res.status(500).send("Something wrong!")
  return res.status(201).send(impt)
}


// Add Item in Import ....
const addImportItem = async (req,res) => {
  const { item, quantity, pp, expireDate } = req.body
  const { error, isValid } = itemValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  const impt = await Import.findById(req.params.importId)
  if(!impt) return res.status(404).send({msg: "Import Not Found!"})

  const newItem = {
    item,
    quantity: quantity ? quantity : 0,
    pp: pp ? pp : 0,
    expireDate: expireDate ? expireDate : '',
    subItems:[]
  }

  const itemIndex = impt.items.push(newItem)
  await impt.save()

  return res.status(201).send(impt.items[itemIndex-1])
}



// Add SubItem in Item ...
const addImportSubItem = async (req,res) => {
  const { item, quantity, pp, expireDate } = req.body
  const { error, isValid } = itemValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  const impt = await Import.findById(req.params.importId)
  if(!impt) return res.status(404).send({msg: "Import Not Found!"})

  const getItem = impt.items.find(i => i._id.toString() === req.params.itemId)
  if(!getItem) return res.status(404).send({msg: "Item Not Found!"})

  const newSubItem = {
    item,
    quantity: quantity ? quantity : 0,
    pp: pp ? pp : 0,
    expireDate: expireDate ? expireDate : '',
  }

  const index = getItem.subItems.push(newSubItem)
  await impt.save()
  const result = impt.items.find(i => i._id.toString() === req.params.itemId)
  return res.status(201).send(result.subItems[index-1])
}

const deleteImportSubItem = async (req,res) => {
  const impt = await Import.findById(req.params.importId)
  if(!impt) return res.status(404).send({msg: "Import Not Found!"})

  const imptItem = impt.items.find(i => i._id.toString() === req.params.itemId)
  if(!imptItem) return res.status(404).send({msg: "Import Item Not Found!"})

  const imptSubItemIndex = imptItem.subItems.findIndex(i => i._id.toString() === req.params.subItemId)
  if(imptSubItemIndex === -1) return res.status(404).send({msg: "Import Sub Item Not Found!"})

  const deletedSubItem = imptItem.subItems[imptSubItemIndex]
  imptItem.subItems.splice(imptSubItemIndex,1)

  await impt.save()
  return res.status(200).send(deletedSubItem)
}

// Update Import
const updateImport = async (req,res) => {
  const { quantity, importDate, expireDate, isActive, pp, vat } = req.body
  const { error, isValid } = updateValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  let impt = await Import.findById(req.params.id)
  if(!impt) return res.status(400).send("Not found!")

  impt.quantity = quantity
  impt.importDate = importDate ? importDate: Date.now()
  impt.expireDate = expireDate? expireDate: ''
  impt.isActive = isActive
  impt.pp = pp
  impt.vat = vat ? vat : 0
  impt.total = getTotal(impt)


  await impt.save()
  if(!impt) return res.status(500).send("Something wrong!")
  return res.status(200).send(impt)
}

// Delete Import ....
const deleteImport = async (req,res) => {
  const exists = await Import.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await Import.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  return res.status(200).send(deleted)
}


module.exports = {
  imports,
  getImport,
  createImport,
  updateImport,
  deleteImport,
  addImportItem,
  addImportSubItem,
  deleteImportSubItem,
  activeImport
}
