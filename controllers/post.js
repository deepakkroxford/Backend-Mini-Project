const userModel = require('../models/user');
const postModel = require('../models/post');
const { post } = require('../routes/userRoutes');

const userPost = async(req,res)=>{
    try{
        let userData = await userModel.findOne({email:req.user.email})
        const {content} = req.body;
        console.log(content);
        const postData = postModel.create({
            user:userData._id,
            content,
        });

        userData.post.push((await postData)._id);
        await userData.save();
        return res.redirect('/api/user/profile')
        //res.json({success:true,message:'post is created'});

    }catch(error) {
        console.log(error);
        res.json({success:false,message:'server error'})
    }
}

const postLike = async(req,res)=>{
    try{
        // Find the post by ID from the URL parameters
        const postData = await postModel.findOne({_id:req.params.id});
        
        // Check if the current user already liked this post
        if(postData.likes.includes(req.user.id)) {
        // Remove the user's ID from the likes array
        postData.likes = postData.likes.filter(like => like.toString() !== req.user.id.toString());
        } else {
            // Add the current user's ID to the post's likes array
            postData.likes.push(req.user.id);
        }
        
        // Save the updated post with new like
        await postData.save();
        
        // Redirect to profile page after successful like
        return res.redirect('/api/user/profile');

    }catch(error) {
        // Handle any errors that occur during the process
        console.log(error);
        // Redirect to profile even if error occurs
        return res.redirect('/api/user/profile');
    }
}

/*
this route help me to render the frontend of editpost and sending the data of current content of the post in the 
text area
*/
const editPost = async(req,res)=>{
    try{
        const postData = await postModel.findOne({_id:req.params.id});
        res.render('edit',{postData});
    } catch(error) {
        console.log(error);
        res.json({success:false,message:'issue while redering the edit js'})
    }
}

const updatePost = async(req,res)=>{
    try{
        const {newContent} = req.body; // this will give the new content that we have given in edit 
        const post = await postModel.findOne({_id:req.params.id},{content:newContent});
        res.redirect('/api/user/profile');
    } catch(error){
        console.log(error);

    }
}

const deletePost = async(req,res)=>{
    try{
        const postData = req.params.id;
        await postModel.findByIdAndDelete(postData);
        res.redirect('/api/user/profile');
    }catch(error){
        console.log(error);
        res.json({success:false,message:'server error'})
    }
    

    
}

module.exports ={
    userPost, postLike , editPost , updatePost , deletePost
}