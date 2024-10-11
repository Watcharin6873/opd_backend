const conn = require('../Config/ConnectDB')



exports.listHospitals = async (req, res) =>{
    try {
        conn.query(
            "SELECT * FROM hospital_sp WHERE phase IN ('1','2','3') AND typename IN ('โรงพยาบาลทั่วไป','โรงพยาบาลศูนย์','โรงพยาบาลชุมชน','ใช้เพื่อทดสอบระบบ')",
            function(err, results) {
              res.json(results)
            }
          );
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!')
    }
    
}


exports.listHospitals2 = async (req, res) =>{
  try {
      conn.query(
          "SELECT * FROM hospital_sp WHERE phase IN ('1','2','3') AND typename IN ('โรงพยาบาลทั่วไป','โรงพยาบาลศูนย์','โรงพยาบาลชุมชน','ใช้เพื่อทดสอบระบบ','สำนักงานสาธารณสุขจังหวัด')",
          function(err, results) {
            res.json(results)
          }
        );
  } catch (err) {
      console.log(err)
      res.status(500).send('Server Error!!')
  }
  
}


exports.getHospital = async (req, res) =>{
  try {
    const sql = "SELECT `hospital_code`,`hospital_name` FROM `hospital_sp` WHERE `hospital_code`=?"
    const values = [req.user.hospital_code]
    conn.query(sql, values, (err, results) =>{
      if (err) throw err;
      res.json(results)
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!')
  }
}

exports.getProvPhase = async (req, res) =>{
  try {
    //Code
    const {phase} = req.query;
    const sql = "SELECT DISTINCT `provcode`,`provname`,`phase` FROM `hospital_sp` WHERE `phase` =?";

    conn.query(sql, [phase], (err, results) =>{
      if (err) {
        return res.send(err);
      }else{
        return res.json(results)
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!')
  }
}