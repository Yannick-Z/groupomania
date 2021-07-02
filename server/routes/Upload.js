const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const uploadsController = require('../controllers/uploadsCtrl');
const auth = require('../middleware/auth');

//Routes des posts avec multer et le middleware auth
router.post('/', multer, auth,  uploadsController.createPost);

router.get('/', multer,   uploadsController.getPost);

router.post('/byUser/:token', auth, uploadsController.getUser); 

router.post('/like', auth, uploadsController.like);

router.put('/update/:id', multer, uploadsController.modifyPost);

router.delete('/delete/:id',auth, multer, uploadsController.deletePost);

router.post('/comment',  uploadsController.comment);



module.exports = router; 