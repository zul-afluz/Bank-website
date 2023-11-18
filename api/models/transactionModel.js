// transactionModel.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, "Customer field is required."]
    },
    amount: {
        type: Number,
        required: [true, 'Amount field is required']
    },
    type: {
        type: String,
        enum: ['Deposit', 'Withdrawal'],
        required: [true, 'Transaction type is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = { Transaction };
