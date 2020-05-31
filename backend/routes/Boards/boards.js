const boardsRouter = require('../../node_modules/express').Router();

const { 
    createBoard, 
    deleteBoard, 
    getAllBoards, 
    updateBoard, 
    getBoardsByTag, 
    getSingleBoard 
} = require("../../queries/Boards/boards");


boardsRouter.get('/', getAllBoards);
boardsRouter.post('/', createBoard);

boardsRouter.get('/:id', getSingleBoard);
boardsRouter.delete('/:id', deleteBoard);
boardsRouter.patch('/:id', updateBoard);
boardsRouter.get('/hashtag/:hashtag', getBoardsByTag);



module.exports = boardsRouter;




