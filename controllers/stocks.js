const Item = require('../models/Item')
const Product = require('../models/Product')
const Import = require('../models/Import')

const stocks = async (req,res) => {
  const imports = await Import.find({ item: req.params.id })
  return res.send(imports)
}


module.exports = {
  stocks
}
