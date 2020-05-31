const imageUploaderRouter = require('../../node_modules/express').Router();

const { 
    uploadImage 
} = require('../../queries/imageUploader');

imageUploaderRouter.post('/', uploadImage);

module.exports = imageUploaderRouter;



