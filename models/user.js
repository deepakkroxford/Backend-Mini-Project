const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
    }, 
    age: {
        type: Number,
        required: true
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;
