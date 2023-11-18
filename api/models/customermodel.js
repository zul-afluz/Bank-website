// customerModel.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User field is required."]
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = { Customer };
