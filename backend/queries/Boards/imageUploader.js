const multer = require('multer');
const path = require('path');

   const storage = multer.diskStorage({
      destination: "./public/uploads/",
      filename: function(req, file, cb) {
         cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
      }
   });
      const upload = multer({
         storage: storage,
         limits: {fileSize: 1000000},
      }).single("myImage");


module.exports = upload;



