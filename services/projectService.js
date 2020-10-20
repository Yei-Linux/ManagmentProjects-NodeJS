const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const mongoose = require('mongoose');
const taskService = require('./taskService');
const invitedUsersTaskService = require('./invitedUsersTaskService');

exports.getProjects = async (email) =>{
    let userFound = await User.findOne({email});
    let projectsByOwn = await Project.find({user: userFound.id});

    let projectsIdsInvited = await invitedUsersTaskService.getProjectsIdByInvitedUser(userFound.id);
    let projectsInvited = await this.getProjectWithProjectsId(projectsIdsInvited);

    return [...projectsByOwn , ...projectsInvited];
} 

exports.getProjectWithProjectsId = async(arrayProjectsId) => {
    let projects = [];
    for(const id of arrayProjectsId){
        let project = await Project.find({_id:id});
        projects.push(project[0]);
    }
    return projects;
}

exports.getProjectWithTasks = async (projectId) =>{
    let projectWithTasks = await Project.aggregate([{
        $match: {_id: mongoose.Types.ObjectId(projectId)}
    },{
        $lookup: {
            from: 'tasks',
            localField: '_id',
            foreignField: 'project',
            as: 'tasksList'
        } 
    }]);
    projectWithTasks[0]['tasksList'] = await taskService.setNumberCommentsInTasks(projectWithTasks[0]['tasksList']);
    return projectWithTasks;
}

exports.addProject = async (projectRequest,email) =>{
    let userFound = await User.findOne({email});
    const project = new Project(projectRequest);
    project.user = userFound.id;
    await project.save();
}

exports.getProjectById = async (projectId) => {
    return await Project.find({_id: projectId});
}

