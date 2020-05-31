const db = require('../../db/index');

const createBoard = async (req, res, next) => {
   try {
       const newBoard = await db.one(
           `INSERT INTO Boards(id, board_name, board_description, creator_id) VALUES( '${req.body.id}', '${req.body.board_name}', '${req.body.board_description}', '${req.body.creator_id}') RETURNING *`
       );
       res.status(200).json({
            status: "Success",
            payload: newBoard, 
            message: "Yessir, your new Board was created"
        });
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Board could not be created at this time.",
        })
        next(err)
    }
}

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
        let allTheBoards = await db.any('SELECT * FROM Boards');
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
        // let singularBoard = await db.one(`UPDATE Boards SET note = $1 WHERE id = ${req.params.id} RETURNING *`, [req.body.note]);
        const singularBoard = await db.one(`UPDATE Boards SET board_name = $/board_name/, board_description = $/board_description/, board_image = $/board_image/ WHERE id = ${req.params.id} RETURNING *`, [req.body])
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





module.exports = { createBoard, deleteBoard, getAllBoards, updateBoard, getBoardsByTag, getSingleBoard, /*getAllBoardsByUser*/ }