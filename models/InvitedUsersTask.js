const mongoose = require('mongoose');

const invitedUsersTaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    likeTask: {
        type: Boolean,
        default: false,
        required: false
    },
    acepted: {
        type: Boolean,
        default: false,
        required: false
    }
});

module.exports = mongoose.model('InvitedUsersTask',invitedUsersTaskSchema);