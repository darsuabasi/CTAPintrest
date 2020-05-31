const pinCommentsRouter = require('express').Router({mergeParams: true});

const {
    getAllCommentsForPin,
    deleteCommentByPin, 
    createNewComment
    // editCommentOnPin
} = require("../../../queries/Pins/pins")

pinCommentsRouter.get("/:id", getAllCommentsForPin);
pinCommentsRouter.delete("/:id/comments/:comment_id", deleteCommentByPin);
pinCommentsRouter.post("/:id/comments/", createNewComment);
// pinComments.patch("/:id/comments/:comment_id", editCommentOnPin)



module.exports = pinCommentsRouter;