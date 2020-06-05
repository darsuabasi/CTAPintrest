const pinComments = require('express').Router({mergeParams: true});

const {
    getAllCommentsForPin,
    deleteCommentByPin, 
    createNewComment
    // editCommentOnPin
} = require("../../../queries/Pins/pins")

pinComments.get("/:id", getAllCommentsForPin);
pinComments.delete("/:id/comments/:comment_id", deleteCommentByPin);
pinComments.post("/:id/comments/", createNewComment);
// pinComments.patch("/:id/comments/:comment_id", editCommentOnPin)



module.exports = pinComments;