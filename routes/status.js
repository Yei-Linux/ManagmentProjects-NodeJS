const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const authentication = require('../middlewares/authentication');
const statusController = require('../controllers/statusController');

router.get("/",authentication,statusController.getStatusList);

router.post("/",
  authentication,
  [
    check("status", "Field status is required").not().isEmpty(),
  ],
  statusController.addStatus
);

module.exports = router;