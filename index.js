const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server);

const connectDB = require('./config/db');
const cors = require('cors');

const socketManager = require('./config/socketManager');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 4000;

app.use('/projects-api/users',require('./routes/users'))
app.use('/projects-api/auth',require('./routes/authentication'))
app.use('/projects-api/projects',require('./routes/projects'))
app.use('/projects-api/tasks',require('./routes/tasks'))
app.use('/projects-api/status',require('./routes/status'))
app.use('/projects-api/priorities',require('./routes/priority'))
app.use('/projects-api/comments',require('./routes/comments'))
app.use('/projects-api/invitedUsers',require('./routes/invitedUsersTask'))

io.on('connection',socketManager);

server.listen(port, '0.0.0.0' ,()=>{
    console.log('From socket express server');
});