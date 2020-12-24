const userBoards = require('express').Router({mergeParams: true});

const {
    getAllBoardsByUser,
    getAllBoardsByUserName,
    createNewBoardForUser,
    getSingleBoardByUser, 
    deleteBoardByUser,
    editBoardByUser
} = require("../../../queries/Users/users");

userBoards.get("/", getAllBoardsByUser);
userBoards.get("/:username/boards", getAllBoardsByUserName);
userBoards.post("/", createNewBoardForUser);
userBoards.get("/:id/boards/:board_id", getSingleBoardByUser)
userBoards.delete("/:id/boards/:board_id", deleteBoardByUser);
userBoards.patch("/:id/boards/:board_id", editBoardByUser)


module.exports = userBoards;
