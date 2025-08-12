import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && user) {
      addToCart(product._id, quantity);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.title} className="w-full rounded-lg" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4 capitalize">{product.category} • {product.brand}</p>
          
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-lg text-gray-500 line-through ml-3">₹{product.mrp}</span>
            {discount > 0 && (
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded ml-3">
                {discount}% OFF
              </span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <span className="text-sm text-gray-600">Stock: {product.stock} available</span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-3 py-1 rounded-l"
                >
                  -
                </button>
                <span className="bg-gray-100 px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="bg-gray-200 px-3 py-1 rounded-r"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          )}
          
          {!user && (
            <p className="text-gray-600">Please login to add items to cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;