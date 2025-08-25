const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    try {
        // Check for validation errors from middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation error',
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const isAdmin = email === 'rohitingle34@gmail.com';

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id.toString(),
                name,
                email,
                isAdmin
            }
        });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        // Check for validation errors from middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation error',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate token
        const isAdmin = user.isAdmin;
        const token = jwt.sign(
            { id: user._id, isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin
            }
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};