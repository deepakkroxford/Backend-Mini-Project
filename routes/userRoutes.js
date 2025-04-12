const express = require('express');
const {userRegistration,userLogin,userlogOut,checkingUserLogin} = require('../controllers/user')
const router = express.Router();
const {isLoggedin} = require('../middleware/userAuth')

router.post('/register',userRegistration);
router.post('/login',userLogin);
router.get('/logout',userlogOut)
router.get('/profile',isLoggedin,checkingUserLogin);

module.exports = router;