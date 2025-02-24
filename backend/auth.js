const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Expiry time
    );
}

module.exports = { generateToken };
