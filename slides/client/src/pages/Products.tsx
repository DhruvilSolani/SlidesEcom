import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import api from '../utils/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await api.get(`/products?${params}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.append(k, v);
    });
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-secondary-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">🛍️ Our Products</h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">Discover our premium collection of footwear</p>
        </div>
        
        {/* Enhanced Filters */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 animate-slide-up">
          <h2 className="text-xl font-bold text-secondary-900 mb-6">🔍 Filter & Search</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors pl-10"
              />
              <span className="absolute left-3 top-3.5 text-secondary-400">🔍</span>
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
            >
              <option value="">All Categories</option>
              <option value="slider">🩴 Sliders</option>
              <option value="slipper">🥿 Slippers</option>
              <option value="sandal">👡 Sandals</option>
            </select>
            
            <input
              type="text"
              placeholder="Brand"
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
            />
            
            <input
              type="number"
              placeholder="Min Price (₹)"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
            />
            
            <input
              type="number"
              placeholder="Max Price (₹)"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-secondary-600 font-medium">Loading amazing products...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-secondary-600 font-medium">
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={product._id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
        
        {!loading && products.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">No products found</h2>
            <p className="text-secondary-600 mb-8">Try adjusting your search or filter criteria</p>
            <Button onClick={() => window.location.reload()}>Reset Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;