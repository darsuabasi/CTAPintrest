const db = require("../../db/index");
// const upload = require('./imageUploader')

// const createUser = async (req, res, next) => {
//     try {
//         console.log("Create your user w/ picture upload");
//         upload(req, res, err => {
//             try { 
//             console.log("Upload your photo");
//             const { id, username, first_name, last_name, bio, email} = req.body;
//             let profilePic = "/uploads/" + req.file.filename;
//             let newUser = db.one(
//                 "INSERT INTO Users (id, username, first_name, last_name, bio, profilePic, email) VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING *",
//                 [id, username, first_name, last_name, bio, profilePic, email])
//                 .then(done => {
//                     console.log("then");
//                     res.status(200).json({
//                         status: "ok",
//                         post: done,
//                         message: 'A new user has been created.',
//                         payload: newUser
//                     })
//                 });
//             } catch (err) {
//                 console.log(err)
//                 next(err)
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

const createUser = async (req, res, next) => {
    const { id, username, first_name, last_name, bio, profilePic, email } = req.body;
    try {
        let newUser = await db.one(`INSERT INTO Users (id, username, first_name, last_name, bio, profilePic, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
        [id, username, first_name, last_name, bio, profilePic, email]);
        res.status(200).json({
            status: 'success',
            message: 'Congratulations, your account was created.',
            payload: newUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Yikes, your account was not created. Please try again.'
        });
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await db.any("SELECT * FROM Users");
        res.status(200).json({
            status: "Success",
            message: "All users are now being displayed!",
            payload: allUsers
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "All users cannont be displayed at this time."
        })
        next(err);
    }
}

const getSingleUser = async (req, res, next) => {
    const { id } = req.params
    try {
        // console.log(req.params)
        const getUser = await db.one('SELECT * FROM Users WHERE id = $1', id);
        res.status(200).json({
            status: "Nice",
            getUser,
            message: "Checking out a single user by id.",
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "User could not be found by id."
        });
        next(err)
    }
    // console.log(error.code)
}

const getUserByUsername = async (req, res, next) => {
    const { username } = req.params
    try {
        // console.log(req.params)
        const getUser = await db.one('SELECT * FROM Users WHERE Users.username = $1', username);
        res.status(200).json({
            status: "Nice",
            getUser,
            message: "Checking out a single user by username.",
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "User could not be found by username."
        });
        next(err)
    }
    // console.log(error.code)
}

const updateUser = async (req, res, next) => {
    try {
        const updateUser = await db.one(`UPDATE Users SET username = $/username/, first_name = $/first_name/, last_name = $/last_name/, bio = $/bio/, profilePic = $/profilePic/ WHERE id = ${req.params.id} RETURNING *`, [req.body])
                                    // (`UPDATE Posts SET poster_id = $/poster_id/, imageURL = $/imageURL/, content = $/content/ WHERE id = ${req.params.id} RETURNING *`, req.body)
                                    // (`UPDATE Users SET bio = $1 WHERE id = ${req.params.id} RETURNING *`, [req.body])
        res.status(200).json({
            updateUser,
            message: "User information has now been updated.",
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "User information could not be updated."
          });
          next(error);
    }
}


const deleteUser = async (req, res, next) => {
    try {
      let { id } = req.params;
      const singleUser = await db.one("DELETE FROM Users WHERE id = $1 RETURNING *", id);
      res.status(200).json({
        status: "Success",
        message: "Deleted user with id: " + id,
        body: {
            singleUser
        }
      });
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: "User could not be deleted!"
      });
      next(error);
    }
};

const getAllUserPins = async (req, res, next) => {
    try {
        // let { creator_id } = req.params
        let { id } = req.params
        let pinsByUser = await db.any('SELECT * FROM Pins WHERE creator_id = $1 ORDER BY time_stamp DESC', [id])
        res.status(200).json({
            status: "Succes",
            message: "Yip Yip! You're checking out all pins from " + id,
            payload: pinsByUser
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "You can not see user pins."
        })
        next(err)
    }
}

const createUserPin = async (req, res, next) => {
    try {
        let {id, board_id} = req.params;
        let {imageUrl, note} = req.body;
        let newPinByUser = await db.one("INSERT INTO Pins (creator_id, board_name, board_description, board_image) VALUES ($1, $2, $3) RETURNING *", [id, imageUrl, board_id, note])
        res.status(200).json({
            status: "Success",
            message: "A new board was created by user.",
            body: {
                newPinByUser
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "New board could not be created by user."
        })
        next(err)
    }

}

const getSinglePinByUser = async (req, res, next) => {
    try {
        let { id, pin_id } = req.params;
        let soloPinByUser = await db.one('SELECT * FROM Pins WHERE id= $1 AND pin_id = $2 RETURNING *', [id, pin_id]);
        res.status(200).json({
            status: "Success",
            message: "You can now see this single pin",
            payload: soloPinByUser
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Could not locate that single pin"
        })
        next(err)
    }
}


const deleteUserPin = async (req, res, next) => {
    try {
        let { id, pin_id } = req.params;
        // let deleteSinglePinByUser = await db.one("DELETE FROM Pins WHERE id = $1 AND pin_id = $2 RETURNING *", [id, pin_id]);
        res.status(200).json({
            status: "Success",
            message: "Pin " + pin_id + " was successfully deleted by "+ id +  "!",
            body: {
                deleteSinglePinByUser
            }
        }) 
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Sorry, this pin could not be deleted. Try again later."
        });
        next(err)
    }
}


const editUserPin = async (req, res, next) => {
    try {
        let { id, pin_id } = req.params;
        let editSinglePin = await db.one('UPDATE Pins SET note = $1 WHERE id = $1 AND pin_id = $2 RETURNING *', [id, pin_id]);
        res.status(200).json({
            message: "Congrats, YOUR pin was updated!",
            payload: editSinglePin
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Couldn't update pin.. try again later"
        })
        next(err)
    }
}


const getAllBoardsByUser = async (req, res, next) => {
    try {
        const { id } = req.params
        let allBoards = await db.any(`SELECT Users.username, Boards.* 
                                    FROM Users 
                                    LEFT JOIN Boards ON Users.id = Boards.creator_id
                                    WHERE creator_id= $1 ORDER BY created_date DESC`, [id])
        res.status(200).json({
            status: "Success",
            message: "Yip Yip! You're checking out all boards for this specific user",
            payload: {
                owner: id,
                allBoards
            }
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Can not display all boards by user."
        })
        next(err)
    }

}


const getAllBoardsByUserName = async (req, res, next) => {
    try {
        const { username } = req.params
        let allBoards = await db.any(`SELECT Users.username, Boards.* 
                                    FROM Users 
                                    LEFT JOIN Boards ON Users.id = Boards.creator_id
                                    WHERE username= $1 ORDER BY created_date DESC`, [username])
                                    console.log("this is all boards !!", allBoards )
        res.status(200).json({
            status: "Success",
            message: "Yip Yip! You're checking out all boards for this specific user",
            payload: {
                owner: username,
                allBoards
            }
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Can not display all boards by user."
        })
        next(err)
    }

}




const createNewBoardForUser = async (req, res, next) => {
    try {
        let {creator_id} = req.params;
        let {board_name, board_description, board_image} = req.body;
        let newBoardByUser = await db.one("INSERT INTO Boards (creator_id, board_name, board_description, board_image) VALUES ($1, $2, $3) RETURNING *", [creator_id, board_name, board_description, board_image])
        res.status(200).json({
            status: "Success",
            message: "Created a new board for a specific user",
            body: {
                newBoardByUser
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: 'Can not create a board for this specific user.'
        })
        next(err)
    }
}

const getSingleBoardByUser = async (req, res, next) => {
    try {
        let { id, board_id } = req.params;
        let soloBoard = await db.one('SELECT * FROM Boards WHERE id = $1 AND board_id = $2 RETURNING *', [id, board_id] );
        res.status(200).json({
            status: "Success",
            message: "You can now see this single board for this specific user.",
            payload: soloBoard
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Could not locate that single board for this specific user."
        })
        next(err)
    }
}

const deleteBoardByUser = async (req, res, next) => {
    try {
        let { id, board_id } = req.params;
        let singleBoard = await db.one("DELETE FROM Boards WHERE id = $1 AND board_id = $2  RETURNING *", [id, board_id]);
        res.status(200).json({
            status: "Success",
            message: "Board " + board_id + " was successfully deleted!",
            body: {
                singleBoard
            }
        }) 
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Sorry, this pin could not be deleted. Try again later."
        });
        next(err)
    }
}

const editBoardByUser = async (req, res, next) => {
    try {
        let { id, board_id } = req.params
        let editSingleBoard = await db.one('UPDATE Boards SET board_name = $/board_name/, board_description = $/board_description/, board_image = $/board_image/ WHERE board_id = $1 AND board_id = $2 RETURNING *', [id, board_id]);
        res.status(200).json({
            message: "Congrats, your board was updated!",
            payload: editSingleBoard
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Damn, couldn't update the board.. try again later"
        })
        next(err)
    }

}










module.exports = { createUser, getAllUsers, getSingleUser, getUserByUsername, 
    updateUser, deleteUser, getAllUserPins, createUserPin, getSinglePinByUser, 
    deleteUserPin, editUserPin, getAllBoardsByUser, getAllBoardsByUserName, createNewBoardForUser, 
    deleteBoardByUser, editBoardByUser, getSingleBoardByUser
};
