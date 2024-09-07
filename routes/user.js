const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getUserInfo, queryPlan } = require('../controllers/userController');

const { submitInvestment, getPlans } = require('../controllers/userController');

const { authenticateUser } = require('../middleware/auth');

// User signup and login
router.post('/signup', signupUser);
router.post('/login', loginUser);

// User info and plans
router.get('/user-info', authenticateUser, getUserInfo);
router.post('/query-plan', authenticateUser, queryPlan);

// User submits an investment
router.post('/submit-investment', authenticateUser, submitInvestment);

// User gets all plans after successful login
router.get('/get-all-plans', authenticateUser, getPlans);

module.exports = router;
