const Comment = require('../models/Comment');
const User = require('../models/User');

exports.addCommentsByUserTask = async (commentRequest) => {
    let commentInsert = new Comment(commentRequest); 
    let commentInserted = await commentInsert.save();
    commentInserted['user'] = (await User.find(commentInserted['user']).select('name email'))[0];
    return commentInserted;
}

exports.updateCommentById = async (commentId,commentRequest) => {
    return await Comment.findOneAndUpdate({ _id: commentId},{ $set: commentRequest},{new: true});
}

exports.getNumberOfCommentsByTask = async (taskId) => {
    let numberComments = await Comment.countDocuments({task: taskId});
    return numberComments;
}

exports.addUserInfoByComment = async (comments) => {
    for(let comment of comments){
       comment['user'] =  (await User.find({_id: comment['user']}).select('name email'))[0];
    }
    return comments;
}