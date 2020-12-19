const pins = require("../../node_modules/express").Router();
// const {uploadImage} = require("../../queries/imageUploader");

const { checkFirebaseToken } = require('../../middleware/auth');



const { 
    createPin, 
    deletePin, 
    // getAllPinsByUser,
    // leftJoinPinsUsers,
    getAllPins, 
    getAllTagsForPin,
    updatePin, 
    getPinsByTag, 
    getSinglePin,  
} = require("../../queries/Pins/pins")



pins.get('/', getAllPins);
// pins.get('/', leftJoinPinsUsers);
// pins.get('/:id', getAllPinsByUser);
pins.get('/:id', getSinglePin);
pins.get('/tag/:id', getPinsByTag);
pins.get('/:id/tags', getAllTagsForPin);
pins.post('/', createPin);
pins.delete('/:id', checkFirebaseToken, deletePin);
pins.patch('/:id', checkFirebaseToken, updatePin);

module.exports = pins;