// billRoute.js

const express = require('express');
const router = express.Router();
const { Auth, Customer } = require('../middlewares/auth');
const { makePayment, viewTransactions, filterTransactionsByDate } = require('../controllers/BillController');

// Customer routes
router.use(Auth, Customer);

// Make payment via Stripe
router.post('/make-payment', makePayment);

// View all transactions
router.get('/view-transactions', viewTransactions);

// Filter transactions by date
router.get('/filter-transactions/:startDate/:endDate', filterTransactionsByDate);

module.exports = router;
