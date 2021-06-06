const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const { promisify } = require("util");
const uploadsController = require('../controllers/uploadsCtrl');

const auth = require('../middleware/auth');


router.post("/", auth, multer, uploadsController.createPost);

router.get("/", uploadsController.getPost);

router.get("/byUser/:token", uploadsController.getUser);

router.post('/like',auth, uploadsController.like);

router.put('/update/:id',auth, multer, uploadsController.modifyPost);

router.delete('/delete/:id', auth,multer, uploadsController.deletePost);

router.post('/comment', auth, multer, uploadsController.comment);

module.exports = router; 