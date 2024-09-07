const express = require('express');
const router = express.Router();
const { createUser, searchUser, insertPlan } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');
const { getPendingApprovals, approveInvestment } = require('../controllers/adminController');

// Admin creates a new user
router.post('/create-user', authenticateAdmin, createUser);

// Admin inserts plan for user
router.post('/insert-plan', authenticateAdmin, insertPlan);

// Admin searches user
router.get('/search-user', authenticateAdmin, searchUser);

// Admin retrieves all pending investments
router.get('/pending-approvals', authenticateAdmin, getPendingApprovals);

// Admin approves an investment
router.post('/approve-investment', authenticateAdmin, approveInvestment);

module.exports = router;
