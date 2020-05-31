const db = require('../../db/index');

const getPinLikes = async (req, res, next) => {
    try {
        let pinLikes = await db.any(`SELECT * FROM Likes WHERE pin_id = $1`, req.params.pin_id)
        res.status(200).json({
            status: 'Success',
            message: 'Ayeeee peep all the likes',
            payload: pinLikes
        })
    }catch(error){
        res.status(400).json({
            status: error,
            message: 'Yo, the likes arent showing'
        })
    }
}

const addPinLike = async (req, res, next) =>{
    try{
        let addLike = await db.one(`INSERT INTO Likes (liker_id, pin_id) VALUES('${req.params.liker_id}', '${req.params.pin_id}') RETURNING *`)
        res.status(200).json({
            status: 'Success',
            payload: addLike,
            message: 'Ayee, good looks on showing some love to the pin'
        })

    } catch(error){
        res.status(400).json({
            status: error,
            message: 'Greatly appreciated but your like didnt go thru'
        })
    }
}

const deletePinLike = async (req, res, next) =>{
    try {
        let removeLike = await db.one(`DELETE FROM Likes WHERE liker_id = ${req.params.liker_id} AND pin_id = ${req.params.pin_id} RETURNING *`);
        res.status(200).json({
            status: 'Success',
            message: 'Damn, you lowkey a hater. Ya like is gone now',
            payload: removeLike
        })
    }catch(error){
       
        res.status(400).json({
            status: error,
            message: 'Oh, big mad... youre like is still here'
        })
    }
}

module.exports = {getPinLikes, addPinLike, deletePinLike}