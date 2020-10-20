const handleError = require('../helpers/handleError');
const userService = require('../services/userService');
const autenthicationService  = require('../services/authenticationService');

exports.autenthicateUser = async (req,res)=>{
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});
    const { email,password } = req.body;

    try {
        let isValidUser = await userService.isValidUser(email,password)
        if(!isValidUser) return res.status(400).json({ msg: 'Invalid User'});

        let token = await autenthicationService.generatingJWT(email);
        let user = await userService.findUser(email);
        if(token) res.json({"email": user.email, "name": user.name, "id": user._id, "token": token});
    } catch (error) {
        console.log(error);
    }
}