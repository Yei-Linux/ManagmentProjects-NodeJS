const handleError = require('../helpers/handleError');
const userService = require('../services/userService');
const autenthicationService  = require('../services/authenticationService');
const jwt = require('jsonwebtoken');

exports.createUser = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});
    const { email,password } = req.body;

    try {
        let userFound = await userService.findUser(email);
        if(userFound) return res.status(400).json({msg:'User already exists'});

        await userService.saveUser(req.body);
        
        let token = await autenthicationService.generatingJWT(email);
        if(token) res.json({token});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.searchUsers = async (req,res) => {
    try {
        let usersFound = await userService.searchUsers(req.query.firstLetter);
        res.json({usersFound});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.getUsersLikeByTask = async (req,res) => {
    try {
        let usersFound = await userService.getUsersLikeByTask(req.query.taskId);
        res.json({usersFound});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}