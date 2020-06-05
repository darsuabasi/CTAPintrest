const boards = require("express").Router();
// '../../node_modules/express'
// const { uploadImage } = require("../../queries/imageUploader");
const { checkFirebaseToken } = require('../../middleware/auth');


const { 
    createBoard, 
    deleteBoard, 
    getAllBoards, 
    updateBoard, 
    getBoardsByTag, 
    getSingleBoard 
} = require("../../queries/Boards/boards");


boards.get('/', getAllBoards);
boards.post('/', createBoard);

boards.get('/:id', getSingleBoard);
boards.delete('/:id', deleteBoard);
boards.patch('/:id', checkFirebaseToken, updateBoard);
boards.get('/hashtag/:hashtag', getBoardsByTag);



module.exports = boards;




