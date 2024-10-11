const express = require('express')
const router = express.Router()
const { 
    sumHospTypeAllOpd,
    sumHospTypeInZone,
    sumHospTypeAllOutside,
    sumHospTypeOutsideRefer,
    sumHospTypeOutsiteNonRefer,
    sumAllOpdhosp,
    sumOpdInzoneHosp,
    sumAllOpdOutsideHosp,
    sumOpdOutsideReferHosp,
    sumOpdOutsideNonReferHosp
} = require('../Controllers/ApiGraph')
const {auth} = require('../Middleware/Auth')


router.get('/sumHospTypeAllOpd',auth, sumHospTypeAllOpd)

router.get('/sumHospTypeInZone', auth, sumHospTypeInZone)

router.get('/sumHospTypeAllOutside', auth, sumHospTypeAllOutside)

router.get('/sumHospTypeOutsideRefer', auth, sumHospTypeOutsideRefer)

router.get('/sumHospTypeOutsiteNonRefer', auth, sumHospTypeOutsiteNonRefer)

router.get('/getSumAllOpdHosp', auth, sumAllOpdhosp)

router.get('/getSumOpdInzoneHosp', auth, sumOpdInzoneHosp)

router.get('/getSumAllOpdOutsideHosp', auth, sumAllOpdOutsideHosp)

router.get('/getSumOpdOutsideReferHosp', auth, sumOpdOutsideReferHosp)

router.get('/getSumOpdOutsideNonReferHosp', auth, sumOpdOutsideNonReferHosp)


module.exports = router