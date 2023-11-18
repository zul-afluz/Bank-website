// auth.js

const { User } = require("../models/UserModel");

const Auth = (req, res, next) => {
    let token = req.header('x-access-token') || req.header('authorization');

    if (token) {
        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length);
        }

        User.findByToken(token, (err, user) => {
            if (err) {
                throw err;
            }

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "No valid token is provided!"
                });
            }

            req.token = token;
            req.user = user;

            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Token is missing."
        });
    }
};

module.exports = { Auth };
