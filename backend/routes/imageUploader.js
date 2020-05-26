const imageUploaderRouter = require('express').Router();
const { uploadImage } = require('../queries/imageUploader');

imageUploaderRouter.post('/', uploadImage);

module.exports = imageUploaderRouter;



