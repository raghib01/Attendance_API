const User = require('../Model/User');
const jwt = require('jsonwebtoken');

async function authenticate(req,res, next){
    let token = req.headers.authorization;
    if(!token){
        res.status(400).json({message: `Unathorized Data`});
    }

    try{
        token = token.split(' ')[1];
        const decode = jwt.verify(token, 'secret_key');
        const user = await User.findById(decode._id);
        console.log(user);
        if(!user){
            return res.status(401).json({message: `User dont find`});
        }

        req.user = user;
        next();
    }
    catch(e){
        return res.status(401).json({message: `invelid token`});
    }

}

module.exports = authenticate;