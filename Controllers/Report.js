const conn = require('../Config/ConnectDB')
const { lineNotify } = require('../function/LineNotify')

const line_token = 'W1EINGYqNTMFuMTryCiJloarrGNeJRNuxpk4rGLsBdR';


exports.getFromUnit = async (req, res) => {
    try {
        //Code
        const sql = "SELECT date_format(d_update, '%m') AS m_num," +
            "date_format(d_update, '%b') AS m_name," +
            "date_format(d_update, '%Y')+ 543 AS y_thai, " +
            "SUM(in_zone) AS in_zone," +
            "SUM(outside_refer) AS outside_refer," +
            "SUM(outside_non_refer) AS outside_non_refer" +
            " FROM `opd_visits` GROUP BY m_name, m_num, y_thai" +
            " ORDER BY m_num ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumVisitAllPhase = async (req, res) => {
    try {
        //Code
        const { phase, provcode } = req.query;
        const sql = "SELECT tb2.zone,tb2.provcode,tb2.provname," +
            "tb2.phase,tb1.hospital_code," +
            "tb2.hospital_name,tb1.m_visit," +
            "tb1.y_visit,tb1.in_zone," +
            "tb1.outside_refer,tb1.outside_non_refer" +
            " FROM `opd_visits` AS tb1" +
            " INNER JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.y_visit IN ('2023','2024')";
        conn.query(sql, [phase, provcode], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
}


exports.reportPhase1 = async (req, res) => {
    try {
        //Code
        const sql = "SELECT * FROM report_phase1";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}



exports.reportPhase1_v2 = async (req, res) => {
    try {
        //Code
        const sql = "SELECT concat(y_visit,'-',m_visit) AS m_year," +
            "sum(tb1.in_zone) AS in_zone," +
            "sum(tb1.outside_refer) AS outside_refer," +
            "sum(tb1.outside_non_refer) AS outside_non_refer" +
            " FROM opd_visits  AS tb1" +
            " LEFT JOIN hospital_sp tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb2.provcode IN ('45','54','76','96') AND tb1.y_visit IN ('2023','2024')" +
            " GROUP BY m_year ORDER BY m_year ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.sumVisitPhase2 = async (req, res) => {
    try {
        //Code
        const sql = "SELECT tb2.zone,tb2.hospital_code,tb2.hospital_name,tb2.tmbname,tb2.ampname,tb2.provcode, tb2.provname," +
            "tb1.y_visit, tb1.m_visit, sum(tb1.in_zone) AS in_zone," +
            "sum(tb1.outside_refer) AS outside_refer,sum(tb1.outside_non_refer) AS outside_non_refer" +
            " FROM opd_visits AS tb1" +
            " LEFT JOIN hospital_sp tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb2.provcode IN ('30','67','60','37','17','39','82','27')" +
            " GROUP BY tb2.zone,tb2.hospital_code, tb2.hospital_name,tb2.tmbname," +
            "tb2.ampname,tb2.provcode,tb2.provname,tb1.y_visit, tb1.m_visit ORDER BY tb2.zone,tb2.provcode,tb2.hospital_code,tb1.m_visit,tb1.y_visit ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
}


exports.reportPhase2_v2 = async (req, res) => {
    try {
        //Code
        const sql = "SELECT concat(y_visit,'-',m_visit) AS m_year," +
            "sum(tb1.in_zone) AS in_zone," +
            "sum(tb1.outside_refer) AS outside_refer," +
            "sum(tb1.outside_non_refer) AS outside_non_refer" +
            " FROM opd_visits  AS tb1" +
            " LEFT JOIN hospital_sp tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb2.provcode IN ('30','67','60','37','17','39','82','27') AND tb1.y_visit IN ('2023','2024')" +
            " GROUP BY m_year ORDER BY m_year ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.reportPhase3_v2 = async (req, res) => {
    try {
        //Code
        const sql = "SELECT concat(y_visit,'-',m_visit) AS m_year," +
            "sum(tb1.in_zone) AS in_zone," +
            "sum(tb1.outside_refer) AS outside_refer," +
            "sum(tb1.outside_non_refer) AS outside_non_refer" +
            " FROM opd_visits  AS tb1" +
            " LEFT JOIN hospital_sp tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb2.phase = 3  AND tb1.y_visit IN ('2023','2024')" +
            " GROUP BY m_year ORDER BY m_year ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.filterProvince = async (req, res, next) => {
    try {
        //Code
        const { phase, provcode, y_visit } = req.query;
        const sql = "SELECT tb1.hospital_code,tb1.hospital_name,tb1.y_visit,tb1.`status`,"+
                "SUM(CASE WHEN tb1.period='Jan23' THEN tb1.`values` END) AS Jan23,"+
                "SUM(CASE WHEN tb1.period='Feb23' THEN tb1.`values` END) AS Feb23,"+
                "SUM(CASE WHEN tb1.period='Mar23' THEN tb1.`values` END) AS Mar23,"+
                "SUM(CASE WHEN tb1.period='Apr23' THEN tb1.`values` END) AS Apr23,"+
                "SUM(CASE WHEN tb1.period='May23' THEN tb1.`values` END) AS May23,"+
                "SUM(CASE WHEN tb1.period='Jun23' THEN tb1.`values` END) AS Jun23,"+
                "SUM(CASE WHEN tb1.period='Jul23' THEN tb1.`values` END) AS Jul23,"+
                "SUM(CASE WHEN tb1.period='Aug23' THEN tb1.`values` END) AS Aug23,"+
                "SUM(CASE WHEN tb1.period='Sep23' THEN tb1.`values` END) AS Sep23,"+
                "SUM(CASE WHEN tb1.period='Oct23' THEN tb1.`values` END) AS Oct23,"+
                "SUM(CASE WHEN tb1.period='Nov23' THEN tb1.`values` END) AS Nov23,"+
                "SUM(CASE WHEN tb1.period='Dec23' THEN tb1.`values` END) AS Dec23,"+	
                "SUM(CASE WHEN tb1.period='Jan24' THEN tb1.`values` END) AS Jan24,"+
                "SUM(CASE WHEN tb1.period='Feb24' THEN tb1.`values` END) AS Feb24,"+
                "SUM(CASE WHEN tb1.period='Mar24' THEN tb1.`values` END) AS Mar24,"+
                "SUM(CASE WHEN tb1.period='Apr24' THEN tb1.`values` END) AS Apr24,"+
                "SUM(CASE WHEN tb1.period='May24' THEN tb1.`values` END) AS May24,"+
                "SUM(CASE WHEN tb1.period='Jun24' THEN tb1.`values` END) AS Jun24,"+
                "SUM(CASE WHEN tb1.period='Jul24' THEN tb1.`values` END) AS Jul24,"+
                "SUM(CASE WHEN tb1.period='Aug24' THEN tb1.`values` END) AS Aug24,"+
                "SUM(CASE WHEN tb1.period='Sep24' THEN tb1.`values` END) AS Sep24,"+
                "SUM(CASE WHEN tb1.period='Oct24' THEN tb1.`values` END) AS Oct24,"+
                "SUM(CASE WHEN tb1.period='Nov24' THEN tb1.`values` END) AS Nov24,"+
                "SUM(CASE WHEN tb1.period='Dec24' THEN tb1.`values` END) AS Dec24"+
            " FROM (SELECT "+
                "provcode,provname,phase,hospital_code,hospital_name,m_visit,y_visit,"+
                "period,`status`,`values` "+
            " FROM sumvisitallphase"+
            " WHERE phase = ? AND provcode = ? AND y_visit=?) AS tb1"+
            " GROUP BY tb1.hospital_code,tb1.hospital_name,tb1.y_visit,tb1.`status`";

        conn.query(sql, [phase, provcode, y_visit], (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json(results)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.reportZone = async (req, res) => {
    try {
        //Code
        const sql = "SELECT tb2.zone, SUM(tb1.in_zone) AS in_zone," +
            "SUM(tb1.outside_refer) AS outside_refer, " +
            "SUM(tb1.outside_non_refer) AS outside_non_refer" +
            " FROM opd_visits AS tb1" +
            " INNER JOIN hospital_sp AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " GROUP BY tb2.zone ORDER BY tb2.zone ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}



exports.reportZoneSelect = async (req, res) => {
    try {
        //Code
        // const { zone } = req.query;
        const sql = "SELECT tb1.hospital_code,tb2.hospital_name," +
            "tb2.zone,tb2.provname,tb2.ampname,tb2.phase,tb2.typename, " +
            "SUM(tb1.in_zone) AS in_zone," +
            "SUM(tb1.outside_refer) AS outside_refer," +
            "SUM(tb1.outside_non_refer) AS outside_non_refer" +
            " FROM opd_visits AS tb1" +
            " INNER JOIN hospital_sp AS tb2 ON tb1.hospital_code = tb2.hospital_code" +
            " GROUP BY tb1.hospital_code,tb2.hospital_name,tb2.zone,tb2.provname,tb2.ampname,tb2.phase, tb2.typename ORDER BY tb2.zone ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.reportSendOrNot = async (req, res) => {
    try {
        //Code
        const sql = "SELECT	tb1.phase,tb1.provname," +
            "COUNT(tb1.hospital_code) AS hosptotal," +
            "COUNT(tb2.hospital_code) AS hospsend," +
            "(COUNT(tb1.hospital_code))-(COUNT(tb2.hospital_code)) AS hospnotsend" +
            " FROM `hospital_sp` AS tb1" +
            " LEFT JOIN (SELECT DISTINCT t1.hospital_code FROM `opd_visits` AS t1" +
            " WHERE t1.m_visit = '10' AND t1.y_visit = '2024') AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.typename IN ('โรงพยาบาลศูนย์','โรงพยาบาลทั่วไป','โรงพยาบาลชุมชน')" +
            " AND tb1.phase IN (1,2,3)" +
            " GROUP BY tb1.phase, tb1.provname ORDER BY tb1.phase ASC";
        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}


exports.reportHospsendOrNot = async (req, res) => {
    try {
        //Code
        const { provname, hospital_code } = req.query;
        const sql = "SELECT	tb1.phase,tb1.provname,	tb1.hospital_code,tb1.hospital_name,tb2.hospital_code AS sended" +
            " FROM `hospital_sp` AS tb1" +
            " LEFT JOIN (SELECT DISTINCT t1.hospital_code FROM `opd_visits` AS t1 WHERE t1.m_visit = '10' AND t1.y_visit = '2024') AS tb2" +
            " ON tb1.hospital_code = tb2.hospital_code" +
            " WHERE tb1.typename IN ('โรงพยาบาลศูนย์','โรงพยาบาลทั่วไป','โรงพยาบาลชุมชน')" +
            " AND tb1.phase IN (1,2,3)" +
            " ORDER BY tb1.phase, tb1.provcode ASC";
        conn.query(sql, [provname, hospital_code], (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Sever Error!')
    }
}



exports.forLineNotify = (req, res) => {
    try {
        //Code  phase IN ('1','2','3') AND
        const sql = "SELECT tb1.zone,tb1.phase,tb1.provname,tb1.totalhosp," +
            "SUM(CASE WHEN tb2.m_visit = '01' THEN tb2.hospsend END) AS hospsend_01," +
            "SUM(CASE WHEN tb2.m_visit = '01' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_01," +
            "SUM(CASE WHEN tb2.m_visit = '02' THEN tb2.hospsend END) AS hospsend_02," +
            "SUM(CASE WHEN tb2.m_visit = '02' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_02," +
            "SUM(CASE WHEN tb2.m_visit = '03' THEN tb2.hospsend END) AS hospsend_03," +
            "SUM(CASE WHEN tb2.m_visit = '03' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_03," +
            "SUM(CASE WHEN tb2.m_visit = '04' THEN tb2.hospsend END) AS hospsend_04," +
            "SUM(CASE WHEN tb2.m_visit = '04' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_04," +
            "SUM(CASE WHEN tb2.m_visit = '05' THEN tb2.hospsend END) AS hospsend_05," +
            "SUM(CASE WHEN tb2.m_visit = '05' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_05," +
            "SUM(CASE WHEN tb2.m_visit = '06' THEN tb2.hospsend END) AS hospsend_06," +
            "SUM(CASE WHEN tb2.m_visit = '06' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_06," +
            "SUM(CASE WHEN tb2.m_visit = '07' THEN tb2.hospsend END) AS hospsend_07," +
            "SUM(CASE WHEN tb2.m_visit = '07' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_07," +
            "SUM(CASE WHEN tb2.m_visit = '08' THEN tb2.hospsend END) AS hospsend_08," +
            "SUM(CASE WHEN tb2.m_visit = '08' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_08," +
            "SUM(CASE WHEN tb2.m_visit = '09' THEN tb2.hospsend END) AS hospsend_09," +
            "SUM(CASE WHEN tb2.m_visit = '09' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_09," +            
            "SUM(CASE WHEN tb2.m_visit = '10' THEN tb2.hospsend END) AS hospsend_10," +
            "SUM(CASE WHEN tb2.m_visit = '10' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_10," +
            "SUM(CASE WHEN tb2.m_visit = '11' THEN tb2.hospsend END) AS hospsend_11," +
            "SUM(CASE WHEN tb2.m_visit = '11' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_11," +
            "SUM(CASE WHEN tb2.m_visit = '12' THEN tb2.hospsend END) AS hospsend_12," +
            "SUM(CASE WHEN tb2.m_visit = '12' THEN (ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2)) END) AS percent_12" +
            " FROM (SELECT zone,phase,provname,COUNT(DISTINCT hospital_code) AS totalhosp" +
            " FROM hospital_sp WHERE phase IN ('1','2','3') AND typename IN ('โรงพยาบาลทั่วไป','โรงพยาบาลศูนย์','โรงพยาบาลชุมชน')" +
            " GROUP BY zone, phase, provname ORDER BY zone ASC) AS tb1" +
            " LEFT JOIN (SELECT t2.zone,t2.phase,t1.m_visit,t2.provname,COUNT(DISTINCT t1.hospital_code) hospsend" +
            " FROM opd_visits AS t1 LEFT JOIN hospital_sp AS t2 ON t1.hospital_code = t2.hospital_code" +
            " WHERE t1.y_visit = '2024' AND t2.phase IN ('1','2','3')" +
            " GROUP BY t2.zone,t2.phase,t1.m_visit, t2.provname ORDER BY t2.zone ASC) AS tb2" +
            " ON tb1.zone = tb2.zone AND tb1.provname = tb2.provname AND tb1.phase = tb2.phase" +
            " GROUP BY tb1.zone,tb1.phase,tb1.provname,tb1.totalhosp";
        conn.query(sql, (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json(results)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Sever Error!')
    }
}


exports.forLineNotify2 = (req, res) => {
    try {
        //Code  phase IN ('1','2','3') AND
        const sql = "SELECT tb1.zone, tb1.totalhosp, tb2.hospsend, ROUND(((tb2.hospsend/tb1.totalhosp)*100), 2) AS percent" +
            " FROM (SELECT zone, COUNT(DISTINCT hospital_code) AS totalhosp" +
            " FROM hospital_sp WHERE phase IN ('1','2','3') AND typename IN ('โรงพยาบาลทั่วไป','โรงพยาบาลศูนย์','โรงพยาบาลชุมชน') " +
            " GROUP BY zone ORDER BY zone ASC) AS tb1" +
            " LEFT JOIN (SELECT t2.zone, COUNT(DISTINCT t1.hospital_code) hospsend" +
            " FROM opd_visits AS t1" +
            " LEFT JOIN hospital_sp AS t2" +
            " ON t1.hospital_code = t2.hospital_code" +
            " WHERE t1.m_visit IN ('10')" +
            " AND t1.y_visit = '2024' AND t2.phase IN ('1','2','3')" +
            " GROUP BY t2.zone ORDER BY t2.zone ASC) AS tb2" +
            " ON tb1.zone = tb2.zone";
        conn.query(sql, (err, results) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json(results)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Sever Error!')
    }
}

exports.checkListSendData = (req, res) => {
    try {
        //Code
        const sql = "SELECT tb1.zone,tb1.phase,tb1.provname,tb1.hospital_name," +
            "SUM(case when (tb1.m_visit = '01' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Jan23," +
            "SUM(case when (tb1.m_visit = '02' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Feb23," +
            "SUM(case when (tb1.m_visit = '03' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Mar23," +
            "SUM(case when (tb1.m_visit = '04' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Apr23," +
            "SUM(case when (tb1.m_visit = '05' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as May23," +
            "SUM(case when (tb1.m_visit = '06' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Jun23," +
            "SUM(case when (tb1.m_visit = '07' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Jul23," +
            "SUM(case when (tb1.m_visit = '08' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Aug23," +
            "SUM(case when (tb1.m_visit = '09' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Sep23," +
            "SUM(case when (tb1.m_visit = '10' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Oct23," +
            "SUM(case when (tb1.m_visit = '11' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Nov23," +
            "SUM(case when (tb1.m_visit = '12' and tb1.y_visit = '2023') then tb1.hospsend else 0 end) as Dec23," +
            "SUM(case when (tb1.m_visit = '01' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Jan24," +
            "SUM(case when (tb1.m_visit = '02' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Feb24," +
            "SUM(case when (tb1.m_visit = '03' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Mar24," +
            "SUM(case when (tb1.m_visit = '04' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Apr24," +
            "SUM(case when (tb1.m_visit = '05' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as May24," +
            "SUM(case when (tb1.m_visit = '06' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Jun24," +
            "SUM(case when (tb1.m_visit = '07' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Jul24," +
            "SUM(case when (tb1.m_visit = '08' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Aug24," +
            "SUM(case when (tb1.m_visit = '09' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Sep24," +
            "SUM(case when (tb1.m_visit = '10' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Oct24," +
            "SUM(case when (tb1.m_visit = '11' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Nov24," +
            "SUM(case when (tb1.m_visit = '12' and tb1.y_visit = '2024') then tb1.hospsend else 0 end) as Dec24" +
            " FROM (SELECT t2.zone,t2.phase,t2.provname,t2.hospital_name,t1.m_visit,t1.y_visit,COUNT(DISTINCT t1.hospital_code) hospsend" +
            " FROM hospital_sp AS t2" +
            " LEFT JOIN opd_visits AS t1" +
            " ON t1.hospital_code = t2.hospital_code" +
            " WHERE t2.phase IN ('1','2','3') AND t2.typename IN ('โรงพยาบาลทั่วไป','โรงพยาบาลศูนย์','โรงพยาบาลชุมชน')" +
            " GROUP BY t2.zone,t2.phase,t2.provname,t2.hospital_name,t1.m_visit,t1.y_visit ORDER BY t2.zone ASC) tb1" +
            " GROUP BY tb1.zone,tb1.phase, tb1.provname,tb1.hospital_name ORDER BY tb1.zone ASC";

        conn.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Sever Error!')
    }
}
