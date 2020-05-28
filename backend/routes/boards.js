const boardsRouter = require('express').Router();
const { createBoard, deleteBoard, getAllBoards, updateBoard, getBoardsByTag, getSingleBoard, getAllBoardsByUser } = require("../queries/boards");


boardsRouter.get('/', getAllBoards);
boardsRouter.post('/', createBoard);

boardsRouter.get('/:id', getSingleBoard);
boardsRouter.delete('/:id', deleteBoard);
boardsRouter.patch('/:id', updateBoard);
boardsRouter.get('/hashtag/:hashtag', getBoardsByTag);
boardsRouter.get('/:id/boards', getAllBoardsByUser);

module.exports = boardsRouter;