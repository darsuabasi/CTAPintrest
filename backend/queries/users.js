const db = require("../db/index");

const createUser = async (req, res, next) => {
    try {
        const newUser = await db.none(
            "INSERT INTO Users (id, username, first_name, last_name, bio, profilePic, email) VALUES(${id}, ${username}, ${first_name}, ${last_name}, ${bio}, ${profilePic}, ${email})",
            req.body
        );
        res.status(200).json({
            newUser, 
            message: "Ayeee new user created"
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
            allUsers, 
            message: "All users listed!"
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
    try {
        const getUser = await db.one('SELECT * FROM Users WHERE id= $1', [req.params.id]);
        res.status(200).json({
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
  

module.exports = { createUser, getAllUsers, getSingleUser, updateUser, deleteUser };
