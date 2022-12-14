require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const router = require('./route/router')
const app = express()

// parse application/json
app.use(bodyParser.json())

mongoose.connect(process.env.DB, (err, doc)=>{
    if(!err){
        console.log("Database Connected")
    }else{
        console.log("Database error" + err)
    }
})

app.use('/', router)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})