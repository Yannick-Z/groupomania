const express = require('express');
const router = express.Router();
const multer = require ('../middleware/multer-config');
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const uploadsController = require ('../controllers/uploadsCtrl');


const unlinkAsync = promisify(fs.unlink);




const db = require('../config/db');
const dbAsync = require('../models/model');



router.post("/", multer, uploadsController.createPost);

router.get("/", uploadsController.getPost);

router.get("/byUser/:username", uploadsController.getUser); 

router.post('/like', uploadsController.like);

 router.put('/update/:id', multer, uploadsController.modifyPost);

router.delete('/delete/:id', multer, uploadsController.deletePost);

 router.post('/comment', multer, uploadsController.comment );

 router.delete('/comment', uploadsController.comment );


 


module.exports = router;