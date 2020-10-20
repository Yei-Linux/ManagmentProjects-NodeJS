const mongoose = require('mongoose');

const prioritySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Priority',prioritySchema);