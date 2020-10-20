const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const authentication = require('../middlewares/authentication');
const invitedUsersTaskController = require('../controllers/invitedUsersTaskController');

router.post("/",
  [
    check("user", "Field userId is required").not().isEmpty(),
    check("project", "Field projectId is required").not().isEmpty(),
    check("task", "Field taskId is required").not().isEmpty()
  ],
  invitedUsersTaskController.postInvitedUsers
);

router.put("/",
  authentication,
  [
    check("project", "Field projectId is required").not().isEmpty(),
    check("task", "Field taskId is required").not().isEmpty(),
    check("likeTask", "Field likeTask is required").not().isEmpty()
  ],
  invitedUsersTaskController.updateLikeInvitedUsersTask
);

router.get("/alienTasks",
  authentication,
  invitedUsersTaskController.getTasksByAlienProject
);

router.put("/like",
  authentication,
  invitedUsersTaskController.updateLikeInvitedUsersTask
);

module.exports = router;