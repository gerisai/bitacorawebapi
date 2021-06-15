const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Update
router.put('/', userController.updateUser);

//Delete
router.delete('/', userController.deleteUser);

module.exports = router;
