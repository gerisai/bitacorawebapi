const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');


// Create
router.post('/', logController.createLog);

// Update
router.put('/', logController.updateLog);

// Delete
router.delete('/', logController.deleteLog);

module.exports = router;