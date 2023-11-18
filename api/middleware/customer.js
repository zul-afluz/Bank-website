// customer.js

const { User } = require("../models/UserModel");
const UserRole = require("../enums/UserRole");

const Customer = (req, res, next) => {
    let token = req.header('x-access-token') || req.header('authorization');

    if (token) {
        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length);
        }

        User.findByToken(token, (err, user) => {
            if (err) {
                throw err;
            }

            if (!user || user.role !== UserRole.CUSTOMER) {
                return res.status(403).json({
                    success: false,
                    message: "Customer users only have access to this route!"
                });
            }

            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Token is missing."
        });
    }
};

module.exports = { Customer };
