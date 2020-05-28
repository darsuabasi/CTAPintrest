const db = require('../db/index');

const getAllTags = async (req, res, next) => {
    try {
        let allTags = await db.any('SELECT DISTINCT tag_name FROM Tags');
        res.status(200).json({
            status: 'Success',
            message: 'Ayeee peep all the tags tho',
            payload: allTags
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            status: 'Error',
            message: 'Yikes, all tags not showing...'
        })
    }

}

const getSingleTagForPin = async (req, res, next) => {
    try {
        let singleTag = await db.any('SELECT * FROM Tags WHERE pin_id = $1', [req.params.pin_id]);
        res.status(200).json({
            status: 'Success',
            message: 'Check out this tag for a solo pin',
            payload: singleTag
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            status: 'Error',
            message: 'Cant view this tag for this pin',
        })
    }

}

const getSingleTagForBoard = async (req, res, next) => {
    try {
        let singleBoard = await db.any('SELECT * FROM Tags WHERE pin_id = $1', [req.params.board_id]);
        res.status(200).json({
            status: 'Success',
            message: 'Check out this tag for a solo board',
            payload: singleBoard
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            status: 'Error',
            message: 'Cant view this tag for this board',
        })
    }

} 


const tagBasedOnPin = async (req, res, next) =>{
    try {
        let taggedPin = await db.any(`SELECT Pins.id AS pin_id, Pin.imageUrl, ARRAY_AGG(Tags.tag_name) FROM Tags LEFT JOIN Pins ON Tags.pin_id = Pins.id GROUP BY Pins.id`);
        res.status(200).json({
            status: 'Success',
            message: 'You are now viewing tags based on this pin... enjoy',
            payload: taggedPin
        })
    } catch(err){
        res.status(400).json({
            status: 'Error',
            message: 'Cant see the tags based on this pin.. later'
        })

    }
}

const tagBasedOnBoard = async (req, res, next) => {
    try {
        let taggedBoard = await db.any(`SELECT Boards.id AS board_id, ARRAY_AGG(Tags.tag_name) FROM Tags LEFT JOIN Boards ON Tags.board_id = Boards.id GROUP BY Boards.id`);
        res.status(200).json({
            status: 'Success',
            message: 'You are now viewing tags based on this board... enjoy',
            payload: taggedBoard
        })
    } catch(err){
        res.status(400).json({
            status: 'Error',
            message: 'Cant see the tags based on this board.. later'
        })

    }

}


const addNewTag = async (req, res, next) => {
    try{
        let newTag = await db.none(`INSERT INTO Tags (creator_id, pin_id, board_id, tag_name) VALUES('${req.body.creator_id}', '${req.body.pin_id}', '${req.body.board_id}, '${req.body.tag_name}'')`)
        res.status(200).json({
            status: 'Succes',
            message: 'Check you out... you just made a new tag'
        })

    }catch(error){
        console.log(err)
        res.status(400).json({
            status: 'Error',
            message: 'Nah counldnt create a new tag'
        })
    }
}


const updateSingleTag = async (req, res, next) => {
    try{
        let updateTags = await db.one(`UPDATE Tags SET creator_id = $/creator_id/ pin_id = $/pin_id/, board_id = $/board_id/, tag_name = $/tag_name/ WHERE tag_name = ${req.params.tag_name} RETURNING *`, req.body)
        res.status(200).json({
            status: 'Success',
            message: 'Yessirrr tag updated',
            payload: updateTags
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            status: 'Error',
            message: 'Tragic because the tag could not be updated'
        })
    }

}


const deleteSingleTag = async (req, res, next) => {
    try{
        let removeTag = await db.one('DELETE FROM Tags WHERE id = $1 RETURNING *', [req.params.id]);
        res.status(200).json({
            status: 'Succes',
            message: 'Tags deleted... looking lame',
            payload: removeTag
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            status: 'Error',
            message: 'Tag not deleted... sucks 2bu'
        })
    }

}



module.exports = { getAllTags, getSingleTagForPin, getSingleTagForBoard, tagBasedOnPin, tagBasedOnBoard, addNewTag, updateSingleTag, deleteSingleTag}