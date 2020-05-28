const db = require('../db/index');


// const leftJoinPinsUsers = async (req, res, next) =>{
//     try{
//         let leftJoin = await db.any('SELECT Pins.id, Pins.imageUrl, Pins.note, Users.username, Users.profilePic FROM Pins LEFT JOIN Users ON Pins.creator_id = Users.id ORDER BY time_stamp DESC');
//         res.status(200).json({
//             status: 'Success',
//             message: 'Left join was a success',
//             payload: leftJoin
//         })
//     }catch(error){
//         res.status(400).json({
//             status: 'Error',
//             message: 'Left join was not success'
//         })

//     }
// }

const createPin = async (req, res, next) => {
    try {
        const newPin = await db.one(
            `INSERT INTO Pins(id, imageUrl, creator_id, board_id, note) VALUES( '${req.body.id}', '${req.body.imageUrl}' '${req.body.creator_id}', '${req.body.board_id}' '${req.body.note}') RETURNING * `);
        // "INSERT INTO Pins (id, creator_id, note) VALUES( ${id}, ${creator_id}, ${note}", 
        // req.body
    //    );
        res.status(200).json({
            status: "Success",
            payload: newPin, 
            message: "Yessir, pin created"
        });
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Pin could not be created at this time.",
        })
        next(err)
    }
}

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
        const allThePins = await db.any("SELECT * FROM Pins ORDER BY time_stamp DESC");
        res.status(200).json({
            status: "Success",
            message: "All pins are now showing",
            payload: allThePins,
        })
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Sorry dweeb, pins aren't showing."
        })
        next(err)
    }
}

const updatePin = async (req, res, next) => {
    try {
        const singularPin = await db.one(`UPDATE Pins SET note = $1 WHERE id = ${req.params.id} RETURNING *`, [req.body.note]);
        res.status(200).json({
            message: "Congrats, your pin was updated!",
            payload: singularPin
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Damn, couldn't update the pin.. try again later"
        })
        next(err)
    }
}

const getPinsByTag = async (req, res, next) => {
    try {
        let postWithHashtag = await db.any(`SELECT Pins.id, Pins.note, FROM pins JOIN hashtags ON hashtags.pin_id = pins.id LEFT JOIN Users ON Pins.creator_id = Users.id WHERE TAG_NAME = $1 ORDER BY time_stamp DESC`, [req.params.hashtag]);
        res.status(200).json({
            status: "Succes",
            message: "Now viewing a post via hashtag",
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
    try {
        let soloPin = await db.one('SELECT * FROM Pins WHERE id= $1', [req.params.id]);
        res.status(200).json({
            status: "Success",
            message: "Yo, big ups! You can now see this single pin",
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



const getAllPinsByUser = async (req, res, next) => {
    try{
        let pin_id = await db.any('SELECT * FROM Pins WHERE creator_id= $1', [req.params.id])
        res.status(200).json({
            status: "Succes",
            message: "Yip Yip! You're checking out all pins from this user",
            payload: pin_id
        })

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Idk but you can't see all their pins"
        })
        next(err)
    }
}






module.exports = { createPin, deletePin, getAllPins, updatePin, getPinsByTag, getSinglePin, getAllPinsByUser }











