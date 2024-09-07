// 


const jwt = require('jsonwebtoken');

// Authenticate User
exports.authenticateUser = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

// Authenticate Admin
exports.authenticateAdmin = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};
