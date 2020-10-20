const Priority = require('../models/Priority');

exports.getPriorities = async () => {
    return await Priority.find();
}

exports.addPriority = async (priorityRequest) => {
    let priority = new Priority(priorityRequest);
    await priority.save();
}