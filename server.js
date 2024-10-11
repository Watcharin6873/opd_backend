const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { readdirSync } = require('fs')
const morgan = require('morgan')
const {rateLimit} = require('express-rate-limit')


// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // หน่วยเวลาเป็น มิลลิวินาที ในนี้คือ 15 นาที (1000 มิลลิวินาที = 1 วินาที)
//     max: 1000, // จำนวนการเรียกใช้สูงสุดต่อ IP Address ต่อเวลาใน windowMS
//     standardHeaders: true, // คืน rate limit ไปยัง `RateLimit-*` ใน headers 
//     legacyHeaders: false, // ปิด `X-RateLimit-*` ใน headers  
// })



const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())


readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/'+r)));


const port = process.env.PORT;

app.listen(port, ()=>{
    console.log('Server is running on port'+port)
})
