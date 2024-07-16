const express = require('express');
const router = express.Router();
const authMiddleware = require("../config/auth");
const tweetController = require('../controllers/tweet.controller');

router.post('/create',authMiddleware.authenticated,tweetController.createTweet);
router.delete('/delete/:id',authMiddleware.authenticated,tweetController.deleteTweet);
router.put('/like/:id',authMiddleware.authenticated,tweetController.likeOrDislike)
router.get('/alltweets/:id',authMiddleware.authenticated,tweetController.getAllTweets)
router.get('/followingtweets/:id',authMiddleware.authenticated,tweetController.getFollowingTweets)
router.post('/favorite',authMiddleware.authenticated,tweetController.getAllFavoriteTweets);
module.exports = router;