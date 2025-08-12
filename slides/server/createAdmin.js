require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/slideease');
    console.log('Connected to MongoDB');
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@slideease.com',
      password: 'admin123',
      role: 'admin'
    });
    
    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@slideease.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();