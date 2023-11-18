// userModel.js

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserRole = require("../enums/UserRole");

var Schema = mongoose.Schema;

const SALT = 10;

var UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required."],
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, "Email field is required."],
        unique: [true, "Email is already exists on our database."]
    },
    username: {
        type: String,
        required: [true, "Username field is required."],
        unique: [true, "Username is already taken."]
    },
    password: {
        type: String,
        required: [true, "Password field is required."],
        minlength: 5
    },
    role: {
        type: String,
        enum: UserRole,
        default: UserRole.CUSTOMER
    },
    phoneNumber: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);

                user.password = hash;

                next();
            })
        })
    } else {
        next();
    }
});

UserSchema.methods.comparePassword = function (userPassword, callBack) {
    bcrypt.compare(userPassword, this.password, function(err, isMatch) {
        if(err) {
            return callBack(err);
        }

        callBack(null, isMatch);
    });
}

UserSchema.methods.generateToken = function(callBack) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    callBack(null, token);
}

UserSchema.statics.findByToken = function(token, callBack) {
    jwt.verify(token, process.env.SECRET, function(err, decode) {
        User.findById(decode).then((user) => {
            callBack(null, user);
        }).catch((err) => {
            callBack(null, err);
        });
    });
}

const User = mongoose.model("User", UserSchema);
module.exports = { User };
