const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const authentication = require('../middlewares/authentication');
const commentsController = require('../controllers/commentsController');

router.post("/",
  authentication,
  [
    check("comment", "comment is required").not().isEmpty(),
    check("task", "task is required").not().isEmpty()
  ],
  commentsController.addCommentsByUserTask
);

router.put("/:commentId",
  authentication,
  commentsController.updateComment
);

module.exports = router;
