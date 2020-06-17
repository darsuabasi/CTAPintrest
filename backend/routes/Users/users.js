const users = require("express").Router();

const { checkFirebaseToken } = require('../../middleware/auth');
const userBoardsRouter = require("../Users/NestedUsersRouters/nestedBoards");
const userPinsRouter = require('../Users/NestedUsersRouters/nestedPins');


const { 
    createUser, 
    getAllUsers, 
    getSingleUser, 
    deleteUser, 
    updateUser,
} = require("../../queries/Users/users");


users.get("/", getAllUsers);
users.post("/", createUser);

users.get('/:id', getSingleUser);
users.delete('/:id', checkFirebaseToken, deleteUser);
users.patch('/:id', checkFirebaseToken,  updateUser);
users.use("/:id/boards/", userBoardsRouter);
users.use("/:id/pins/", userPinsRouter)


module.exports = users;








// const getAllBoardsByUser = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         let allBoards = await db.any(`SELECT Users.username, Boards.* 
//                                     FROM Users 
//                                     LEFT JOIN Boards ON Users.id = Boards.creator_id
//                                     WHERE creator_id= $1`, [id])
//         res.status(200).json({
//             status: "Success",
//             message: "Yip Yip! You're checking out all boards for this specific user",
//             payload: {
//                 owner: id,
//                 allBoards
//             }
//         })

//     } catch(err) {
//         res.status(400).json({
//             status: "Error",
//             message: "Idk but you can't see all their boards. Maybe you're blocked lol"
//         })
//         next(err)
//     }

// }