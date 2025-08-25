const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.isAdmin) {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
