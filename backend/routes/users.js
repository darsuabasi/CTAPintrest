const users = require("express").Router();
const { createUser, getAllUsers, getSingleUser, deleteUser, updateUser } = require("../queries/users")

users.post("/", createUser);
users.get("/", getAllUsers);
users.get('/:id', getSingleUser);
users.delete('/:id', deleteUser)
users.patch('/:id', updateUser)



// users.get('/email/:email', getSingleUserByEmail)


module.exports = users;


