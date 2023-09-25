const User = require('../models/user')
const jwt = require('jsonwebtoken')
const SEC_KEY = 'saiisagoodboy'

const auth = async (req, res, next) => {
    let authTokenFromHeader;
    for (const key in req.headers) {
        if (key === 'auth-token') {
            authTokenFromHeader = req.headers[key]
        }
    }
    if(authTokenFromHeader){
        const decodedEmail = jwt.verify(authTokenFromHeader,SEC_KEY)
        const user = await User.find({email:decodedEmail}).select('-password')
        console.log({user});
        if(user.length === 0){
            res.send('please login using valid token')
            return;
        }
        req.userId = user[0]._id
        console.log({id1:req.userId, id2:user[0]._id});
        next()
        return;
    }
}
module.exports = auth;