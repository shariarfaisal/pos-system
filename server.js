const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/',(req,res,next) => {
  res.send('Hello world')
})

const PORT = 1000
app.listen(PORT,() => {
  console.log("Server running!");
})
