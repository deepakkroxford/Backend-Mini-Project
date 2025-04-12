const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
})


const postModel = mongoose.model('post',postSchema);
module.exports = postModel;