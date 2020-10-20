const { validationResult } = require('express-validator');

exports.withErrorRequest = (request) =>{
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return {state: true, errors: errors};
    }
    return {state: false, errors: errors};
}