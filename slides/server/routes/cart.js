const express = require('express');
const CartItem = require('../models/CartItem');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user._id }).populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const existingItem = await CartItem.findOne({ userId: req.user._id, productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const cartItem = new CartItem({ userId: req.user._id, productId, quantity });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await CartItem.findOneAndUpdate(
      { userId: req.user._id, productId },
      { quantity },
      { new: true }
    );
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/remove', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const cartItem = await CartItem.findOneAndDelete({ userId: req.user._id, productId });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;