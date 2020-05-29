const pinsRouter = require("express").Router();
const { createPin, deletePin, leftJoinPinsUsers, getAllPins, updatePin, getPinsByTag, getSinglePin, getAllPinsByUser } = require("../queries/pins")



pinsRouter.get('/', getAllPins);

pinsRouter.get('/', leftJoinPinsUsers);

pinsRouter.get('/:id', getSinglePin);

pinsRouter.get('/hashtag/:hashtag', getPinsByTag);
pinsRouter.get('/:id/pins', getAllPinsByUser)

pinsRouter.post('/', createPin);
pinsRouter.delete('/:id', deletePin);
pinsRouter.patch('/:id', updatePin);

module.exports = pinsRouter;