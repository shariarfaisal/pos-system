const Import = require('../models/Import')
const { importValidator } = require('../validators/import')

const imports = async (req,res) => {
  const imports = await Import.find().populate('vendor').populate('employee').populate('item').populate('subItems.item')
  if(!imports) return res.status(500).send("Something wrong!")
  return res.status(200).send(imports)
}

const getImport = async (req,res) => {
  const impt = await Import.findById(req.params.id).populate('vendor').populate('employee').populate('item').populate('subItems.item')
  if(!impt) return res.status(400).send("Not found!")
  return res.status(200).send(impt)
}

const createImport = async (req,res) => {
  const { vendor, item, subItems, quantity, pp, vat, expireDate, importDate } = req.body
  const { error, isValid } = importValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  const impt = new Import({ vendor,
     employee: req.employee._id,
     item,
     subItems: subItems.length > 0 ? subItems : [],
     quantity: quantity ? quantity: 0,
     pp: pp? pp: 0,
     vat: vat? vat: 0,
     expireDate: expireDate? expireDate: '',
     importDate: importDate?importDate: '' })

  await impt.save()
  if(!impt) return res.status(500).send("Something wrong!")
  return res.status(201).send(impt)
}


// const updateImport = async (req,res) => {
//
// }

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
  // updateImport,
  deleteImport
}
