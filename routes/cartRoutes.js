const express = require('express');
const router = express.Router();

// Route to render the cart page
router.get('/', (req, res) => { // Now this works as '/cart/'
  res.render('cart'); // Renders the 'cart.ejs' view
});
router.get('/get-cart-items', (req, res) => {
    const items = cartController.getCartItems(req.session.cart); // Pass session cart to controller
    res.json(items); 
  });
module.exports = router;
