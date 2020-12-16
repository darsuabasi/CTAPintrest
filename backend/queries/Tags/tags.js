const db = require('../../db/index');

const getAllTags = async (req, res, next) => {
    try {
        let allTags = await db.any('SELECT DISTINCT tag_name FROM Tags');
        res.status(200).json({
            status: 'Success',
            message: 'All hashtags are now showing.',
            payload: allTags
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            status: 'Error',
            message: 'No hashtags are showing. Try again later.'
        })
    }

}

const getSingleTagForPin = async (req, res, next) => {
    try {
        let singleTag = await db.any('SELECT * FROM Tags WHERE pin_id = $1', [req.params.pin_id]);
        res.status(200).json({
            status: 'Success',
            message: 'Now viewing single hashtag for a single pin.',
            payload: singleTag
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            status: 'Error',
            message: 'Can not view hashtag for this pin.',
        })
    }

}

const getSingleTagForBoard = async (req, res, next) => {
    try {
        let singleBoard = await db.any('SELECT * FROM Tags WHERE pin_id = $1', [req.params.board_id]);
        res.status(200).json({
            status: 'Success',
            message: 'Now viewing a hashtag for this solo board.',
            payload: singleBoard
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            status: 'Error',
            message: 'Cant view hashtag for this board.',
        })
    }

} 


// const tagBasedOnPin = async (req, res, next) =>{
//     try {
//         let taggedPin = await db.any(`SELECT Pins.id AS pin_id, Pin.imageUrl, ARRAY_AGG(Tags.tag_name) FROM Tags LEFT JOIN Pins ON Tags.pin_id = Pins.id GROUP BY Pins.id`);
//         res.status(200).json({
//             status: 'Success',
//             message: 'You are now viewing tags based on this pin... enjoy',
//             payload: taggedPin
//         })
//     } catch(err){
//         res.status(400).json({
//             status: 'Error',
//             message: 'Cant see the tags based on this pin.. later'
//         })

//     }
// }

const getAllPinsByTag = async (req, res, next) => {
    const  { tag_name } = req.params;
    try {
        let pinsByTag = await db.any(`SELECT Tags.*, Pins.*, Users.profilePic, Users.username FROM Pins LEFT JOIN Users ON Pins.creator_id = Users.id LEFT JOIN Tags ON Tags.pin_id = Pins.id WHERE Tags.tag_name = $1 ORDER BY time_stamp DESC `, [tag_name]);
        if(pinsByTag.length) {
            res.status(200).json({
                status: 'Success',
                message: 'You are now viewing all pins based on this hashtag.',
                payload: pinsByTag
              });
            } else {
              throw { status: 404, error: `Can not view any pins based on ${pinsByTag}`};
            }
          } catch (error) {
            next(error);
          }
    //         res.status(200).json({
    //         status: 'Success', 
    //         message: 'You are now viewing all pins based on this hashtag.',
    //         payload: pinsByTag

    //     })
    // } catch {
    //     res.status(400).json({
    //         status: 'Error',
    //         message: 'Can not view any pins based on this hashtag. Try again laster.'
    //     })
    // }
}


const tagBasedOnBoard = async (req, res, next) => {
    try {
        let taggedBoard = await db.any(`SELECT Boards.id AS board_id, ARRAY_AGG(Tags.tag_name) FROM Tags LEFT JOIN Boards ON Tags.board_id = Boards.id GROUP BY Boards.id`);
        res.status(200).json({
            status: 'Success',
            message: 'You are now viewing hashtags based on this board... enjoy',
            payload: taggedBoard
        })
    } catch(err){
        res.status(400).json({
            status: 'Error',
            message: 'Cant see the hashtags based on this board.. later'
        })

    }

}


const addNewTag = async (req, res, next) => {
    const { creator_id, pin_id, board_id, tag_name } = req.body
    try{
        let newTag = await db.one(`INSERT INTO Tags (creator_id, pin_id, board_id, tag_name) VALUES($1, $2, $3, $4) RETURNING *`, [creator_id, pin_id, board_id, tag_name])
        res.status(200).json({
            status: 'Succes',
            message: 'You just created a new hashtag.',
            payload: newTag
        
        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            status: 'Error',
            message: 'Could not create a hashtag.'
        })
    }
}


const updateSingleTag = async (req, res, next) => {
    try{
        let updateTags = await db.one(`UPDATE Tags SET creator_id = $/creator_id/ pin_id = $/pin_id/, board_id = $/board_id/, tag_name = $/tag_name/ WHERE tag_name = ${req.params.tag_name} RETURNING *`, req.body)
        res.status(200).json({
            status: 'Success',
            message: 'Hashtag has been updated.',
            payload: updateTags
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            status: 'Error',
            message: 'Hashtag could not be updated.'
        })
    }

}


const deleteSingleTag = async (req, res, next) => {
    try{
        let removeTag = await db.one('DELETE FROM Tags WHERE id = $1 RETURNING *', [req.params.id]);
        res.status(200).json({
            status: 'Succes',
            message: 'Your hashtag has been deleted.',
            payload: removeTag
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            status: 'Error',
            message: 'Hashtag not deleted.'
        })
    }

}



module.exports = { getAllTags, getAllPinsByTag, getSingleTagForPin, getSingleTagForBoard, tagBasedOnBoard, addNewTag, updateSingleTag, deleteSingleTag}