const express = require('express')
const router = express.Router()
const { 
    saveOpdVisit, 
    saveOpdVisitList, 
    getOpdVisitByID, 
    getListVisit, 
    getListVisitByHosp, 
    filtertVisit, 
    removeVisit, 
    updateOpdVisit,
    checkData } = require('../Controllers/SaveOpdVisit')
const { auth } = require('../Middleware/Auth')


router.get('/checkData', auth, checkData)

router.post('/saveOpdVisit',auth, saveOpdVisit)

router.post('/saveOpdVisitList',auth, saveOpdVisitList)

router.get('/getOpdVisitByID/:id', auth, getOpdVisitByID)

router.get('/getListVisitByHosp',auth, getListVisitByHosp)

router.get('/getListVisit',auth, getListVisit)

router.get('/filterVisit',auth, filtertVisit)

router.put('/updateOpdVisit/:id',auth, updateOpdVisit)

router.delete('/removeVisit/:id',auth, removeVisit)


module.exports = router