import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import api from '../utils/api';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products?limit=6');
        setFeaturedProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.05%27%3E%3Ccircle cx=%2730%27 cy=%2730%27 r=%272%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-accent-500">SlideEase</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Premium Sliders, Slippers & Sandals for Every Step of Your Journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={() => window.location.href = '/products'} className="animate-bounce-gentle">
                🛍️ Shop Now
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/products'} className="text-white border-white hover:bg-white hover:text-primary-600">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-secondary-600">Happy Customers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-secondary-600">Products</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-secondary-600">Support</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary-600 mb-2">Free</div>
              <div className="text-secondary-600">Shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">Discover our curated collection of premium footwear</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { category: 'slider', title: 'Sliders', desc: 'Comfortable and stylish sliders', emoji: '🩴' },
              { category: 'slipper', title: 'Slippers', desc: 'Cozy slippers for home comfort', emoji: '🥿' },
              { category: 'sandal', title: 'Sandals', desc: 'Trendy sandals for every occasion', emoji: '👡' }
            ].map((item, index) => (
              <Link key={item.category} to={`/products?category=${item.category}`} className="group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary-100">
                  <div className="text-6xl mb-4 group-hover:animate-bounce-gentle">{item.emoji}</div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                  <p className="text-secondary-600 mb-6">{item.desc}</p>
                  <Button variant="outline" size="sm">Explore {item.title}</Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">Featured Products</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">Handpicked favorites from our premium collection</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product._id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-xl text-primary-100 mb-8">Get exclusive deals and new arrivals delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none"
              />
              <Button variant="secondary" size="lg">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;