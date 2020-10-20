const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { check } = require("express-validator");
const authentication = require('../middlewares/authentication');

router.get("/", authentication, projectController.getProjects);

router.get("/:projectId", authentication, projectController.getProjectWithTasks);

router.post("/",
  authentication,
  [
    check("name", "Field name is required").not().isEmpty()
  ],
  projectController.addProject
);

module.exports = router;
