const db = require("../db/index");

const createPin = async (req, res, next) => {
    try {
        let newPin = await db.one(
            `INSERT INTO Pins(creator_id, note) VALUES('${req.body.creator_id}', '${req.body.note}') RETURNING * `);
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
        let allThePins = await db.any('SELECT * FROM Pins ORDER BY time_stamp DESC');
        res.status(200).json({
            status: "Success",
            message: "All pins are now showing",
            payload: allThePins
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

const getPinsByHashtag = async (req, res, next) => {
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

module.exports = { createPin, deletePin, getAllPins, updatePin, getPinsByHashtag, getSinglePin }