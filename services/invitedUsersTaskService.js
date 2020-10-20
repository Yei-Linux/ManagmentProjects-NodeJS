const InvitedUsersTask = require('../models/InvitedUsersTask');
const User = require('../models/User');
const Task = require('../models/Task');

const taskService = require('./taskService');
const projectService = require('./projectService');
const commentService = require('./commentService');
const managmentData = require('../helpers/managmentData');

exports.getProjectsIdByInvitedUser = async (userId) => {
    let arrayProjects = await InvitedUsersTask.find({user: userId}).select('project');
    let arrayProjectsFiltered = [];
    arrayProjects.forEach( project => {
        arrayProjectsFiltered.push(project['project']);
    });
    return [...new Set(arrayProjectsFiltered)];
}

exports.postInvitedUsers = async (request) => {
    let invitedUserTask = new InvitedUsersTask(request);
    await invitedUserTask.save();
}

exports.updateLikeInvitedUsersTasks = async (email,taskId,likeTask) => {
    let userFound = await User.findOne({email});
    return await InvitedUsersTask.findOneAndUpdate({user: userFound._id,task: taskId},{ $set: {"likeTask":likeTask}},{new: true}).select('likeTask');
}

exports.getTasksByAlienProject = async (user,project) => {
    let alienTaskAsignedByOther = await taskService.getTasksByProjectId(project);
    let newArrayTaskAsignedByOther = [];
    alienTaskAsignedByOther.forEach((taskId)=> {
        newArrayTaskAsignedByOther.push({"task": taskId._id,"me":false});
    });

    let alienTasksAsignedByMe = await InvitedUsersTask.find({user,project}).select('task');
    let newArrayTaskAsignedByMe = [];
    alienTasksAsignedByMe.forEach((task)=> {
        newArrayTaskAsignedByMe.push({"task": task.task,"me":true});
    });

    let arrays = [...newArrayTaskAsignedByOther,...newArrayTaskAsignedByMe];
    let newArray = managmentData.removeDuplicates(arrays, "task");

    for(let taskItem of newArray){
        let task  = await taskService.getTaskById(taskItem['task']);
        taskItem['task'] = task;
    }

    let tasksWithComments = [];
    for(let taskItem of newArray){
        let numberComments = await commentService.getNumberOfCommentsByTask(taskItem['task']['_id']);
        let task = taskItem['task'];
        let me = taskItem['me'];
        tasksWithComments.push({task,numberComments,me});
    }

    return tasksWithComments; 
}

exports.getUserAsignedPlusOwnerInTask = async (taskId) => {
    let task = (await taskService.getTaskById(taskId));
    let userOwner = (await projectService.getProjectById(task['project']))[0]['user'];
    let users = await InvitedUsersTask.find({task: taskId}).select('user');
    users.push({user:userOwner});
    for(let user of users){
        user['user'] = (await User.find({_id:user['user']}).select('name email'))[0];
    }
    return users;
}