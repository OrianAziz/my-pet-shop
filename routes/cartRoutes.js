const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to render the cart page
router.get('/', (req, res) => {
  res.render('cart', { currentPage: 'cart' }); // Add this line
});

router.get('/get-cart-items', cartController.getCartItems);
router.post('/add', cartController.addItemToCart);

module.exports = router;
