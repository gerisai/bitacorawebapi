const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Read (Edit) 
router.get('/:numEmpl', userController.readUser);

// Update
router.put('/:numEmpl', userController.updateUser);

//Delete
router.delete('/:numEmpl', userController.deleteUser);

module.exports = router;
