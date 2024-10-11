const conn = require('../Config/ConnectDB')


exports.checkData = async (req, res) =>{
    try {
        //
        const {hospital_code, y_visit} = req.query;
        const sql = "SELECT * FROM opd_visits WHERE hospital_code =? AND y_visit=?";
        conn.query(sql, [hospital_code,y_visit], (err, results)=>{
            if (err) throw err;
            return res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}



exports.saveOpdVisit = async (req, res) => {
    try {
        //Code
        const sql = "INSERT INTO `opd_visits` (`hospital_code`,`in_zone`, `outside_refer`, `outside_non_refer`, `m_visit`, `y_visit`, `officer`) VALUES (?)";
        const values = [
            req.body.hospital_code,
            req.body.in_zone,
            req.body.outside_refer,
            req.body.outside_non_refer,
            req.body.m_visit,
            req.body.y_visit,
            req.body.officer
        ]
        conn.query(sql, [values], (err, results) => {
            if (err) throw err;
            return res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.saveOpdVisitList = async (req, res) => {
    try {
        //Code
        req.body.forEach(element => {
            const sql = "INSERT INTO `opd_visits` (`hospital_code`,`in_zone`, `outside_refer`, `outside_non_refer`, `m_visit`, `y_visit`, `officer`) VALUES (?)";
            const values = [
                element.hospital_code,
                element.in_zone,
                element.outside_refer,
                element.outside_non_refer,
                element.m_visit,
                element.y_visit,
                element.officer
            ]
            conn.query(sql, [values], (err, results) => {
                if (err) {
                    return res.send(err)
                }
                
            })
            
        });
        return res.send('Save data success!!!')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Server Error!')
    }
}


exports.getOpdVisitByID = async (req, res) => {
    try {
        //Code
        const sql = "SELECT * FROM opd_visits WHERE `id`=?"
        conn.query(sql, [req.params.id], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.getListVisit = async (req, res) => {
    try {
        //Code
        const sql = "SELECT tb1.id, tb1.hospital_code, tb2.hospital_name," +
            "tb1.in_zone, tb1.outside_refer," +
            "tb1.outside_non_refer, tb1.officer," +
            "tb1.y_visit, tb1.m_visit, tb1.d_update" +
            " FROM `opd_visits` AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " ORDER BY id ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        }
        );
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error!')
    }
}


exports.getListVisitByHosp = async (req, res) => {
    try {
        //Code
        const sql = "SELECT tb1.id AS id, tb1.hospital_code AS hospital_code," +
            "tb2.hospital_name AS hospital_name," +
            "tb1.in_zone AS in_zone," +
            "tb1.outside_refer AS outside_refer," +
            "tb1.outside_non_refer AS outside_non_refer," +
            "tb1.m_visit AS m_visit," +
            "tb1.y_visit AS y_visit," +
            "tb1.officer AS officer," +
            "tb1.d_update AS d_update" +
            " FROM `opd_visits` AS tb1" +
            " INNER JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.hospital_code=?"
        conn.query(sql, [req.user.hospital_code], (err, results) => {
            if (err) throw err;
            res.json(results)
        }
        );
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error!')
    }
}


exports.filtertVisit = async (req, res) => {
    try {
        //Code
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error!')
    }
}


exports.updateOpdVisit = async (req, res) => {
    try {
        //Code
        const sql = "UPDATE opd_visits SET `hospital_code`=?,`in_zone`=?, `outside_refer`=?,`outside_non_refer`=?,`m_visit`=?,`y_visit`=?,`officer`=?,`d_update`=? WHERE `id`=?";
        conn.query(sql, [req.body.hospital_code,
        req.body.in_zone,
        req.body.outside_refer,
        req.body.outside_non_refer,
        req.body.m_visit,
        req.body.y_visit,
        req.body.officer,
        req.body.d_update,
        req.params.id], (err, results) => {
            if (err) throw err;
            if (results) {
                res.send('แก้ไขข้อมูลสำเร็จ!')
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error!')
    }
}

exports.removeVisit = async (req, res) => {
    try {
        //Code
        const sql = "DELETE FROM opd_visits WHERE id=?";
        conn.query(sql, req.params.id, (err, results) => {
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