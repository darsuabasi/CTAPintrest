// const db = require("../db/index");
const express = require('express');
// const fileUpload = require('express-fileupload')
const app = express();
// app.use(fileUpload());
const fs = require('fs')

const multer = require('multer');
const path = require('path');


const uploadImage = async (req, res, next) => {
    // app.post("/pins/upload-image", (req, res, next) => {
    //     if(req.files === null) {
    //         return res.status(400).json({
    //             message: "Yikes, file wasn't uploaded"
    //         });
    //     }
    //     const myImage = req.files.file;
    
    //     myImage.mv(`${__dirname}/frontend/public/uploads/${myImage.name}`, err => {
    //         if(err) {
    //             console.log(err);
    //             return res.status(500).send(err)
    //         }
    //         res.json({ fileName: myImage.name, filePath:`../../public/uploads/${myImage.name}`});
    //     })
    //     next(err)
    // })
    // try {

    // } catch(err) {
    //     res.status(400).json({
    //         status: "Error",
    //         message: "Yikes, image could not be uploaded at this time.",
    //     })
    //     next(err)

    // }








    app.use(express.static(path.resolve(__dirname, "./public")));

   //  const storage = multer.diskStorage({
   //    destination: "/../frontend/public/assets",
   //    filename: function(req, file, cb){
   //       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   //    }
   // });

      const storage = multer.diskStorage({
         destination: function (req, file, callback) {
            var dir = "./uploads";

            if(!fs.existsSync(dir))
            {
               fs.mkdirSync(dir);
            }
            callback(null, dir)
         },
         filename: function (req, file, callback) {
            callback(null, file.originalname)
         }
      })



      const upload = multer({
         storage: storage,
         limits: {fileSize: 1000000},
      }).single('myFile');

   
      // const upload = multer({
      //    storage: storage,
      //    limits:{fileSize: 1000000},
      // }).single("myImage");

      upload(req, res, 
         function(err) {
            //   console.log("Request ---", req.body);
            //   console.log("Request file ---", req.file);
            try {
              res.json({
               status: 'Success',
                  message: 'image upload was successful',
                  payload: "../../assets/uploads/" + req.file.filename,
              })
              res.send("Upload successful")
              
           } catch (error) {
               res.json({
               status: err,
               message: 'Upload was not successful :(',
            })
           }
        })
}

module.exports = {uploadImage}



