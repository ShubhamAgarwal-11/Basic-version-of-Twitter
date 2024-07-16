const { json } = require('express');
const Tweet = require('../models/tweet.model');
const User = require('../models/user.model')
exports.createTweet = async(req,res)=>{
    try {
        const {description,id} = req.body;
        if(!description || !id){
            return res.status(401).json({
                success : false,
                message : "All Fields are required"
            })
        }
        const user = await User.findById(id);
        console.log("user id: ",user._id)
        console.log("user name: ",user.name);
        await Tweet.create({
            description,
            userId : id,
            userDetails : user
        });
        return res.status(201).json({
            success : true,
            message : "Tweet public"
        })
    } catch (error) {
        return res.status(501).json({
            success : false,
            message : "Error while creating tweet."
        })
    }
}

exports.deleteTweet = async(req,res)=>{
    try {
        const {id} = req.params;
        // console.log(id)
        const tweet = await Tweet.findByIdAndDelete(id);
        const userId = tweet.userDetails[0]._id;
        await User.findByIdAndUpdate({_id : userId},{$pull : {bookmarks : id}})
        return res.status(200).json({
            success : true,
            message : "tweet delete successfully."
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while delete the tweet"
        })
    }
}

exports.likeOrDislike = async(req,res)=>{
    try {
        const currentUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId)
        if(tweet.like.includes(currentUserId)){
            // now we dislike the tweet
            const updatedTweet = await Tweet.findByIdAndUpdate({_id : tweetId},{$pull : {like : currentUserId}},{new : true})
            return res.status(200).json({
                success : true,
                message : "dislike your tweet",
                tweet : updatedTweet
            })

        }else{
            // here we like the tweet.
            const updatedTweet = await Tweet.findByIdAndUpdate({_id : tweetId},{$push : {like : currentUserId}},{new : true})
            return res.status(200).json({
                success : true,
                message : "like your tweet",
                tweet : updatedTweet
            })
        }
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "error while like or dislike the tweet."
        })
    }
}

exports.getAllTweets = async(req,res)=>{
    try {
        const id = req.params.id;
        const currentUser = await User.findById({_id : id});
        const currentUserTweets = await Tweet.find({userId : id});
        const followingUserTweets = await Promise.all(currentUser.following.map((otherUserId)=>{
            return Tweet.find({userId : otherUserId});
        }))
        
        return res.status(200).json({
            success : true,
            tweets : currentUserTweets.concat(...followingUserTweets)
        })
    } catch (error) {
        return res.status(500).json({
            success : "false",
            message : "Error while getting all the tweets.",
            error : error.message
        })
    }
}

exports.getFollowingTweets = async(req,res)=>{
    try {
        const id = req.params.id;
        const currentUser = await User.findById(id);
        const followingUserTweets = await Promise.all(currentUser.following.map((otherUserId)=>{
            return Tweet.find({userId : otherUserId})
        }))
        return res.status(200).json({
            success : true,
            Tweets : [].concat(...followingUserTweets)
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while getting following tweets.",
            error : error.message
        })
    }
}

exports.getAllFavoriteTweets = async(req,res)=>{
    try {
        const id = req.body.id;
        const user = await User.findById({_id : id});
        const favoriteTweets = await Promise.all(user.bookmarks.map((tweetId)=>{
            return Tweet.find({_id : tweetId});
        }))
        return res.status(200).json({
            success : true,
            Tweets : [].concat(...favoriteTweets)
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while getting favorite tweets.",
            error : error.message
        })
    }
} 