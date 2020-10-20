const handleError = require('../helpers/handleError');
const statusService = require('../services/statusService');

exports.getStatusList = async (req,res) => {
    try {
        let statusList = await statusService.getStatus();
        if(statusList == []) return res.status(400).send('StatusList is Empty');

        res.json({statusList});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.addStatus = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});

    try {
        await statusService.addStatus(req.body);
        res.json({msg: 'Status added correctly'});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}