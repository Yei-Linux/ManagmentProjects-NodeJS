const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    initializedAt: {
        type: Date,
        required: false,
        default: null
    },
    finishedAt: {
        type: Date,
        required: false,
        default: null
    },
    daysToFinish: {
        type: Number,
        required: false,
        default: 0
    },
    priority: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Priority',
        default: null
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    likeTask: {
        type: Boolean,
        default: false,
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Task',taskSchema);