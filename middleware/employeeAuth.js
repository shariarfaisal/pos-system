const jwt = require('jsonwebtoken')

const employeeAuth = (req,res,next) => {
  const token = req.header('employee-token')
  if(!token) return res.status(401).send({error: "You are not authenticated!"})
  try{
    const decoded = jwt.verify(token,'secret')
    req.employee = decoded
    next()
  }catch(err){
    return res.status(400).send({error: "Authentication failed!"})
  }
}

module.exports = employeeAuth
