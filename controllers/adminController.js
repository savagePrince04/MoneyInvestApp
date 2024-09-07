const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
    const { userName, password, mobileNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        userName,
        password: hashedPassword,
        mobileNumber
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
};

// Insert a plan for a user
exports.insertPlan = async (req, res) => {
    const { userName, planDetails } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.planDetails.push(planDetails);
    await user.save();

    res.status(200).json({ message: 'Plan inserted successfully!' });
};

// Search for a user
exports.searchUser = async (req, res) => {
    const { userName } = req.query;
    const user = await User.findOne({ userName });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
};

// Get all users with pending approvals
exports.getPendingApprovals = async (req, res) => {
    const users = await User.find({
        'planDetails.approved': false
    });

    const pendingApprovals = users.map(user => ({
        userName: user.userName,
        pendingPlans: user.planDetails.filter(plan => !plan.approved)
    }));

    res.status(200).json(pendingApprovals);
};

// Approve a user's investment
exports.approveInvestment = async (req, res) => {
    const { userName, planId } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const plan = user.planDetails.id(planId);
    if (!plan || plan.approved) {
        return res.status(400).json({ message: 'Invalid plan or already approved' });
    }

    plan.approved = true;
    await user.save();

    res.status(200).json({ message: 'Investment approved successfully' });
};
