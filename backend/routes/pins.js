const pinsRouter = require("express").Router();
const { createPin, deletePin, getAllPins, updatePin, getPinsByTag, getSinglePin, getAllPinsByUser } = require("../queries/pins")


// pinsRouter.get('/', leftJoinPostsUsers);

pinsRouter.get('/', getAllPins);
pinsRouter.post('/', createPin);

pinsRouter.get('/:id', getSinglePin);
pinsRouter.delete('/:id', deletePin);
pinsRouter.patch('/:id', updatePin);
pinsRouter.get('/hashtag/:hashtag', getPinsByTag);
pinsRouter.get('/:id/pins', getAllPinsByUser)

module.exports = pinsRouter;