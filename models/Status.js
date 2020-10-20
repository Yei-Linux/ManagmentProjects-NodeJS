const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
    status: {
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

module.exports = mongoose.model('Status',statusSchema);

