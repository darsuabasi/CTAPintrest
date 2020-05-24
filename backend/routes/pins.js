const pins = require("express").Router();
const { createPin, deletePin, getAllPins, updatePin, getPinsByHashtag, getSinglePin } = require("../queries/pins")

pins.get("/", getAllPins);
pins.post("/", createPin);

pins.get("/:id", getSinglePin);
pins.delete("/:id", deletePin);
pins.patch('/:id', updatePin);
pins.get('/hashtag/:hashtag', getPinsByHashtag);

module.exports = pins