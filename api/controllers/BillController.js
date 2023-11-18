// billController.js

const { Bill } = require("../models/BillModel");
const stripe = require('your_stripe_secret_key'); // Replace 'your_stripe_secret_key' with your actual Stripe secret key

// Make a payment via Stripe
exports.makePayment = async (req, res) => {
    try {
        // Logic to make payment via Stripe
        // Assuming you have a Bill model with attributes like 'type' and 'amount'
        const { type, amount } = req.body;

        // Stripe payment processing logic
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe uses cents, so convert dollars to cents
            currency: 'usd',
        });

        // Save the payment details to the database
        const newTransaction = new Bill({
            type,
            amount,
            customerId: req.user._id,
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
        });

        await newTransaction.save();

        return res.status(200).json({
            success: true,
            message: "Payment successful.",
            data: newTransaction
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error making payment.",
            data: err
        });
    }
};

// View all transactions for the current customer
exports.viewTransactions = async (req, res) => {
    try {
        const allTransactions = await Bill.find({ customerId: req.user._id });

        return res.status(200).json({
            success: true,
            message: "List of all transactions.",
            data: allTransactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving transactions.",
            data: err
        });
    }
};

// Filter transactions by selected dates for the current customer
exports.filterTransactionsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        const filteredTransactions = await Bill.find({
            customerId: req.user._id,
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
        });

        return res.status(200).json({
            success: true,
            message: "Transactions filtered by date successfully.",
            data: filteredTransactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error filtering transactions by date.",
            data: err
        });
    }
};
