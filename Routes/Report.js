const express = require('express')
const router = express.Router()
const { 
    getFromUnit, 
    sumVisitAllPhase, 
    reportPhase1, 
    reportPhase1_v2,
    sumVisitPhase2,
    reportPhase2_v2,
    reportPhase3_v2,
    filterProvince,
    reportZone,
    reportZoneSelect,
    reportSendOrNot,
    reportHospsendOrNot,
    forLineNotify,
    forLineNotify2,
    checkListSendData
} = require('../Controllers/Report')
const { auth } = require('../Middleware/Auth')


router.get('/getFromUnit', auth, getFromUnit)

router.get('/sumVisitAllPhase', sumVisitAllPhase)

router.get('/reportPhase1', auth, reportPhase1)

router.get('/reportPhase1_v2', auth, reportPhase1_v2)

router.get('/sumVisitPhase2', sumVisitPhase2)

router.get('/reportPhase2_v2', auth, reportPhase2_v2)

router.get('/reportPhase3_v2', auth, reportPhase3_v2)

router.get('/filterProvince', filterProvince)

router.get('/reportZone',auth, reportZone)

router.get('/reportZoneSelect',auth, reportZoneSelect)

router.get('/getReportSendOrNot', reportSendOrNot)

router.get('/getReportHospSendOrNot', reportHospsendOrNot)

router.get('/forLineNotify', forLineNotify)

router.get('/forLineNotify2', forLineNotify2)

router.get('/checkListSendData', checkListSendData)


module.exports = router