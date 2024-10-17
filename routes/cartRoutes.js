const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to render the cart page
router.get('/', (req, res) => { // Now this works as '/cart/'
  res.render('cart'); // Renders the 'cart.ejs' view
});

router.get('/get-cart-items', cartController.getCartItems);
router.post('/add', cartController.addItemToCart);

module.exports = router;
