const axios = require('axios')

exports.lineNotify = async(line_token,message)=>{
    try {
        //Code
        const response = await axios({
            method: 'POST',
            url: 'https://notify-api.line.me/api/notify',
            Headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':'Bearer '+ line_token,
            },
            data: 'message='+ message
        })
        console.log('LineNotify Response: ', response)
    } catch (err) {
        console.log(err)
    }
}