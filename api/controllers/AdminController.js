// adminController.js

const { User } = require("../models/UserModel");
// const { Bill } = require("../models/BillModel");

// Get a list of Users pending approval
exports.getPendingApprovalUsers = async (req, res) => {
    try {
        const pendingUsers = await User.find({ isApproved: false });

        return res.status(200).json({
            success: true,
            message: "List of Users pending approval.",
            data: pendingUsers
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving pending Users.",
            data: err
        });
    }
};

// Approve a User account
exports.approveUserAccount = async (req, res) => {
    try {
        const User = await User.findById(req.params.UserId);

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Logic to approve a User account
        User.isApproved = true;
        await User.save();

        return res.status(200).json({
            success: true,
            message: "User account approved successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error approving User account.",
            data: err
        });
    }
};

// Get a list of all Users
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        return res.status(200).json({
            success: true,
            message: "List of all Users.",
            data: allUsers
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving all Users.",
            data: err
        });
    }
};

// Create a new bill option
exports.createBillOption = async (req, res) => {
    try {
        // Logic to create a new bill option
        // Assuming there is a Bill model with attributes like 'type' and 'serviceProviders'
        const { type, serviceProviders } = req.body;

        const newBillOption = new Bill({
            type,
            serviceProviders,
        });

        await newBillOption.save();

        return res.status(200).json({
            success: true,
            message: "New bill option created successfully.",
            data: newBillOption
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error creating a new bill option.",
            data: err
        });
    }
};

// Get a list of all payments
exports.getAllPayments = async (req, res) => {
    try {
        const allPayments = await Bill.find();

        return res.status(200).json({
            success: true,
            message: "List of all payments.",
            data: allPayments
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving all payments.",
            data: err
        });
    }
};

// Filter payments by selected dates
exports.filterPaymentsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        const filteredPayments = await Bill.find({
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }
        });

        return res.status(200).json({
            success: true,
            message: "Payments filtered by date successfully.",
            data: filteredPayments
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error filtering payments by date.",
            data: err
        });
    }
};

// Check payment status from Stripe API
exports.checkPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;

        // Logic to check payment status from Stripe API
        // Assuming you have a function to check payment status using Stripe SDK
        const paymentStatus = await stripe.checkPaymentStatus(paymentId);

        return res.status(200).json({
            success: true,
            message: "Payment status checked successfully.",
            data: { paymentId, paymentStatus }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error checking payment status.",
            data: err
        });
    }
};
