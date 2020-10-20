const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authenticationController = require('../controllers/authenticationController');

router.post('/',
    [ 
      check('email','Field email is required').isEmail(),
      check('password','Field password is required').isLength({min:6})
    ],
    authenticationController.autenthicateUser
);

module.exports = router;