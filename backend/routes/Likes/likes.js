const likes = require('express').Router();
// '../../node_modules/express'


const { 
    getPinLikes, 
    addPinLike, 
    deletePinLike 
} = require('../../queries/Likes/likes');

likes.get('/:pin_id', getPinLikes)
likes.post('/:liker_id/:pin_id', addPinLike);
likes.delete('/:liker_id/:pin_id', deletePinLike);

module.exports = likes;