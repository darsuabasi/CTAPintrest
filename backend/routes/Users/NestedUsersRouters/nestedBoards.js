const userBoardsRouter = require('express').Router({mergeParams: true});

const {
    getAllBoardsByUser, 
    createNewBoardForUser,
    getSingleBoardByUser, 
    deleteBoardByUser,
    editBoardByUser
} = require("../../../queries/Users/users");

userBoardsRouter.get("/:id", getAllBoardsByUser);
userBoardsRouter.post("/:id", createNewBoardForUser);
userBoardsRouter.get("/:id/boards/:board_id", getSingleBoardByUser)
userBoardsRouter.delete("/:id/boards/:board_id", deleteBoardByUser);
userBoardsRouter.patch("/:id/boards/:board_id", editBoardByUser)


module.exports = userBoardsRouter;
