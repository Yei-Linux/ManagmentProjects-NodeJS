const handleError = require('../helpers/handleError');
const taskService = require('../services/taskService');

exports.getCommentsAndTaskDetailByTaskId = async (req,res) => {
    try {
        let task = await taskService.getCommentsAndTaskDetailByTaskId(req.params.taskId);
        res.json({task});
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.addTask = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});
    
    try {
        let taskAdded = await taskService.addTask(req.body);
        res.json({taskAdded}); 
    } catch (error) {
        res.status(400).send({msg: error});
    }
}

exports.updateTask = async (req,res) => {
    try {
        let taskUpdated = await taskService.updateTask(req.body,req.params.taskId);
        res.json({taskUpdated});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.updateLikeByTaskId = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});
    
    try {
        let userLikeUpdated = await taskService.updateLikeByTaskId(req.body.likeTask,req.params.taskId);
        res.json({userLikeUpdated});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.deleteTask = async (req,res) => {
    try {
        await taskService.deleteTask(req.params.taskId);
        res.json({msg: 'Task deleted'});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}


