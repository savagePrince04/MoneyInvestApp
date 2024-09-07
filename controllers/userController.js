const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup user
exports.signupUser = async (req, res) => {
    const { userName, password, mobileNumber } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        userName,
        password,
        mobileNumber
    });

    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully!' });
};

// Login user
exports.loginUser = async (req, res) => {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
};

// Get user info
exports.getUserInfo = async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.status(200).json(user);
};

// Query plan (dummy endpoint)
exports.queryPlan = async (req, res) => {
    res.status(200).json({ message: 'Query received' });
};


// User submits investment
exports.submitInvestment = async (req, res) => {
    const { amount, planDetails } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Add the plan, but with `approved: false` since admin needs to approve
    user.planDetails.push({
        ...planDetails,
        amountInvested: amount,
        approved: false
    });

    await user.save();
    res.status(200).json({ message: 'Investment submitted for approval' });
};

// User gets all plans (approved and unapproved)
exports.getPlans = async (req, res) => {
    const user = await User.findById(req.user.userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.planDetails);
};