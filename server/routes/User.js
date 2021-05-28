const express = require('express')
const router = express.Router()
const userController = require('../controllers/userCtrl');
const tokenVerify = require('../middleware/auth');


router.post("/register", userController.register);

router.post('/login/token', tokenVerify,  userController.loginWithToken);

router.post("/login", userController.login); 





module.exports = router;