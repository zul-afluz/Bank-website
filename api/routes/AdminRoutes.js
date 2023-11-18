// adminRoute.js

const express = require('express');
const router = express.Router();
const { Auth, Admin} = require('../middleware/auth');
const { getPendingApprovalCustomers, approveCustomerAccount, getAllCustomers, createBillOption, getAllPayments, filterPaymentsByDate, checkPaymentStatus } = require('../controllers/AdminController');

// Admin routes
router.use(Auth, Admin);

// Get pending approval customer list
router.get('/pending-approval-customers', getPendingApprovalCustomers);

// Approve customer account
router.post('/approve-customer-account/:customerId', approveCustomerAccount);

// Get all customers
router.get('/all-customers', getAllCustomers);

// Create new bill option
router.post('/create-bill-option', createBillOption);

// Get all payments
router.get('/all-payments', getAllPayments);

// Filter payments by date
router.get('/filter-payments/:startDate/:endDate', filterPaymentsByDate);

// Check payment status from Stripe API
router.get('/check-payment-status/:transactionId', checkPaymentStatus);

module.exports = router;
