const express = require('express')
const router = express.Router()
const {createUser, loginUser} = require('../controller/userController')
const {createAdmin,loginAdmin} = require('../controller/adminController')




router.post('/createUser', createUser)
router.post('/loginUser', loginUser)
router.post('/createAdmin', createAdmin)
router.post('/loginAdmin', loginAdmin)



module.exports = router

