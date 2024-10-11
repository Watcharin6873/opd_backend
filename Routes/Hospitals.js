const express = require('express')
const router = express.Router()
const { listHospitals, getHospital, getProvPhase,listHospitals2 } = require('../Controllers/Hospitals')
const { auth } = require('../Middleware/Auth')


router.get('/getListHospitals', auth, listHospitals)

router.get('/getListHospitals2', listHospitals2)

router.get('/getHospital', auth, getHospital)

router.get('/getProvPhase',auth, getProvPhase)


module.exports = router