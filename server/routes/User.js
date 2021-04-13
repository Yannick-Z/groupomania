const express = require('express')
const router = express.Router()
const userController = require('../controllers/userCtrl');







router.post("/register", userController.register);

router.get('/login', userController.loginWithSession);

router.post("/login", userController.login); 

module.exports = router;