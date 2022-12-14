const { find } = require('../model/adminModel')
const adminModel = require('../model/adminModel')
const userModel = require('../model/userModel')
const createAdmin = async (req, res) => {

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
    let storedData = await adminModel.create(req.body)
    if (!storedData) {
        res.send({ status: false, message: "error in storing" })
    }

    res.send(storedData)
}

// ---------------------------------------------------------------------------

const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        res.send({ starus: false, messsge: "email required" })
    }
    if (!password) {
        res.send({ starus: false, messsge: "Password required" })
    }

    let findAdmin = await adminModel.findOne({ email })
   


    if (!findAdmin) {
        res.send({ "status": false, message: "user Does not exists!!!" })
    }
    if (findAdmin.password !== password) {
        res.send({ "status": false, message: "Incorrect Password" })
    }
    
    let findAllUser = await userModel.find({})
    // console.log(findAllUser)

    res.send({ status: true, message: "logged In", AllUsers: findAllUser })
}

module.exports = { createAdmin, loginAdmin }