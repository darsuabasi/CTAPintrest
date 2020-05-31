const pinsRouter = require("../../node_modules/express").Router();
const { 
    createPin, 
    deletePin, 
    leftJoinPinsUsers,
    getAllPins, 
    updatePin, 
    getPinsByTag, 
    getSinglePin,  
} = require("../../queries/Pins/pins")



pinsRouter.get('/', getAllPins);
pinsRouter.get('/', leftJoinPinsUsers);
pinsRouter.get('/:id', getSinglePin);
pinsRouter.get('/hashtag/:hashtag', getPinsByTag);
pinsRouter.post('/', createPin);
pinsRouter.delete('/:id', deletePin);
pinsRouter.patch('/:id', updatePin);

module.exports = pinsRouter;