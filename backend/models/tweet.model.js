const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    description : {
        type : String,
        required  :true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    like : {
        type : Array,
        derfault : []
    },
    userDetails : {
        type : Array,
        default : []
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Tweet',tweetSchema);