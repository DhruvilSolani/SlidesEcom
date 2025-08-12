import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { user } = useAuth();
  
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const cartItem = cartItems.find(item => item.productId._id === product._id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (user) {
      addToCart(product._id);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-secondary-100">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </Link>
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-gentle">
            {discount}% OFF
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Only {product.stock} left!
          </div>
        )}
      </div>
      
      <div className="p-6">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-bold text-secondary-900 hover:text-primary-600 transition-colors mb-2 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-secondary-600 capitalize mb-3 font-medium">
          {product.category} • {product.brand}
        </p>
        
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-secondary-900">₹{product.price.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-secondary-500 line-through ml-3">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>
        
        {!user ? (
          <Button disabled variant="secondary" className="w-full">
            Login to Add
          </Button>
        ) : product.stock === 0 ? (
          <Button disabled variant="secondary" className="w-full">
            Out of Stock
          </Button>
        ) : cartQuantity > 0 ? (
          <div className="flex items-center justify-between bg-secondary-50 rounded-lg p-2">
            <button
              onClick={() => updateQuantity(product._id, cartQuantity - 1)}
              className="w-10 h-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-bold text-secondary-700 hover:text-primary-600"
            >
              −
            </button>
            <span className="font-bold text-lg text-secondary-900 px-4">{cartQuantity}</span>
            <button
              onClick={() => updateQuantity(product._id, cartQuantity + 1)}
              disabled={cartQuantity >= product.stock}
              className="w-10 h-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-bold text-secondary-700 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        ) : (
          <Button onClick={handleAddToCart} className="w-full">
            🛒 Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;