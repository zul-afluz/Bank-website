// adminModel.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User field is required."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = { Admin };
