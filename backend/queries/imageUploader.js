// const db = require("../db/index");
const express = require('express');
const fileUpload = require('express-fileupload')
const app = express();

app.use(fileUpload());


const uploadImage = async (req, res, next) => {
    app.post("/pins/upload-image", (req, res, next) => {
        if(req.files === null) {
            return res.status(400).json({
                message: "Yikes, file wasn't uploaded"
            });
        }
        const myImage = req.files.file;
    
        myImage.mv(`${__dirname}/frontend/public/uploads/${myImage.name}`, err => {
            if(err) {
                console.log(err);
                return res.status(500).send(err)
            }
            res.json({ fileName: myImage.name, filePath:`/uploads/${myImage.name}`});
        })
        next(err)
    })
    try {

    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: "Yikes, image could not be uploaded at this time.",
        })
        next(err)

    }
}

module.exports = {uploadImage}



