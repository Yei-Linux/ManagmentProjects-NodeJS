const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const authentication = require('../middlewares/authentication');
const priorityController = require('../controllers/priorityController');

router.get("/",authentication,priorityController.getPriorities);

router.post("/",
  authentication,
  [
    check("name", "Field name is required").not().isEmpty(),
  ],
  priorityController.addPriority
);

module.exports = router;