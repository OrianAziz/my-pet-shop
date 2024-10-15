const express = require('express');
const router = express.Router();

// Route to render the cart page
router.get('/', (req, res) => { // Now this works as '/cart/'
  res.render('cart'); // Renders the 'cart.ejs' view
});

module.exports = router;
