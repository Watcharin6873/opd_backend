const jwt = require('jsonwebtoken')
const secret = "mophRefer@2024"


exports.auth = (req, res, next)=>{
    try {
        //Code
        var token = req.headers.authorization.split(' ')[1];
        if (!token){
            return res.status(401).send('No token, authorization denied.')
        }
        const decoded = jwt.verify(token, secret)

        console.log('middleware', decoded)

        req.user = decoded.user
        next()
    } catch (err) {
        console.log(err)
        res.status(401).send('Token invalid')
    }
}