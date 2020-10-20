const User = require('../models/User');
const Task = require('../models/Task');
const Project = require('../models/Project');
const bcryptjs = require('bcryptjs');
const InvitedUsersTask = require('../models/InvitedUsersTask');

exports.isValidUser = async (email,password)=>{
    let userFound = await User.findOne({email}); 
    if(!userFound) return false;

    const correctPassword = await bcryptjs.compare(password,userFound.password);
    if(!correctPassword) return false;
    return true;
}

exports.saveUser = async (request)=>{
    let userModel = new User(request);
    const salt = await bcryptjs.genSalt(10);
    userModel.password = await bcryptjs.hash(userModel.password,salt);
    await userModel.save();
}

exports.findUser = async (email)=>{
    let userFound = await User.findOne({ email });
    return userFound;
}

exports.searchUsers = async (firstLettersUser) => {
    rgx = new RegExp("^"+firstLettersUser);
    let users = await User.find({email: rgx});
    return users.map(user => {
        return {value: user._id,label: user.email}
    });
}

exports.getUsersLikeByTask = async (taskId) => {
    let taskOwner = await Task.find({_id: taskId,likeTask: true});
    let userLikesOwner = [];
    if(taskOwner.length > 0){
         let project = await Project.find({_id: taskOwner[0]['project']})
         let userLikes = (await User.find({_id: project[0]['user']}).select('name'))[0];
         userLikesOwner.push(userLikes);
    }
    let invitedUserLikes = [];
    let users  = await InvitedUsersTask.find({task: taskId ,likeTask: true}).select('user');
    for(let user of users){
        let invitedUser = (await User.find({_id: user['user']}).select('name'))[0];
        invitedUserLikes.push(invitedUser);
    }
    return [...userLikesOwner,...invitedUserLikes]
}

