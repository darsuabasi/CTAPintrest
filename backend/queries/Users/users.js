const db = require("../../db/index");

const createUser = async (req, res, next) => {
    try {
        let newUser = await db.one(
            "INSERT INTO Users (id, username, first_name, last_name, bio, profilePic, email) VALUES(${id}, ${username}, ${first_name}, ${last_name}, ${bio}, ${profilePic}, ${email}) RETURNING *",
            req.body
        );
        res.status(200).json({
            message: "Ayeee new user created",
            payload: newUser
        });
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Yikes, account could not be created at this time."
        })
        next(err);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await db.any("SELECT * FROM Users");
        res.status(200).json({
            status: "Success",
            message: "All users listed!",
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
            message: "Checking out a single user by id",
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "User could not be found"
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
            message: "Yessirrrr user was updated",
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "User could not be updated"
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
        let pinsByUser = await db.any('SELECT * FROM Pins WHERE creator_id = $1', [id])
        res.status(200).json({
            status: "Succes",
            message: "Yip Yip! You're checking out all pins from " + creator_id,
            payload: pinsByUser
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Idk but you can't see all their pins"
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
            message: "Ayee you created a new board for a specific user",
            body: {
                newPinByUser
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "My bad but you can't create a board for this specific user"
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
            message: "Yo, big ups! You can now see this single pin",
            payload: soloPinByUser
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Yikes, could not locate that single pin"
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
            message: "Damn, couldn't update YOUR pin.. try again later"
        })
        next(err)
    }
}


const getAllBoardsByUser = async (req, res, next) => {
    try {
        let allBoards = await db.any(`SELECT * FROM Boards WHERE creator_id= $1`, [req.params.creator_id])
        res.status(200).json({
            status: "Succes",
            message: "Yip Yip! You're checking out all boards for this user",
            payload: {
                owner: req.params.creator_id,
                allBoards
            }
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Idk but you can't see all their boards. Maybe you're blocked lol"
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
            message: "Ayee you created a new board for a specific user",
            body: {
                newBoardByUser
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "My bad but you can't create a board for this specific user"
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
            message: "Yo, big ups! You can now see this single board for this specific user",
            payload: soloBoard
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Yikes, could not locate that single board for this specifi user"
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









       
  

module.exports = { createUser, getAllUsers, getSingleUser, updateUser, deleteUser, getAllUserPins, createUserPin, getSinglePinByUser, deleteUserPin, editUserPin, getAllBoardsByUser, createNewBoardForUser, deleteBoardByUser, editBoardByUser, getSingleBoardByUser};
