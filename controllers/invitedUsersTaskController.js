const handleError = require('../helpers/handleError');
const invitedUsersTaskService = require('../services/invitedUsersTaskService');
const userService = require('../services/userService');
const projectService = require('../services/projectService');

exports.postInvitedUsers = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});

    try {
        await invitedUsersTaskService.postInvitedUsers(req.body);
        res.json({msg: 'Invited User was added correctly'});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.updateLikeInvitedUsersTask = async (req,res) => {
    try {
        const {task , likeTask} = req.body;
        let userLikeUpdated = await invitedUsersTaskService.updateLikeInvitedUsersTasks(req.user.email, task , likeTask);
        res.json({userLikeUpdated});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.getTasksByAlienProject = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});

    try {
        let user = await userService.findUser(req.user.email);
        let project = (await projectService.getProjectById(req.query.project))[0];
        let invitedTasks = await invitedUsersTaskService.getTasksByAlienProject(user._id,req.query.project);
        res.json({project,invitedTasks});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}