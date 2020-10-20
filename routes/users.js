const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const authentication = require('../middlewares/authentication');

router.post('/',
    [ 
      check('name','Field name is required').not().isEmpty(),
      check('email','Field email is required').isEmail(),
      check('password','Field password is required').isLength({min:6})
    ],
    userController.createUser
);

router.get('/search',
    authentication,
    userController.searchUsers
);

router.get('/likes',
    authentication,
    userController.getUsersLikeByTask
);

module.exports = router;