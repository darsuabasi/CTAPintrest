const db = require('../../db/index');

const getPinLikes = async (req, res, next) => {
    try {
        let pinLikes = await db.any(`SELECT * FROM Likes WHERE pin_id = $1`, req.params.pin_id)
        res.status(200).json({
            status: 'Success',
            message: 'Now viewing all likes. Success.',
            payload: pinLikes
        })
    }catch(error){
        res.status(400).json({
            status: error,
            message: 'Likes cannot be displayed.'
        })
    }
}

const addPinLike = async (req, res, next) =>{
    try{
        let addLike = await db.one(`INSERT INTO Likes (liker_id, pin_id) VALUES('${req.params.liker_id}', '${req.params.pin_id}') RETURNING *`)
        res.status(200).json({
            status: 'Success',
            payload: addLike,
            message: 'Success.. likes on pin now showing.'
        })

    } catch(error){
        res.status(400).json({
            status: error,
            message: 'Greatly appreciated but your like cannot be added at this time.'
        })
    }
}

const deletePinLike = async (req, res, next) =>{
    try {
        let removeLike = await db.one(`DELETE FROM Likes WHERE liker_id = ${req.params.liker_id} AND pin_id = ${req.params.pin_id} RETURNING *`);
        res.status(200).json({
            status: 'Success',
            message: 'Succes, your like has been removed.',
            payload: removeLike
        })
    } catch(error){
       
        res.status(400).json({
            status: error,
            message: 'Sorry, like could not be removed.
        })
    }
}

module.exports = {getPinLikes, addPinLike, deletePinLike}