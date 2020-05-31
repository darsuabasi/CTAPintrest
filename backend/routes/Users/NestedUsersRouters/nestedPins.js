const userPinRouter=require("express").Router({ mergeParams: true});

const {
    getAllUserPins, 
    createUserPin, 
    getSinglePinByUser,
    deleteUserPin,
    editUserPin,
} = require("../../../queries/Users/users")

userPinRouter.get("/:id", getAllUserPins);
userPinRouter.post("/:id", createUserPin);
userPinRouter.get("/:id/pins/:pin_id", getSinglePinByUser);
userPinRouter.delete("/:id/pins/:pin_id", deleteUserPin);
userPinRouter.patch("/:id/pins/:pin_id", editUserPin)


module.exports = userPinRouter;