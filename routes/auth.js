const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Check
router.get('/user', authController.checkUser);

// Register
router.post('/register',authController.registerUser);

// Login
router.post('/login', authController.loginUser);

// Logout
router.get('/logout', authController.logoutUser);

module.exports = router;
