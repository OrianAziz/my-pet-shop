const Cart = require('../models/cartModel'); // Import your cart model
const Product = require('../models/productsModel'); // Make sure to import your Product model
const mongoose = require('mongoose');

// Add this function at the top of your file
function cleanCart(cart) {
  cart.items = cart.items.filter(item => item && item.product);
  return cart;
}

exports.getCartItems = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).select('+items');

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.json([]);
    }

    await cart.populate('items.product');

    const cartItems = cart.items.map(item => {
      if (!item || !item.product) {
        return null;
      }
      return {
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      };
    }).filter(item => item !== null);

    return res.json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Function to add items to the cart
exports.addItemToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const existingItemIndex = cart.items.findIndex(item => 
      item.product && item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({ 
        product: new mongoose.Types.ObjectId(productId),
        quantity: 1
      });
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * product.price);
    }, 0);

    cart.updatedAt = new Date();

    cart = cleanCart(cart);

    const savedCart = await cart.save();
    res.json({ message: 'Item added to cart', cart: savedCart });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
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
    res.status(500).json({ message: 'Server Error' });
  }
};
