const boardPins = require('express').Router({mergeParams: true});

const {
    getAllPinsForSingleBoard 
} = require("../../../queries/Boards/boards");

boardPins.get("/:id/pins", getAllPinsForSingleBoard);

module.exports = boardPins