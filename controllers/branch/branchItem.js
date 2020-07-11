const BranchItem = require('../../models/branch/BranchItem')
const SubItem = require('../../models/SubItem')

const branchItems = async (req,res) => {
  const get = await BranchItem.find({ branch: req.branch._id }).populate('item').populate('subItems.item')
  return res.status(200).send(get)
}

const branchItem = async (req,res) => {
  const get = await BranchItem.findOne({ item: req.params.itemId })
  if(!get) return res.status(404).send({msg: "Item not found!"})
  return res.status(200).send(get)
}

const setItem = async (req,res) => {
  let { item } = req.body

  const exists = await BranchItem.findOne({ item, branch: req.branch._id })
  if(exists) return res.status(400).send({ msg: "Item already exists!"})

  let subItems = await SubItem.find({ item })
  subItems = subItems.map(i => {
    return {item: i._id}
  })
console.log(subItems);
  const set = new BranchItem({ branch: req.branch._id, item, subItems })

  await set.save()
  return res.status(201).send(set)
}

const setSubItem = async (req,res) => {
  const { item } = req.body
  let branchItem = await BranchItem.findOne({ branch: req.branch._id, item: req.params.itemId })

  if(!branchItem) {
    let subItems = await SubItem.find({ item })
    subItems = subItems.map(i => i.item)

    branchItem = new BranchItem({ branch: req.branch._id, item: req.params.itemId, subItems:[] })
    await branchItem.save()
  }else{
    const exists = branchItem.subItems.find(i => i.item.toString() === item.toString())
    if(exists) return res.status(400).send({msg: "Already exists!"})
  }

  const index = branchItem.subItems.push({ item })
  await branchItem.save()
  return res.status(201).send(branchItem.subItems[index-1])
}


const removeItem = async (req,res) => {
  const exists = await BranchItem.findOne({ branch: req.branch._id, _id: req.params.id })
  if(!exists) return res.status(404).send({msg: "Item not found!"})

  const getDelete = await BranchItem.findByIdAndDelete(req.params.id)
  return res.status(200).send(getDelete)
}

const removeSubItem = async (req,res) => {
  const branchItem = await BranchItem.findOne({ branch: req.branch._id, item: req.params.itemId })
  if(!branchItem) return res.status(404).send({msg: "Item not found!"})

  const subItemIndex = branchItem.subItems.findIndex(i => i._id.toString() === req.params.subId)
  if(subItemIndex === -1) return res.status(404).send({msg: "Sub Item not found!"})

  const backup = branchItem.subItems[subItemIndex]
  branchItem.subItems.splice(subItemIndex,1)

  await branchItem.save()
  return res.status(200).send(backup)
}

module.exports = {
  branchItems,
  branchItem,
  setItem,
  setSubItem,
  removeItem,
  removeSubItem
}
