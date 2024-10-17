const Order = require('../models/orderModel'); // Assuming you have an Order model

exports.getUserArea = async (req, res) => {
    try {
        // The user is available on req.user thanks to mockAuth middleware
        const user = req.user;

        if (!user) {
            return res.status(401).send('User not authenticated');
        }

        // Fetch orders for this user from the database
        const orders = await Order.find({ userId: user._id })
                                  .sort({ createdAt: -1 })
                                  .populate('items.product');

        // Format orders for display
        const formattedOrders = orders.map(order => ({
            id: order._id,
            date: order.createdAt.toLocaleDateString('he-IL'),
            status: order.status,
            total: order.totalAmount,
            items: order.items.map(item => ({
                name: item.product.name,
                quantity: item.quantity,
                price: item.price
            }))
        }));

        res.render('user', { 
            user: user, 
            orders: formattedOrders,
            currentPage: 'user'
        });
    } catch (error) {
        console.error('Error in getUserArea:', error);
        res.status(500).send('An error occurred while fetching user data');
    }
};
