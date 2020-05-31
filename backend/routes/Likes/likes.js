const likesRouter= require('../../node_modules/express').Router();

const { 
    getPinLikes, 
    addPinLike, 
    deletePinLike 
} = require('../../queries/Likes/likes');

likesRouter.get('/:pin_id', getPinLikes)
likesRouter.post('/:liker_id/:pin_id', addPinLike);
likesRouter.delete('/:liker_id/:pin_id', deletePinLike);

module.exports = likesRouter;