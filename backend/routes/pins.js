const pinsRouter = require("express").Router();
const { createPin, deletePin, getAllPins, updatePin, getPinsByHashtag, getSinglePin } = require("../queries/pins")

pinsRouter.get("/", getAllPins);
pinsRouter.post("/", createPin);

pinsRouter.get("/:id", getSinglePin);
pinsRouter.delete("/:id", deletePin);
pinsRouter.patch('/:id', updatePin);
pinsRouter.get('/hashtag/:hashtag', getPinsByHashtag);

module.exports = pinsRouter;