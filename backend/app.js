const express = require('express');

// const fileUpload = require('express-fileupload')
// const bootstrap = require('bootstrap');

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users')
const pinsRouter = require('./routes/pins')
const imageUploaderRouter = require('./routes/imageUploader')
const boardsRouter = require('./routes/boards')
const likesRouter = require('./routes/likes');
const tagsRouter = require('./routes/tags')

const PORT = process.env.PORT;
const app = express();
// app.use(fileUpload());
// app.use(bootstrap());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/pins', pinsRouter);
app.use('/api/pins/uploads', imageUploaderRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/tags', tagsRouter);


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
//         res.json({ fileName: myImage.name, filePath:`/uploads/${myImage.name}`});
//     })
//     next(err)
// })

app.use((err, req, res, next) => {
    console.log(err);
    if(err.status) {
        res.status(err.status).json(err)
    } else {
        res.status(500).json(err)
    }
    next(err)
})

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})