const Branch = require('../../models/branch/Branch')
const bcrypt = require('bcryptjs')
const branchValidator = require('../../validators/branch')

// Get All Branchs...
const branchs = async (req,res) => {
  const values = await Branch.find().select(' -password ')
  if(!values) return res.status(500).send("Something wrong!")
  return res.status(200).send(values)
}

// Get Self Info ...
const getMe = async (req,res) => {
  const value = await Branch.findById(req.branch._id).select(' -password ')
  if(!value) return res.status(400).send("Not found!")
  return res.status(200).send(value)
}

// Get One Branch Info By Id ...
const branch = async (req,res) => {
  const value = await Branch.findById(req.params.id).select(' -password ')
  if(!value) return res.status(400).send("Not found!")
  return res.status(200).send(value)
}

// Register New Branch ...
const createBranch = async (req,res) => {
  const { name, username, email, phone, address, password } = req.body
  const { error, isValide } = branchValidator(req.body)
  if(!isValide) return res.status(400).send(error)

  const nameExist = await Branch.findOne({ name })
  if(nameExist) return res.status(400).send({name: "Name taken! Try another name."})
  const emailExist = await Branch.findOne({ email })
  const usernameExist = await Branch.findOne({ username })

  if(emailExist && usernameExist) res.status(400).send({email: 'Email taken!',username: 'Username taken!'})
  if(emailExist) return res.status(400).send({email: 'Email taken!'})
  if(usernameExist) return res.status(400).send({username: 'Username taken!'})

  const branch = new Branch({ name, username, email, phone, address, password })
  const salt = await bcrypt.genSalt(10)
  branch.password = await bcrypt.hash(password,salt)
  await branch.save()
  if(!branch) return res.status(500).send("Something wrong!")
  return res.status(201).send({msg: `Welcome ${branch.name}! Your account created successfully.`})
}

// Login with credentials ...
const login = async (req,res) => {
  const { password } = req.body

  if(!req.body.username && !req.body.email){
    return res.status(400).send({msg: "Username or Email required!"})
  }
  if(!password) return res.status(400).send({msg: "Password required!"})

  const branch = req.body.username ?
    await Branch.findOne({ username: req.body.username }):
     await Branch.findOne({ email: req.body.email })

  if(!branch) return res.status(400).send("Unable to login!")

  const passValid = await bcrypt.compare(password,branch.password)
  if(!passValid) return res.status(400).send("Unable to login!")
  const token = branch.getToken()
  return res.header('branch-token',token).status(200).send(token)
}

// Update info ...
const updateBranch = async (req,res) => {
  const { name, username, email, phone, address } = req.body
  const { error, isValide } = branchValidator(req.body,'update')
  if(!isValide) return res.status(400).send(error)

  const branch = await Branch.findById(req.branch._id)
  if(!branch) return res.status(400).send("Not Found!")

  if(branch.name !== name){
    const nameExist = await Branch.findOne({ name })
    if(nameExist) return res.status(400).send({name: "Name taken! Try another name."})
  }

  if(branch.email !== email){
    const emailExist = await Branch.findOne({ email })
    if(emailExist) return res.status(400).send({email: 'Email taken!'})
  }

  if(branch.username !== username){
    const usernameExist = await Branch.findOne({ username })
    if(usernameExist) return res.status(400).send({username: 'Username taken!'})
  }

  const updated = await Branch.findByIdAndUpdate(req.branch._id,{$set:{ name, username, email, phone, address }},{new: true})
  if(!updated) return res.status(500).send("Something wrong!")
  return res.status(200).send(updated)
}

// Delete account...
const deleteBranch = async (req,res) => {
  const exists = await Branch.findById(req.params.id)
  if(!exists) return res.status(400).send("Not found!")
  const deleted = await Branch.findByIdAndDelete(req.params.id)
  if(!deleted) return res.status(500).send("Something wrong!")
  res.status(200).send(deleted)
}



module.exports = {
  branchs,
  branch,
  getMe,
  createBranch,
  login,
  updateBranch,
  deleteBranch
}
