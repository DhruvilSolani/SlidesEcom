import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '../../utils/animations';

const features = [
  {
    icon: '🏆',
    title: 'Premium Quality',
    description: 'Crafted with the finest materials for lasting comfort and durability'
  },
  {
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Enjoy free delivery on all orders above ₹999 across India'
  },
  {
    icon: '💯',
    title: '30-Day Returns',
    description: 'Not satisfied? Return within 30 days for a full refund'
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    description: 'Your transactions are protected with 256-bit SSL encryption'
  },
  {
    icon: '⭐',
    title: '10K+ Happy Customers',
    description: 'Join thousands of satisfied customers who love our products'
  },
  {
    icon: '🎯',
    title: 'Perfect Fit',
    description: 'Wide range of sizes to ensure the perfect fit for everyone'
  }
];

const FeaturesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4"
          >
            Why Choose SlideEase?
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-secondary-600 max-w-3xl mx-auto"
          >
            Experience the perfect blend of comfort, style, and quality with every step
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div
                className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;