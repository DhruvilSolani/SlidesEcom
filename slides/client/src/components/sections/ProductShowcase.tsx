import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { Product } from '../../types';
import api from '../../utils/api';

const ProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?limit=6');
        setProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-white">
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
            Featured Products
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-secondary-600 max-w-3xl mx-auto"
          >
            Handpicked favorites from our premium collection
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              variants={staggerItem}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-secondary-100"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Discount Badge */}
                {product.mrp > product.price && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </motion.div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-secondary-600 capitalize mb-4 font-medium">
                  {product.category} • {product.brand}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-secondary-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-sm text-secondary-500 line-through">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    onClick={() => window.location.href = `/products/${product._id}`}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary-900 hover:bg-secondary-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.href = '/products'}
          >
            View All Products →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;