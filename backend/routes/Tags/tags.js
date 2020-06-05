const tags = require('express').Router();
// '../../node_modules/express'

const { 
    getAllTags, 
    getSingleTagForPin, 
    getSingleTagForBoard, 
    updateSingleTag, 
    deleteSingleTag, 
    addNewTag, 
    tagBasedOnPin, 
    tagBasedOnBoard 
} = require('../../queries/Tags/tags');

tags.get('/', getAllTags);
tags.get('/:pin_id', getSingleTagForPin);
tags.get('/:board_id', getSingleTagForBoard);
tags.get('/', tagBasedOnPin);
tags.get('/', tagBasedOnBoard)
tags.post('/',addNewTag);
tags.patch('/:tag_name',updateSingleTag);
tags.delete('/:id',deleteSingleTag);

module.exports = tags;