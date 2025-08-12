const express = require('express');
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Checkout endpoint
router.post('/checkout', auth, async (req, res) => {
  try {
    const { userName, email, phone, address, city, state, postalCode, paymentMode } = req.body;
    
    // Get user's cart items
    const cartItems = await CartItem.find({ userId: req.user._id }).populate('productId');
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

    // Create order
    const order = new Order({
      userName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      paymentMode,
      cartItems: cartItems.map(item => ({
        productId: item.productId._id,
        name: item.productId.title,
        quantity: item.quantity,
        price: item.productId.price
      })),
      totalAmount
    });

    await order.save();

    // Clear user's cart
    await CartItem.deleteMany({ userId: req.user._id });

    res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (admin only)
router.get('/admin', auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;