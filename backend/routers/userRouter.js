const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../config/auth')
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.put('/bookmark/:id',authMiddleware.authenticated,userController.bookmark)
router.get('/profile/:id',authMiddleware.authenticated,userController.getProfile)
router.get('/allusers/:id',authMiddleware.authenticated,userController.getAllOtherUsers);
router.post('/follow/:id',authMiddleware.authenticated,userController.follow);
router.post('/unfollow/:id',authMiddleware.authenticated,userController.unFollow)

module.exports = router;