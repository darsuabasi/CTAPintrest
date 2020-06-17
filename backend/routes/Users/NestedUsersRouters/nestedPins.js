const userPins = require("express").Router({ mergeParams: true});

const {
    getAllUserPins, 
    createUserPin, 
    getSinglePinByUser,
    deleteUserPin,
    editUserPin,
} = require("../../../queries/Users/users")

userPins.get("/", getAllUserPins);
userPins.post("/", createUserPin);
userPins.get("/:id/pins/:pin_id", getSinglePinByUser);
userPins.delete("/:id/pins/:pin_id", deleteUserPin);
userPins.patch("/:id/pins/:pin_id", editUserPin)


module.exports = userPins;