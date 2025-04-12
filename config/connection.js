const mongoose = require('mongoose');

const connectDb = async(req,res)=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/MiniProject');
        console.log('mongodb is connected');
    }catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:'server error'})
    }
}

module.exports = connectDb;