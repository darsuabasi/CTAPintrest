const db = require('../../db/index');
const upload = require("./imageUploader")


const createBoard = async (req, res, next) => {
   try {
    console.log("Uhm create ya board");
    upload(req, res, err => {
        try {
        console.log("Yurrr upload that");
        const { board_name, board_description, creator_id, created_date } = req.body;
        let board_image = "/uploads/" + req.file.filename;
        db.one(
            `INSERT INTO Boards(board_name, board_description, creator_id, created_date, board_image) VALUES( $1, $2, $3, $4, $5) RETURNING *`,
            [board_name, board_description, creator_id, created_date, board_image])
            .then(done => {
                console.log("then");
                res.status(200).json({
                  status: "ok",
                  post: done,
                  message: "Yessir, your new Board was created"
        })
                });
          } catch (err) {
            console.log(err)
            next(err)
            }
      });
      
      } catch (error) {
        console.log(error);
        next(error);
        }   
    };


 

const deleteBoard = async (req, res, next) => {
    try {
        let { id } = req.params;
        let singleBoard = await db.one("DELETE FROM Boards WHERE id = $1 RETURNING *", id);
        res.status(200).json({
            status: "Success",
            message: "Board " + id + " was successfully deleted!",
            body: {
                singleBoard
            }
        }) 
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Sorry, this board could not be deleted. Try again later."
        });
        next(err)
    }

}

const getAllBoards =  async (req, res, next) => {
    try {
        const allTheBoards = await db.any('SELECT * FROM Boards ORDER BY time_stamp DESC');
        res.status(200).json({
            status: "Success",
            message: "All boards are now showing",
            payload: allTheBoards
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Sorry dweeb, boards aren't showing."
        })
        next(err)
    }
}

const updateBoard = async (req, res, next) => {
    try {
        let { id } = req.params
        // let singularBoard = await db.one(`UPDATE Boards SET note = $1 WHERE id = ${req.params.id} RETURNING *`, [req.body.note]);
        const singularBoard = await db.one(`UPDATE Boards SET board_name = $/board_name/, board_description = $/board_description/, board_image = $/board_image/ WHERE id = ${req.params.id} RETURNING *`)
        res.status(200).json({
            message: "Congrats, your board was updated!",
            payload: singularBoard
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Damn, couldn't update the board.. try again later"
        })
        next(err)
    }

}

const getBoardsByTag = async (req, res, next) => {
    try {
        let boardWithTag = await db.any(`SELECT Boards.id, Boards.board_name, FROM boards JOIN hashtags ON hashtags.board_id = boards.id LEFT JOIN Users ON Boards.creator_id = Users.id WHERE TAG_NAME = $1 ORDER BY time_stamp DESC`, [req.params.hashtag]);
        res.status(200).json({
            status: "Succes",
            message: "Now viewing a board via tag",
            payload: boardWithTag
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "Sis, Sir... try again"
        })
        next(err)
    }

}

const getSingleBoard = async (req, res, next) => {
    try {
        let soloBoard = await db.one('SELECT * FROM Boards WHERE id= $1', [req.params.id]);
        res.status(200).json({
            status: "Success",
            message: "Yo, big ups! You can now see this single board",
            payload: soloBoard
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Yikes, could not locate that single board"
        })
        next(err)
    }

}



const getAllPinsForSingleBoard = async (req, res, next) => {
    try {
        let allPinsForBoard = await db.any(`SELECT * FROM Pins WHERE board_id = $1`, [req.params.board_id]);
        res.status(200).json({
            status: "Success",
            messgae: "Aye, aye, aye you're now viewing all pins for this particular board",
            payload: {
                board: req.params.board_id,
                allPinsForBoard
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "Lo siento, couldn't get any pins for this particular board"
        })
        next(err)
    }
}


// const getAllBoardsByUser = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         let allBoards = await db.any(`SELECT Users.username, Boards.* 
//                                     FROM Users 
//                                     LEFT JOIN Boards ON Users.id = Boards.creator_id
//                                     WHERE creator_id= $1`, [id])
//         res.status(200).json({
//             status: "Succes",
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




module.exports = { createBoard, deleteBoard, getAllBoards, updateBoard, getBoardsByTag, getSingleBoard, getAllPinsForSingleBoard /*, getAllBoardsByUser*/ }