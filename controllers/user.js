const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegistration = async (req, res) => {
    try {
        const { userName, name, age, password, email } = req.body;
        const existedUser = await userModel.findOne({ email });
        if (!userName || !name || !age || !password || !email) {
            return res.status(400).json({ success: false, message: 'field is missing' });
        } else if (existedUser) {
            return res.status(400).json({ success: false, message: 'User is already existed' });
        } else {
            if (password.length < 8) {
                return res.status(400).json({ success: false, message: 'password is short' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = await userModel.create({
                userName, name, age, password: hashPassword, email
            })

            const token = jwt.sign({ id: newUser._id, email: email }, process.env.SECREATE_KEY)
            res.cookie('token', token, { httpOnly: true });
            console.log(token);

            res.status(201).json({ success: true, message: 'new user created', data: newUser, token });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'server error' })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkingUser = await userModel.findOne({ email });
        if (!checkingUser) {
            return res.status(400).json({ success: false, message: 'user doesnot exist' });
        }
        // during the decrptionofpassword we provide the user logedIn password and then the hashed password that is saved in the database in no readeable format
        const decryptPassword = await bcrypt.compare(password, checkingUser.password);
        if (!decryptPassword) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        const token = jwt.sign({ id: checkingUser._id, email: email }, process.env.SECREATE_KEY);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/api/user/profile')
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'server error' });
    }
}

const userlogOut = async (req, res) => {
    // when user click to logout the cookies that we set during the login it will remove and u get logout 
    //we can also write like res.cookie("token",""); empty string . after the logout user redirect to the registration page
    res.clearCookie("token");
    res.redirect('/');
};

const checkingUserLogin = async (req, res) => {
    console.log(req.user); // this wiil give all the data of the user that is loggin in succesfully. user is a field that we created
    // during the userAuth middleware.

    let userData = await userModel.findOne({email:req.user.email})
    /*
    why we need populate ?
    // We need populate because the 'post' field in userSchema is a reference to Post documents
    // Without populate, we only get the ObjectId references, not the actual post data
    // populate() fetches the complete post documents associated with the user
    // This allows us to access and display the post content in the profile view
    */
    await userData.populate("post");
    console.log(userData);
    res.render('profile',{userData})

}

module.exports = {
    userRegistration, userLogin, userlogOut, checkingUserLogin
}