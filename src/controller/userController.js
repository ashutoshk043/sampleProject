require('dotenv').config()
const mongoose = require('mongoose')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const createUser = async (req, res) => {

    let { name, email, password } = req.body

    if (!name) {
        res.send({ status: false, message: "Name is required" })
    }
    if (!email) {
        res.send({ status: false, message: "email is required" })
    }
    if (!password) {
        res.send({ status: false, message: "password is required" })
    }
    let storedData = await userModel.create(req.body)
    if (!storedData) {
        res.send({ status: false, message: "error in storing" })
    }

    res.send(storedData)
}

// ---------------------------------------------------------------------------

const loginUser = async(req, res) => {
    const { email, password } = req.body
    if (!email) {
        res.send({ starus: false, messsge: "email required" })
    }
    if (!password) {
        res.send({ starus: false, messsge: "Password required" })
    }

    let findUser = await userModel.findOne({email})
    

    if(!findUser){
        res.send({"status":false, message:"user Does not exists!!!"})
    }
    if(findUser.password!== password){
        res.send({"status":false, message:"Incorrect Password"})
    }
    // console.log(findUser)
   let token =  jwt.sign({
        data: `${findUser}`,
      }, process.env.secreate_key, { expiresIn: '1h' });
    //   console.log(token)

      res.send({status:true, message:"logged In", token: token})
}



module.exports = { createUser, loginUser }