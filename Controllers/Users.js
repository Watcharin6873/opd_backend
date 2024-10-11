const conn = require('../Config/ConnectDB')
const bcrypt = require('bcrypt')
const salt = 10;


exports.createUser = async (req, res) => {
    try {
        //Code
        const sql = "INSERT INTO `opd_users` (`hospital_code`, `prefix`, `f_name`, `l_name`, `job_position`, `username`, `password`) VALUES (?)";
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                console.log(err)
            }

            const values = [
                req.body.hospital_code,
                req.body.prefix,
                req.body.f_name,
                req.body.l_name,
                req.body.job_position,
                req.body.username,
                hash
            ]
            conn.query(sql, [values], (err, results) => {
                return res.json(results)
            }
            )
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
}


exports.getListUsers = async (req, res) => {
    try {
        //Code
        const sql = "SELECT * FROM `opd_users`";
        conn.query(sql, (err, results) => {
            return res.json(results)
        }
        )
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
}


exports.getUser = async (req, res) => {
    try {
        //Code
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
}

exports.updateUser = async (req, res) => {
    try {
        //Code
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
}


exports.removeUser = async (req, res) => {
    try {
        //Code
        const { user_id } = req.params;
        console.log(user_id)
        const sql = "DELETE FROM opd_users WHERE user_id = ?";
        conn.query(sql, [req.params.user_id], (err, results) => {
            if (err) throw err;
            if (results) {
                res.send('ลบข้อมูลเรียบร้อยแล้ว!')
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error!')
    }
}


exports.resetPassword = async (req, res) => {
    try {
        //Code
        const { user_id, password } = req.body;
        const encryptPass = await bcrypt.hash(password, salt)
        console.log(encryptPass)
        const sql = "UPDATE opd_users SET `password`=? WHERE `user_id`=?";
        conn.query(sql, [encryptPass, user_id], (err, results) => {
            if (err) throw err;
            if (results) {
                res.send('Reset Password เรียบร้อยแล้ว!!')
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
}