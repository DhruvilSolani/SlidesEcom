import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">SlideEase</h3>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              Premium footwear for every step of your journey. Quality, comfort, and style combined.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                🐦
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-secondary-300 hover:text-primary-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=slider" className="text-secondary-300 hover:text-primary-400 transition-colors">Sliders</Link></li>
              <li><Link to="/products?category=slipper" className="text-secondary-300 hover:text-primary-400 transition-colors">Slippers</Link></li>
              <li><Link to="/products?category=sandal" className="text-secondary-300 hover:text-primary-400 transition-colors">Sandals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Returns</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-3">📧</span>
                <span className="text-secondary-300">support@slideease.com</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📞</span>
                <span className="text-secondary-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📍</span>
                <span className="text-secondary-300">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-secondary-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © 2024 SlideEase. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;