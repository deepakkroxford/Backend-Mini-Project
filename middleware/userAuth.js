const jwt = require('jsonwebtoken');

const isLoggedin = async (req, res, next) => {
    // Corrected to req.cookies (plural)
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).send('You are not logged in.');
    }
    try {
        const verifyUser = jwt.verify(token, process.env.SECREATE_KEY);
        req.user = verifyUser;
        next();
    } catch (error) {
        return res.status(401).send('Invalid or expired token.');
    }
};

module.exports = {
    isLoggedin
};