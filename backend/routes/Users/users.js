const users = require("express").Router();
// ../../node_modules/express
const { checkFirebaseToken } = require('../../middleware/auth');


const { 
    createUser, 
    getAllUsers, 
    getSingleUser, 
    deleteUser, 
    updateUser 
} = require("../../queries/Users/users");


users.get("/", checkFirebaseToken, getAllUsers);
users.post("/", createUser);

users.get('/:id', getSingleUser);
users.delete('/:id', checkFirebaseToken, deleteUser)
users.patch('/:id', checkFirebaseToken,  updateUser)


module.exports = users;





