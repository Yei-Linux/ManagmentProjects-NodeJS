const jwt = require('jsonwebtoken');

exports.generatingJWT = async (email)=>{
    const payload = { 
        user:{
            email: email
        }
    };

    let token = await jwt.sign(payload,process.env.SECRET_WORD,{
        expiresIn: 3600
    });
    return token;
}