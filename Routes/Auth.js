const express = require('express')
const router = express.Router()

const { login, currentUser } = require('../Controllers/Auth')
const { auth } = require('../Middleware/Auth')


router.post('/login', login)

router.post('/currentUser', auth, currentUser)



module.exports = router