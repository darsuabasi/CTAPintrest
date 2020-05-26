const usersRouter = require("express").Router();
const { createUser, getAllUsers, getSingleUser, deleteUser, updateUser } = require("../queries/users")

usersRouter.get("/", getAllUsers);
usersRouter.post("/", createUser);

usersRouter.get('/:id', getSingleUser);
usersRouter.delete('/:id', deleteUser)
usersRouter.patch('/:id', updateUser)


module.exports = usersRouter;





