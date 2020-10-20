const handleError = require('../helpers/handleError');
const priorityService = require('../services/priorityService');

exports.getPriorities = async (req,res) => {
    try {
        let priorities = await priorityService.getPriorities();
        if(priorities == []) return res.status(400).send('Priorities is Empty');

        res.json({priorities});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.addPriority = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});

    try {
        await priorityService.addPriority(req.body);
        res.json({msg: 'Priority was added correctly'});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}


