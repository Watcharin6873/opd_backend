const express = require('express')
const router = express.Router()

const { createUser, getListUsers, getUser, updateUser, removeUser, resetPassword } = require('../Controllers/Users')
const { auth } = require('../Middleware/Auth')


router.post('/createUser', createUser)

router.get('/getListUsers', auth, getListUsers)

router.put('/resetPassword/:id', auth, resetPassword)

router.delete('/removeUser/:user_id',auth, removeUser)



module.exports = router