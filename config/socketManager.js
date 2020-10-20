const io = require('../index').io;
const commentService = require('../services/commentService');
const taskService = require('../services/taskService');
const projectService = require('../services/projectService');
const invitedUsersTaskService = require('../services/invitedUsersTaskService');
const userService = require('../services/userService');

module.exports = (socket) => {
    socket.on('SUSCRIBE', (taskId) => {
        socket.join(taskId);
    });
    
    socket.on('SEND_COMMENTS', async (data) => {
        let lastComment = await commentService.addCommentsByUserTask(data['commentData']);
        io.sockets.to(data['commentData']['task']).emit('COMMENTS_OF_TASK', {
            comment: lastComment
        });
    });
    socket.on('SEND_TASK_ID_FOR_USER_LIKES', async (data) => {
        let usersFound = await userService.getUsersLikeByTask(data['task']);
        io.sockets.to(data['task']).emit('USER_LIKES', {
            usersFound: usersFound
        });
    });
}

