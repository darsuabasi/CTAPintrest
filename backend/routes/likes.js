const likesRouter= require('express').Router();

const { getPinLikes, addLike, deleteLike } = require('../queries/likes');

likesRouter.get('/:pin_id', getPinLikes)
likesRouter.post('/:liker_id/:pin_id', addLike);
likesRouter.delete('/:liker_id/:pin_id', deleteLike);

module.exports = likesRouter;