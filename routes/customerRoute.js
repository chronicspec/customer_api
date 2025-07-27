const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


// Get data
router.get('/', customerController.getCustomers);
router.get('/search', customerController.getCustomerBy);

// Create new data
router.post('/', customerController.createCustomer);

// Update existing data
router.put('/:id', customerController.updateCustomer);

// Delete data
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;