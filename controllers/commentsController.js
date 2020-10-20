const handleError = require('../helpers/handleError');
const commentService = require('../services/commentService');

exports.addCommentsByUserTask = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});

    try {
        await commentService.addCommentsByUserTask(req.body);
        res.json({msg: 'Comment was added correctly'});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}

exports.updateComment = async (req,res) => {
    let {state,errors} = handleError.withErrorRequest(req)
    if(state) return res.status(400).json({erros: errors.array()});

    try {
        await commentService.updateCommentById(req.params.commentId,req.body);
        res.json({msg: 'Comment was updated correctly'});
    } catch (error) {
        res.status(400).send('Was there an error');
    }
}