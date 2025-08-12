require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // Sliders
  {
    title: "Nike Comfort Slide",
    description: "Ultra-comfortable slides with cushioned footbed for all-day wear.",
    category: "slider",
    price: 2499,
    mrp: 2999,
    brand: "Nike",
    stock: 25,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"
  },
  {
    title: "Adidas Adilette Aqua",
    description: "Quick-dry slides perfect for pool and beach activities.",
    category: "slider",
    price: 1899,
    mrp: 2299,
    brand: "Adidas",
    stock: 30,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400"
  },
  {
    title: "Puma Popcat 20",
    description: "Lightweight slides with bold branding and comfort.",
    category: "slider",
    price: 1599,
    mrp: 1999,
    brand: "Puma",
    stock: 20,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
  },
  {
    title: "Reebok Classic Slide",
    description: "Retro-inspired slides with premium comfort technology.",
    category: "slider",
    price: 1799,
    mrp: 2199,
    brand: "Reebok",
    stock: 15,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400"
  },
  {
    title: "Under Armour Ignite VI",
    description: "Performance slides with superior grip and comfort.",
    category: "slider",
    price: 2199,
    mrp: 2699,
    brand: "Under Armour",
    stock: 18,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400"
  },
  {
    title: "New Balance 200",
    description: "Minimalist slides with excellent arch support.",
    category: "slider",
    price: 1999,
    mrp: 2399,
    brand: "New Balance",
    stock: 22,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400"
  },
  {
    title: "Fila Drifter",
    description: "Chunky retro slides with bold design elements.",
    category: "slider",
    price: 1699,
    mrp: 2099,
    brand: "Fila",
    stock: 12,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400"
  },

  // Slippers
  {
    title: "UGG Scuffette II",
    description: "Luxurious sheepskin slippers for ultimate comfort at home.",
    category: "slipper",
    price: 8999,
    mrp: 10999,
    brand: "UGG",
    stock: 8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
  },
  {
    title: "Crocs Classic Fuzzy",
    description: "Cozy lined slippers with iconic Crocs comfort.",
    category: "slipper",
    price: 3499,
    mrp: 3999,
    brand: "Crocs",
    stock: 35,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"
  },
  {
    title: "Havaianas Top",
    description: "Classic Brazilian slippers with rubber sole.",
    category: "slipper",
    price: 1299,
    mrp: 1599,
    brand: "Havaianas",
    stock: 40,
    image: "https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=400"
  },
  {
    title: "Birkenstock Boston",
    description: "Premium leather slippers with contoured footbed.",
    category: "slipper",
    price: 12999,
    mrp: 14999,
    brand: "Birkenstock",
    stock: 6,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
  },
  {
    title: "Sketchers Memory Foam",
    description: "Ultra-soft memory foam slippers for home comfort.",
    category: "slipper",
    price: 2799,
    mrp: 3299,
    brand: "Sketchers",
    stock: 28,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
  },
  {
    title: "Adidas Adilette Comfort",
    description: "Plush comfort slippers with cloud-like cushioning.",
    category: "slipper",
    price: 2299,
    mrp: 2799,
    brand: "Adidas",
    stock: 24,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400"
  },
  {
    title: "Nike Benassi Duo Ultra",
    description: "Double-strap slippers with premium comfort technology.",
    category: "slipper",
    price: 2999,
    mrp: 3499,
    brand: "Nike",
    stock: 16,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"
  },

  // Sandals
  {
    title: "Teva Universal Trail",
    description: "Adventure-ready sandals with superior grip and durability.",
    category: "sandal",
    price: 4999,
    mrp: 5999,
    brand: "Teva",
    stock: 14,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400"
  },
  {
    title: "Birkenstock Arizona",
    description: "Iconic two-strap sandals with cork footbed.",
    category: "sandal",
    price: 7999,
    mrp: 9499,
    brand: "Birkenstock",
    stock: 10,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400"
  },
  {
    title: "Chaco Z/1 Classic",
    description: "Single-strap adventure sandals with LUVSEAT footbed.",
    category: "sandal",
    price: 6499,
    mrp: 7999,
    brand: "Chaco",
    stock: 12,
    image: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=400"
  },
  {
    title: "Reef Fanning",
    description: "Beach sandals with built-in bottle opener.",
    category: "sandal",
    price: 3999,
    mrp: 4799,
    brand: "Reef",
    stock: 20,
    image: "https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=400"
  },
  {
    title: "Keen Newport H2",
    description: "Hybrid sandals perfect for water and land adventures.",
    category: "sandal",
    price: 8499,
    mrp: 9999,
    brand: "Keen",
    stock: 8,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
  },
  {
    title: "Merrell Kahuna Web",
    description: "Lightweight sandals with air cushion heel support.",
    category: "sandal",
    price: 5499,
    mrp: 6499,
    brand: "Merrell",
    stock: 15,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/slideease');
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Added 20 dummy products');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();