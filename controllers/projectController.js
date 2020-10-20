const handleError = require('../helpers/handleError');
const projectService = require('../services/projectService');

exports.getProjects = async (req,res) => {
    try {
        let projects = await projectService.getProjects(req.user.email);
        if(projects == []) return res.status(400).send('Projects is Empty');

        res.json({projects});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.getProjectWithTasks = async (req,res) => {
    try {
        let projectWithTasks = await projectService.getProjectWithTasks(req.params.projectId);
        res.json({projectWithTasks});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.addProject = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});

    try {
        await projectService.addProject(req.body,req.user.email);
        res.json({msg: 'Project added correctly'});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}