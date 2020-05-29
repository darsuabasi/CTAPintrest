const likesRouter= require('express').Router();

const { getPinLikes, addPinLike, deletePinLike } = require('../queries/likes');

likesRouter.get('/:pin_id', getPinLikes)
likesRouter.post('/:liker_id/:pin_id', addPinLike);
likesRouter.delete('/:liker_id/:pin_id', deletePinLike);

module.exports = likesRouter;