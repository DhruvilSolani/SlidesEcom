import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please login to view your cart</h1>
        <Link to="/login" className="bg-primary text-white px-6 py-2 rounded">Login</Link>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-secondary-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">🛒 Shopping Cart</h1>
          <p className="text-secondary-600">Review your items before checkout</p>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Your cart is empty</h2>
            <p className="text-secondary-600 mb-8">Discover our amazing collection of footwear</p>
            <Button size="lg" onClick={() => window.location.href = '/products'}>
              🛍️ Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={item._id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img 
                        src={item.productId.image} 
                        alt={item.productId.title}
                        className="w-24 h-24 object-cover rounded-xl shadow-md"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-1">{item.productId.title}</h3>
                      <p className="text-secondary-600 capitalize mb-2 font-medium">{item.productId.category} • {item.productId.brand}</p>
                      <p className="text-2xl font-bold text-primary-600">₹{item.productId.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center bg-secondary-50 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-bold text-secondary-700 hover:text-primary-600 disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="px-4 font-bold text-lg text-secondary-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        disabled={item.quantity >= item.productId.stock}
                        className="w-10 h-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-bold text-secondary-700 hover:text-primary-600 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.productId._id)}
                    >
                      🗑️ Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg h-fit animate-fade-in">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">📊 Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-secondary-600">Subtotal ({cartItems.length} items):</span>
                  <span className="font-semibold text-secondary-900">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-secondary-600">Shipping:</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <hr className="border-secondary-200" />
                <div className="flex justify-between text-2xl font-bold">
                  <span className="text-secondary-900">Total:</span>
                  <span className="text-primary-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <Button size="lg" className="w-full mb-4" onClick={() => window.location.href = '/checkout'}>
                🚚 Proceed to Checkout
              </Button>
              <p className="text-sm text-secondary-500 text-center">
                🔒 Secure checkout with 256-bit SSL encryption
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;