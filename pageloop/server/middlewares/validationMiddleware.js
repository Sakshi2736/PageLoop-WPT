const { body } = require('express-validator');

// User registration validation
exports.registerValidation = [
    body('name')
        .not().isEmpty().withMessage('Name is required')
        .trim(),

    body('email')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail()
        .trim(),

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .trim(),
];

// User login validation
exports.loginValidation = [
    body('email')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail()
        .trim(),

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .trim(),
];