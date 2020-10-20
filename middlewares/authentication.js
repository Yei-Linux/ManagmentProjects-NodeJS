const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const headerToken = req.header('Authorization');
    if(!headerToken) return res.status(400).json({msg:'Without token'});

    try {
        const token = headerToken.split(' ')[1]; 
        const ciprath = jwt.verify(token,process.env.SECRET_WORD);
        req.user = ciprath.user;
        next();
    } catch (error) {
        res.status(400).json({msg: 'Invalid Token'});
    }
}