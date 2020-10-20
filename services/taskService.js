const Project = require('../models/Project');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const commentService = require('../services/commentService');
const invitedUsersTaskService = require('../services/invitedUsersTaskService');

exports.getCommentsAndTaskDetailByTaskId = async (taskId) =>{
    let taskWithComments = await Task.aggregate([{
        $match: {_id: mongoose.Types.ObjectId(taskId)}
    },{
        $lookup: {
            from : 'comments',
            localField: '_id',
            foreignField: 'task',
            as: 'commentsList'
        }
    }]);

    taskWithComments[0]['usersGroup'] = await invitedUsersTaskService.getUserAsignedPlusOwnerInTask(taskId);
    taskWithComments[0]['commentsList'] = await commentService.addUserInfoByComment(taskWithComments[0]['commentsList'])

    return taskWithComments;
}

exports.getProjectByTaskId = async (taskId) => {
    return await Task.aggregate([{
        $match: {_id: mongoose.Types.ObjectId(taskId)}
    },{
        $lookup: {
          from : 'projects',
          localField: '_id',
          foreignField: 'project',
          as: 'projectObject'
        }
    }]);
}

exports.getTaskById = async (taskId) => {
    return await Task.findOne({_id: taskId});
}

exports.setNumberCommentsInTasks = async (tasks) => {

    for(const task of tasks){
        task['numberComments'] = await commentService.getNumberOfCommentsByTask(task._id);
    }
    return tasks;
}

exports.addTask = async (taskRequest) =>{
    const task = new Task(taskRequest);
    return await task.save();
}

exports.updateTask = async (taskRequest,taskId) =>{
    return await Task.findOneAndUpdate({_id: taskId},{ $set: taskRequest},{new: true});
}

exports.updateLikeByTaskId = async (likeTask, taskId) => {
    return await Task.findOneAndUpdate({_id: taskId},{ $set: {"likeTask": likeTask}},{new: true}).select('likeTask');
}

exports.deleteTask = async (taskId) =>{
    await Task.findOneAndRemove({_id: taskId});
}

exports.getTasksByProjectId = async (projectId) => {
    return await Task.find({project: projectId}).select('_id');
}

