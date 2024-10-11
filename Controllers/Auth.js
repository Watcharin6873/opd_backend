const conn = require('../Config/ConnectDB')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = "mophRefer@2024"

const { lineNotify } = require('../function/LineNotify')

const line_token = 'W1EINGYqNTMFuMTryCiJloarrGNeJRNuxpk4rGLsBdR';


exports.login = async (req, res) => {
    try {
        //Code
        const sql = "SELECT * FROM `opd_users` WHERE `hospital_code`=? AND `username`=?";
        const values = [req.body.hospital_code, req.body.username]
        conn.query(sql, values, (err, data) => {
            if (err) throw err;            
            if (data.length > 0) {
                bcrypt.compare(req.body.password, data[0].password, (err, response)=>{
                    if (err) throw err;

                    if (response){
                        const payload = {
                            user:{
                                user_id: data[0].user_id,
                                hospital_code: data[0].hospital_code,
                                f_name: data[0].f_name,
                                l_name: data[0].l_name,
                                username: data[0].username,
                                level: data[0].level
                            }
                        }

                        const msg = payload.username + "ล็อกอินเรียบร้อยแล้ว!!";
                        lineNotify(line_token, msg)

                        jwt.sign(payload, secret, {expiresIn: '1h'}, (err, token)=>{
                            if (err) throw err;
                            return res.json({token, payload})
                        })
                    }else{
                        res.status(400).send('Password ไม่ถูกต้อง!')
                    }
                })
            }else{
                return res.status(400).send('ไม่พบ User กรุณาสมัครเข้าใช้งาน!')
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.currentUser = async (req, res) =>{
    try {
        //Code
        const sql = "SELECT `user_id`, `hospital_code`,`f_name`,`l_name`,`username`,`level` FROM `opd_users` WHERE `username`=? AND hospital_code=?";
        conn.query(sql, [req.user.username,req.user.hospital_code], (err, data)=>{
            if(err) throw err;
            res.json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}