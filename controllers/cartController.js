const Cart = require('../models/cartModel'); // Import your cart model

exports.getCartItems = async (req, res) => {
  console.log('getCartItems called');
  try {
    if (!req || !req.user) {
      console.error('User not authenticated');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log('User authenticated, req.user:', req.user);

    const userId = req.user._id;
    console.log('Fetching cart for userId:', userId);

    const cart = await Cart.findOne({ userId }).select('+items');
    console.log('Cart found:', JSON.stringify(cart, null, 2));

    if (!cart || !cart.items || cart.items.length === 0) {
      console.log('No cart or empty cart found');
      return res.json([]);
    }

    await cart.populate('items.product');

    const cartItems = cart.items.map(item => {
      if (!item || !item.product) {
        console.error('Invalid item in cart:', item);
        return null;
      }
      return {
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      };
    }).filter(item => item !== null);

    console.log('Returning cart items:', cartItems);
    return res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Function to add items to the cart
exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items.push(productId);
    await cart.save();

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to remove items from the cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.toString() !== productId);
    await cart.save();

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
