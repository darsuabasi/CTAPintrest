// const db = require("../db/index");
// const fileUpload = require('express-fileupload')
const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();

// const fs = require('fs')



const uploadImage = async (req, res, next) => {
   
    app.use(express.static(path.resolve(__dirname, "./public")));
   //  app.use(express.static(path.resolve(__dirname, "./public")))

   //  const storage = multer.diskStorage({
   //    destination: "/../frontend/public/assets",
   //    filename: function(req, file, cb){
   //       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   //    }
   // });


   const storage = multer.diskStorage({
      destination: "../../frontend/public/assets/uploads",
      filename: function(req, file, cb){
         cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
      }
   });

   // const { queries } = require('../../frontend/public/assets/uploads')




      // const storage = multer.diskStorage({
      //    destination: function (req, file, callback) {
      //       const dir = "./uploads";

      //       if(!fs.existsSync(dir))
      //       {
      //          fs.mkdirSync(dir);
      //       }
      //       callback(null, dir)
      //    },
      //    filename: function (req, file, callback) {
      //       callback(null, "IMAGE-" + Date.now() + path.extname.file.originalname)
      //    }
      // })


      const upload = multer({
         storage: storage,
         limits: {fileSize: 1000000},
      }).single('myImage');


      upload(req, res, 
         function(err) {
            //   console.log("Request ---", req.body);
            //   console.log("Request file ---", req.file);
            try {
              res.json({
               status: 'Success',
                  message: 'Image was successfully uploaded',
                  payload: "/../../../assets/uploads" + req.file.filename,
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



