import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import api from '../utils/api';

const Checkout: React.FC = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMode: 'Cash on Delivery'
  });

  const total = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/orders/checkout', formData);
      if (response.data.success) {
        navigate(`/order-success/${response.data.orderId}`);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to checkout</h1>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">🛒 Checkout</h1>
          <p className="text-secondary-600">Complete your order</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">📋 Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Shipping Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Payment Mode *</label>
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none"
                >
                  <option value="Cash on Delivery">💵 Cash on Delivery</option>
                  <option value="UPI">📱 UPI</option>
                  <option value="Credit Card">💳 Credit Card</option>
                </select>
              </div>

              <Button type="submit" disabled={loading} size="lg" className="w-full mt-6">
                {loading ? 'Processing...' : `💳 Place Order - ₹${total.toLocaleString()}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">📦 Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center space-x-4">
                  <img src={item.productId.image} alt={item.productId.title} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900">{item.productId.title}</h3>
                    <p className="text-secondary-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-primary-600">₹{(item.productId.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <hr className="border-secondary-200 mb-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-secondary-600">Subtotal:</span>
                <span className="font-semibold">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary-600">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;