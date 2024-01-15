const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
//General Controllers Sign
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Build In Controllers Sign
const resumeController = require('./controller/Resume')

//Literals
const PORT = process.env.PORT  
const mongoUrl = process.env.MONGO_URL
console.log(mongoUrl)

// Connnect to Database
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  useUnifiedTopology: true
})
const connections = mongoose.connection
connections.once("open", () => {
    console.log("Mongodb DB Successfully added !!")
})

// Controller Routes
app.get("/",(req, res)=>{
    res.send({ab:"success"})
})
app.use('/resume', resumeController)

//Server Listen
app.listen(PORT,()=>{
    console.log(`Server is listning at PORT: ${PORT}`)
})