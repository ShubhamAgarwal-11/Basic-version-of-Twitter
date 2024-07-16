const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Tweet = require('../models/tweet.model');
exports.register = async(req,res)=>{
    try{
        const {name,username,email,password} = req.body;

        if(!name || !email || !username || !password){
            return res.status(401).json({
                success : false,
                message : "All Fields Are required."
            })
        }
        const userExisted = await User.findOne({email});
        if(userExisted){
            return res.status(401).json({
                success : false,
                message : "User Already Exist...please login"
            })
        }
        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            username,
            email,
            password : hashPassword
        })
        return res.status(201).json({
            success : true,
            message : "User Register Successfully",
            user : user
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error While register user."
        })
    }
}

exports.login = async(req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success : false,
                message : "All Fiends Are Required."
            })
        }

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(401).json({
                success : false,
                message : "User not exist....please login"
            })
        } 
        const match = await bcrypt.compare(password , userExist.password)
        if(!match){
            return res.status(401).json({
                success : false,
                message : "incorrect password"
            })
        }
        const payload = {
            id : userExist._id,
            email : userExist.email
        }
        // console.log(payload);
        const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn : "1d"});
        return res.status(200).cookie("token",token,{expiresIn : "1d"}).json({
            success : true,
            message : "Welcome Back Buddy!!",
            user : userExist
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error While login user."
        })
    }
}

exports.logout = async(req,res)=>{
    return res.clearCookie("token").json({
        success : true,
        message : "logged out successfully"
    })
}

exports.bookmark = async(req,res)=>{
    try {
        const currentUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(currentUserId);
        // const tweet = await Tweet.findById(tweetId);
        // && tweet.userDetails[0].bookmarks.includes(tweetId)
        if(user.bookmarks.includes(tweetId) ){
            // remove from bookmark.
            const updatedUser = await User.findByIdAndUpdate({_id : currentUserId},{$pull:{bookmarks : tweetId}},{new : true})
            // await Tweet.findByIdAndUpdate({_id : tweetId},{userDetails : updatedUser});
            return res.status(200).json({
                success : true,
                message : "Tweet Remove from bookmark successfully.",
                user : updatedUser
            })
        }else{
            // saved (bookmark the tweet)
            const updatedUser = await User.findByIdAndUpdate({_id : currentUserId},{$push : {bookmarks : tweetId}},{new : true})
            // await Tweet.findByIdAndUpdate({_id : tweetId},{userDetails : updatedUser});
            return res.status(200).json({
                success : true,
                message : "Tweet Saved successfully.",
                user : updatedUser
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while bookmark the tweet.",
            error : error.message
        })
    }
}

exports.getProfile = async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id).select('-password');
        return res.status(200).json({
            success : true,
            user : user
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while access the user profile.",
            error : error.message
        })
    }
}

exports.getAllOtherUsers = async(req,res)=>{
    try {
        const id = req.params.id;
        const allUsers = await User.find({_id : {$ne : id}}).select('-password')
        
        return res.status(200).json({
            success : true,
            users : allUsers
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while access other users.",
            error : error.message
        })
    }
}

exports.follow = async(req,res)=>{
    try {
        const currentUserId = req.body.id;
        const targetUserId = req.params.id;
        const currentUser = await User.findById({_id : currentUserId});
        const targetUser = await User.findById({_id : targetUserId});
        if(!currentUser.following.includes(targetUserId)){
            await currentUser.updateOne({$push : {following : targetUserId}});
            await targetUser.updateOne({$push : {followers : currentUserId}});
        }else{
            return res.status(400).json({
                success : false,
                message : `${currentUser.name} Already follow ${targetUser.name}`
            })
        }
        return res.status(200).json({
            success : true,
            message : `${currentUser.name} Just Follow to ${targetUser.name}`
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while follow user",
            error : error.message
        })
    }
}
exports.unFollow = async(req,res)=>{
    try {
        const currentUserId = req.body.id;
        const targetUserId = req.params.id;
        const currentUser = await User.findById({_id : currentUserId});
        const targetUser = await User.findById({_id : targetUserId});
        if(currentUser.following.includes(targetUserId)){
            await currentUser.updateOne({$pull : {following : targetUserId}});
            await targetUser.updateOne({$pull : {followers : currentUserId}});
        }else{
            return res.status(400).json({
                success : false,
                message : `${currentUser.name} dosen't follow ${targetUser.name}`
            })
        }
        return res.status(200).json({
            success : true,
            message : `${currentUser.name} Just Unfollow to ${targetUser.name}`
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while follow user",
            error : error.message
        })
    }
}