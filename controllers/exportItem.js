const Export = require('../models/Export')
const Import = require('../models/Import')
const Item = require('../models/Item')
const { exportItemValidator } = require('../validators/export')
const saleController = require('../utils/saleController')







const addItemInExport = async (req,res) => {

  const { error, isValid } = exportItemValidator(req.body)
  if(!isValid) return res.status(400).send(error)

  const { export: exportId, item, quantity ,pp ,vat , mrp, subItems} = req.body

  const getExport = await Export.findById(exportId)
  if(!getExport) return res.status(400).send("Not found!")

  const imports = await Import.find({ item })

  saleController(imports,req.body)

  const exportItem = { item, quantity, pp, vat, mrp, subItems }
  getExport.products.push(exportItem)



  await getExport.save()
  if(!getExport) return res.status(500).send("Something wrong!")
  return res.status(201).send(exportItem)
}

module.exports = {
  addItemInExport
}
