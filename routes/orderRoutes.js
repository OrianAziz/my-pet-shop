const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const mockAuth = require('../middleware/mockAuth');

router.post('/create', mockAuth, orderController.createOrder);
router.delete('/:id', mockAuth, orderController.cancelOrder);

module.exports = router;
