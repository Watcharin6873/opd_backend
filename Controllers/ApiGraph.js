const conn = require('../Config/ConnectDB')


exports.sumHospTypeAllOpd = async (req, res) => {
    try {
        //Code
        const { zone, provcode } = req.query;
        const sql = "SELECT t1.zone,t1.provcode,t1.provname,t1.phase,t1.period," +
            "sum(case when t1.typename = 'โรงพยาบาลศูณย์' then t1.opdvisit else 0 end) AS hcentre," +
            "sum(case when t1.typename = 'โรงพยาบาลทั่วไป' then t1.opdvisit else 0 end) AS hnormal," +
            "sum(case when t1.typename = 'โรงพยาบาลชุมชน' then t1.opdvisit else 0 end) AS hlocal" +
            " FROM (SELECT tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.in_zone+tb1.outside_refer+tb1.outside_non_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.y_visit in ('2023','2024')" +
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename, concat(tb1.y_visit, '-', tb1.m_visit)) AS t1" +
            " WHERE t1.zone=? AND t1.provcode=?" +
            " GROUP BY t1.zone,t1.provcode,t1.provname,t1.phase,t1.period  ORDER BY t1.period ASC";
        conn.query(sql, [zone, provcode], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumHospTypeInZone = async (req, res) => {
    try {
        //Code
        const { zone, provcode } = req.query;
        const sql = "SELECT t1.zone,t1.provcode,t1.provname,t1.phase,t1.period," +
            "sum(case when t1.typename = 'โรงพยาบาลศูณย์' then t1.opdvisit else 0 end) AS hcentre," +
            "sum(case when t1.typename = 'โรงพยาบาลทั่วไป' then t1.opdvisit else 0 end) AS hnormal," +
            "sum(case when t1.typename = 'โรงพยาบาลชุมชน' then t1.opdvisit else 0 end) AS hlocal" +
            " FROM (SELECT tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.in_zone) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.y_visit in ('2023','2024')" +
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename, concat(tb1.y_visit, '-', tb1.m_visit)) AS t1" +
            " WHERE t1.zone=? AND t1.provcode=?" +
            " GROUP BY t1.zone,t1.provcode,t1.provname,t1.phase,t1.period  ORDER BY t1.period ASC";
        conn.query(sql, [zone, provcode], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumHospTypeAllOutside = async (req, res) => {
    try {
        //Code
        const { zone, provcode } = req.query;
        const sql = "SELECT t1.zone,t1.provcode,t1.provname,t1.phase,t1.period," +
            "sum(case when t1.typename = 'โรงพยาบาลศูณย์' then t1.opdvisit else 0 end) AS hcentre," +
            "sum(case when t1.typename = 'โรงพยาบาลทั่วไป' then t1.opdvisit else 0 end) AS hnormal," +
            "sum(case when t1.typename = 'โรงพยาบาลชุมชน' then t1.opdvisit else 0 end) AS hlocal" +
            " FROM (SELECT tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.outside_refer+tb1.outside_non_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.y_visit in ('2023','2024')" +
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename, concat(tb1.y_visit, '-', tb1.m_visit)) AS t1" +
            " WHERE t1.zone=? AND t1.provcode=? " +
            " GROUP BY t1.zone,t1.provcode,t1.provname,t1.phase,t1.period  ORDER BY t1.period ASC";
        conn.query(sql, [zone, provcode], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumHospTypeOutsideRefer = async (req, res) => {
    try {
        //Code
        const { zone, provcode } = req.query;
        const sql = "SELECT t1.zone,t1.provcode,t1.provname,t1.phase,t1.period," +
            "sum(case when t1.typename = 'โรงพยาบาลศูณย์' then t1.opdvisit else 0 end) AS hcentre," +
            "sum(case when t1.typename = 'โรงพยาบาลทั่วไป' then t1.opdvisit else 0 end) AS hnormal," +
            "sum(case when t1.typename = 'โรงพยาบาลชุมชน' then t1.opdvisit else 0 end) AS hlocal" +
            " FROM (SELECT tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.outside_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.y_visit in ('2023','2024')" +
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename, concat(tb1.y_visit, '-', tb1.m_visit)) AS t1" +
            " WHERE t1.zone=? AND t1.provcode=? " +
            " GROUP BY t1.zone,t1.provcode,t1.provname,t1.phase,t1.period  ORDER BY t1.period ASC";
        conn.query(sql, [zone, provcode], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumHospTypeOutsiteNonRefer = async (req, res) => {
    try {
        //Code
        const { zone, provcode } = req.query;
        const sql = "SELECT t1.zone,t1.provcode,t1.provname,t1.phase,t1.period," +
            "sum(case when t1.typename = 'โรงพยาบาลศูณย์' then t1.opdvisit else 0 end) AS hcentre," +
            "sum(case when t1.typename = 'โรงพยาบาลทั่วไป' then t1.opdvisit else 0 end) AS hnormal," +
            "sum(case when t1.typename = 'โรงพยาบาลชุมชน' then t1.opdvisit else 0 end) AS hlocal" +
            " FROM (SELECT tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.outside_non_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.y_visit in ('2023','2024')" +
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb2.phase,tb2.typename, concat(tb1.y_visit, '-', tb1.m_visit)) AS t1" +
            " WHERE t1.zone=? AND t1.provcode=?  " +
            " GROUP BY t1.zone,t1.provcode,t1.provname,t1.phase,t1.period  ORDER BY t1.period ASC";
        conn.query(sql, [zone, provcode], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumAllOpdhosp = async (req, res) => {
    try {
        //Code
        const { hospital_code } = req.query;
        const sql = "SELECT tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code,tb2.hospital_name," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.in_zone+tb1.outside_refer+tb1.outside_non_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.hospital_code = ?"+
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code," +
            " tb2.hospital_name, concat(tb1.y_visit, '-', tb1.m_visit) ORDER BY period ASC";
        conn.query(sql, [hospital_code], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumOpdInzoneHosp = async (req, res) => {
    try {
        //Code
        const { hospital_code } = req.query;
        const sql = "SELECT tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code,tb2.hospital_name," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.in_zone) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.hospital_code = ?"+
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code," +
            " tb2.hospital_name, concat(tb1.y_visit, '-', tb1.m_visit) ORDER BY period ASC";
        conn.query(sql, [hospital_code], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.sumAllOpdOutsideHosp = async (req, res) => {
    try {
        //Code
        const { hospital_code } = req.query;
        const sql = "SELECT tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code,tb2.hospital_name," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.outside_refer+tb1.outside_non_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.hospital_code = ?"+
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code," +
            " tb2.hospital_name, concat(tb1.y_visit, '-', tb1.m_visit) ORDER BY period ASC";
        conn.query(sql, [hospital_code], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.sumOpdOutsideReferHosp = async (req, res) => {
    try {
        //Code
        const { hospital_code } = req.query;
        const sql = "SELECT tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code,tb2.hospital_name," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.outside_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.hospital_code = ?"+
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code," +
            " tb2.hospital_name, concat(tb1.y_visit, '-', tb1.m_visit) ORDER BY period ASC";
        conn.query(sql, [hospital_code], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumOpdOutsideNonReferHosp = async (req, res) => {
    try {
        //Code
        const { hospital_code } = req.query;
        const sql = "SELECT tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code,tb2.hospital_name," +
            "concat(tb1.y_visit, '-', tb1.m_visit) AS period," +
            "SUM(tb1.outside_non_refer) AS opdvisit" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.hospital_code = ?"+
            " GROUP BY tb2.zone,tb2.provcode,tb2.provname,tb1.hospital_code," +
            " tb2.hospital_name, concat(tb1.y_visit, '-', tb1.m_visit) ORDER BY period ASC";
        conn.query(sql, [hospital_code], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}