const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// const fileUpload = require('express-fileupload')
// const bootstrap = require('bootstrap');

const usersRouter = require('./routes/Users/users')
const pinsRouter = require('./routes/Pins/pins')
const boardsRouter = require('./routes/Boards/boards')
const likesRouter = require('./routes/Likes/likes');
const tagsRouter = require('./routes/Tags/tags');
const userPinRouter = require('./routes/Users/NestedUsersRouters/nestedPins');
const userBoardsRouter = require('./routes/Users/NestedUsersRouters/nestedBoards');
const pinCommentsRouter = require('./routes/Pins/NestedPins/NestedComments');
const boardPinsRouter = require('./routes/Boards/NestedBoards/NestedPins');

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "./public")));
app.use('/api/users', usersRouter);
app.use('/api/pins', pinsRouter);
app.use('/api/pins/uploads', pinsRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/users/pins', userPinRouter);
app.use('/api/users/boards', userBoardsRouter);
// app.use('/api/boards/uploads', boardsRouter);
app.use('/api/pins/comments', pinCommentsRouter);
app.use('/api/boards/pins', boardPinsRouter);


// // upload image
// const multer = require("multer");
// const path = require("path");


// app.use(express.static(path.resolve(__dirname, "./public")));
// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function (req, file, cb) {
//     cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
// }).single("imageUpload");




app.use((err, req, res, next) => {
    console.log(err);
    if(err.status) {
        res.status(err.status).json(err)
    } else {
        res.status(500).json(err)
    }
    next(err)
})


// app.post("/uploadphoto", (req, res) => {
//     upload(req, res, function (err) {
//       console.log("Request ---", req.body);
//       console.log("Request file ---", req.file);
//       res.json("/uploads/" + req.file.filename);
//     });
//   });

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})