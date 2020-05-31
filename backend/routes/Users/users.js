const usersRouter = require("../../node_modules/express").Router();
const { 
    createUser, 
    getAllUsers, 
    getSingleUser, 
    deleteUser, 
    updateUser 
} = require("../../queries/Users/users");

const { checkFirebaseToken } = require('../../middleware/auth')

usersRouter.get("/", checkFirebaseToken, getAllUsers);
usersRouter.post("/", createUser);

usersRouter.get('/:id', getSingleUser);
usersRouter.delete('/:id', deleteUser)
usersRouter.patch('/:id', updateUser)


module.exports = usersRouter;





