const Status = require('../models/Status');

exports.getStatus = async () => {
    return await Status.find();
}

exports.addStatus = async (statusRequest) => {
    let status = new Status(statusRequest);
    await status.save();
}