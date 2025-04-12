const express = require('express');
const router = express.Router();
const {userPost,postLike,editPost, updatePost , deletePost} = require('../controllers/post');
const {isLoggedin} = require('../middleware/userAuth')

router.post('/createPost',isLoggedin,userPost);
router.get('/like/:id',isLoggedin,postLike);
router.get('/edit/:id',isLoggedin,editPost);
router.post('/update/:id',isLoggedin,updatePost);
router.get('/delete/:id',isLoggedin,deletePost)

module.exports = router;