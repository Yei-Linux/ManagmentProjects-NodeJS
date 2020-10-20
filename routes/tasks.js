const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator'); 
const authentication = require('../middlewares/authentication');

router.get("/:taskId",authentication, taskController.getCommentsAndTaskDetailByTaskId);

router.post("/",
  authentication,
  [
    check("name", "Field name is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    check("project", "Field id Project is required").not().isEmpty(),
  ],
  taskController.addTask
);

router.put("/:taskId",
  authentication,
  [
    check("name", "Field name is required").not().isEmpty(),
    check("project", "Field id Project is required").not().isEmpty(),
  ],
  taskController.updateTask
);

router.put("/:taskId/like",
  authentication,
  [
    check("likeTask", "Field likeTask is required").not().isEmpty()
  ],
  taskController.updateLikeByTaskId
);

router.delete("/:taskId", authentication,taskController.deleteTask)

module.exports = router;