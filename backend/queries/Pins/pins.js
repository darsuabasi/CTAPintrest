const db = require('../../db/index');
const upload = require("./imageUploader")

const createPin = async (req, res, next) => {
    try {
        console.log("Create your pin");
        upload(req, res, err => {
            try {
            console.log("Upload your photo");
            const { creator_id, board_id, note } = req.body;
            let imageUrl = "/uploads/" + req.file.filename;
            db.one(
                `INSERT INTO Pins(imageUrl, creator_id, board_id, note) VALUES( $1, $2, $3, $4) RETURNING *`,
                [imageUrl, creator_id, board_id, note])
                .then(done => {
                    console.log("then");
                    res.status(200).json({
                      status: "ok",
                      post: done,
                      message: `Yessir, the pin was created and is now added to board ${board_id} `
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



const deletePin = async (req, res, next) => {
    try {
        let { id } = req.params;
        let singlePin = await db.one("DELETE FROM Pins WHERE id = $1 RETURNING *", id);
        res.status(200).json({
            status: "Success",
            message: "Pin " + id + " was successfully deleted!",
            body: {
                singlePin
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


const getAllPins = async (req, res, next) => {
    try {
        // this line does pull all pins with tag name but its duplicating the amount of pins and im not sure why or how
        // const allThePins = await db.any('SELECT Pins.id, Pins.imageUrl, Pins.creator_id, Pins.board_id, Pins.note, Users.id AS creator_id, Users.username, Users.profilePic, Tags.id AS tag_id, Tags.tag_name FROM Pins JOIN Users ON Pins.creator_id = Users.id JOIN Tags ON Tags.creator_id = Users.id ORDER BY time_stamp DESC');
        const allThePins = await db.any('SELECT Pins.id AS pin_id, Pins.imageUrl, Pins.creator_id, Pins.board_id, Pins.note, Users.id, Users.username, Users.profilePic FROM Pins LEFT JOIN Users ON Pins.creator_id = Users.id ORDER BY time_stamp DESC');
        res.status(200).json({
            status: "Success",
            message: "All pins are now showing",
            payload: allThePins,
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Sorry, pins aren't showing."
        })
        next(err)
    }
}

const updatePin = async (req, res, next) => {
    try {
        const singularPin = await db.one(`UPDATE Pins SET note = $1 WHERE id = ${req.params.id} RETURNING *`, [req.body]);
        res.status(200).json({
            message: "Congrats, your pin was updated!",
            payload: singularPin
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Could not update the pin.. try again later"
        })
        next(err)
    }
}

const getPinsByTag = async (req, res, next) => {
    try {
        let postWithHashtag = await db.any(`SELECT Pins.id, Pins.note, FROM pins JOIN hashtags ON hashtags.pin_id = pins.id LEFT JOIN Users ON Pins.creator_id = Users.id WHERE TAG_NAME = $1 ORDER BY time_stamp DESC`, [req.params.hashtag]);
        res.status(200).json({
            status: "Succes",
            message: "Now viewing a post based on hashtags",
            payload: postWithHashtag
        })
    } catch (err) {
        res.status(400).json({
            status: "Errow",
            message: "Sis, Sir... try again"
        })
        next(err)
    }
}


const getSinglePin = async (req, res, next) => {
//     SELECT * FROM terms WHERE id IN 
//    (SELECT term_id FROM terms_relation WHERE taxonomy = "categ")
    const { id } = req.params
    try {
        // let soloPin = await db.one('SELECT * FROM Pins WHERE id IN (SELECT id AS tag_id FROM Tags WHERE pin_id =$1)', [id]);
        let soloPin = await db.one('SELECT * FROM Pins WHERE id= $1', [id]);
        res.status(200).json({
            status: "Success",
            message: "Yo! You can now see this single pin.",
            payload: soloPin
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Yikes, could not locate that single pin"
        })
        next(err)
    }
}

// fetch pins by id
const getAllPinsByUser = async (req, res, next) => {
    const { id } = req.params
    try{
        let pin_id = await db.any('SELECT * FROM Pins WHERE creator_id= $1', [id])
        res.status(200).json({
            status: "Succes",
            message: "Yip Yip! You're checking out all pins from this user",
            payload: pin_id
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "You can't see this user's pins."
        })
        next(err)
    }
}

// const leftJoinPinsUsers = async (req, res, next) =>{
//     try {
//         let leftJoin = await db.any('SELECT Pins.id, Pins.imageUrl, Pins.note, Users.id, Users.username, Users.profilePic FROM Pins LEFT JOIN Users ON Pins.creator_id = Users.id ORDER BY time_stamp DESC');
//         res.status(200).json({
//             status: 'Success',
//             message: 'Left join was a success, you are now viewing all pins.',
//             payload: leftJoin
//         })
//     } catch(err){
//         res.status(400).json({
//             status: 'Error',
//             message: 'Merp, viewing all pins was not a success.'
//         })
//         next(err)
//     }
// }

const getAllCommentsForPin = async (req, res, next) => {
    try {
        let allCommentsByPin = await db.any("SELECT * FROM Comments WHERE pin_id = $1 ORDER BY time_stamp DESC RETURNING *", 
        req.params.pin_id);
        res.status(200).json({
            status: "Success",
            message: "All comments for this pin is now showing",
            payload: allCommentsByPin,
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Sorry, comments this pin aren't showing."
        })
        next(err)
    }

}



const createNewComment = async (req, res, next) => {
    try {
        let { id } = req.params;
        let createComment = await db.one("INSERT INTO Comments ()", [id])
        res.status(200).json({
            status: "Success",
            message: "Yessir, created a new comment",
            body: {
                createComment
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "Dang, couldn't create a comment"
        })
        next(err)
    }
}



const deleteCommentByPin = async (req, res, next) => {
    try {
        let { id, comment_id } = req.params;
        let deleteThisComment = await db.one("INSERT INTO Comments ()", [id, comment_id])
        res.status(200).json({
            status: "Success",
            message: "Either you're a hater or your comment had errors, comment was deleted",
    body: {
        deleteThisComment
    }
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "Ha, couldn't delete your comment!"
        })
        next(err)
    }
}

const getAllTagsForPin = async (req, res, next) => {
    const { id } = req.params
    try{
        let getAllTags = await db.one('SELECT * FROM Tags WHERE pin_id = $1', [id]);
        // let getAllTags = await db.one('SELECT * FROM Tags WHERE pin_id = $1', [id]);
        res.status(200).json({
            status: 'Succes',
            message: 'Now viewing all hashtags on this pin.',
            payload: getAllTags
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            status: 'Error',
            message: 'No hashtags available for viewing on this pin.'
        })
    }

}




module.exports = { createPin, getAllPinsByUser, deletePin, getAllPins, updatePin, getPinsByTag, getSinglePin, getAllCommentsForPin, createNewComment, deleteCommentByPin, getAllTagsForPin}











