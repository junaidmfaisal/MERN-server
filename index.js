// steps to define a server
// loads .env file content into process .env

 require('dotenv').config()
 const express = require('express')
 const cors = require('cors')
 const router = require("./routes/router")
 require('./database/dbConnection')
 
 const pfServer = express()

 pfServer.use(cors())
 pfServer.use(express.json())
 pfServer.use(router)
 pfServer.use('/uploads',express.static('./uploads'))


 const PORT = 3000 || process.env.PORT

 pfServer.listen(PORT,()=>{
    console.log(`pfserver running in ${PORT}`);
    
 })

 pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style='color:red'> PF server!!! starting at ${PORT}`)
 })

 pfServer.post("/",(req,res)=>{
   res.status(200).send("POST SERVER")
 })