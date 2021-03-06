const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCtrl');
const tokenVerify = require('../middleware/auth');

//Routes pour les users pour le login, l'inscription et le delete user
router.post('/register', userController.register);

router.post('/login', userController.login); 

router.post('/login/token', tokenVerify, userController.loginWithToken);

router.delete('/deleteUser',  tokenVerify, userController.deleteUser);

module.exports = router;