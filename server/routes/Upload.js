const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
// const { promisify } = require("util");
const uploadsController = require('../controllers/uploadsCtrl');

const auth = require('../middleware/auth');


router.post('/', multer, auth, uploadsController.createPost);

router.get('/', uploadsController.getPost);

router.get('/byUser/:token', auth, uploadsController.getUser); 

router.post('/like', auth, uploadsController.like);

router.put('/update/:id',multer, auth, uploadsController.modifyPost);

router.delete('/delete/:id',multer, auth, uploadsController.deletePost);

router.post('/comment', auth, uploadsController.comment);

module.exports = router; 