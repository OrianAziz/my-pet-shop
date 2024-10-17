const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const createOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const order = new Order({
      userId: userId,
      items: orderItems,
      totalAmount: cart.totalPrice
    });

    const savedOrder = await order.save();

    // Clear the cart after creating the order
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [], totalPrice: 0 } });

    res.status(201).json({ 
      message: 'Order created successfully', 
      orderId: savedOrder._id 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, userId: userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error: error.message });
  }
};

module.exports = {
  createOrder,
  cancelOrder
};

console.log('Exports from orderController:', module.exports); // Updated debugging line


