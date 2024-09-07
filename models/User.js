const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    planStartDate: Date,
    planEndDate: Date,
    amountInvested: Number,
    planInterestRate: Number,
    planDuration: Number,
    approved: { type: Boolean, default: false } // New field to check if admin approved
});

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    amount: { type: Number, default: 0 },
    planDetails: [planSchema]
});

module.exports = mongoose.model('User', userSchema);
