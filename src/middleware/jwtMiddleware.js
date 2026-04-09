require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

// generate token
module.exports.generateToken = (payload) => {
    // expires in 5 minutes
    return jwt.sign(payload, secretKey, { expiresIn: '5m' });
};