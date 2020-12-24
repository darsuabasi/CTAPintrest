const tags = require('express').Router();
// '../../node_modules/express'

const { 
    addNewTag, 
    getAllTags, 
    getAllPinsByTag, 
    getSingleTagForPin, 
    // getAllTagsByPin,
    getSingleTagForBoard, 
    updateSingleTag, 
    deleteSingleTag, 
    // tagBasedOnPin, 
    tagBasedOnBoard 
} = require('../../queries/Tags/tags');

tags.post('/',addNewTag);
tags.get('/', getAllTags);
tags.get('/:tag_name', getAllPinsByTag);
tags.get('/:pin_id', getSingleTagForPin);
// tags.get('/:pin_id', getAllTagsByPin);
tags.get('/:board_id', getSingleTagForBoard);
// tags.get('/', tagBasedOnPin);
tags.get('/', tagBasedOnBoard)
tags.patch('/:tag_name',updateSingleTag);
tags.delete('/:id',deleteSingleTag);

module.exports = tags;