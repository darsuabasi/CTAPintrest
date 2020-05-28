const tagsRouter= require('express').Router();

const {getAllTags, getSingleTagForPin, getSingleTagForBoard, updateSingleTag, deleteSingleTag, addNewTag, tagBasedOnPin, tagBasedOnBoard } = require('../queries/tags');

tagsRouter.get('/all', getAllTags);
tagsRouter.get('/:pin_id', getSingleTagForPin);
tagsRouter.get('/:board_id', getSingleTagForBoard);
tagsRouter.get('/', tagBasedOnPin);
tagsRouter.get('/', tagBasedOnBoard)
tagsRouter.post('/',addNewTag);
tagsRouter.patch('/:tag_name',updateSingleTag);
tagsRouter.delete('/:id',deleteSingleTag);

module.exports = tagsRouter;