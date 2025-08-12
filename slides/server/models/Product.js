const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['slider', 'slipper', 'sandal'], required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);