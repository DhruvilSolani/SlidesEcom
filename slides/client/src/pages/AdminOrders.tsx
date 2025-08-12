import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

interface Order {
  _id: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  paymentMode: string;
  cartItems: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/admin');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-secondary-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">Access Denied</h1>
          <p className="text-secondary-600">Admin access required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">📦 Order Management</h1>
          <p className="text-secondary-600">Manage all customer orders</p>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-secondary-200 rounded-lg px-4 py-3 pl-10 focus:border-primary-500 focus:outline-none"
            />
            <span className="absolute left-3 top-3.5 text-secondary-400">🔍</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-secondary-600">Loading orders...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-secondary-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900">Order #{order._id.slice(-8)}</h3>
                      <p className="text-secondary-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">👤 Customer Information</h4>
                      <div className="space-y-1 text-sm text-secondary-600">
                        <p><strong>Name:</strong> {order.userName}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.postalCode}</p>
                        <p><strong>Payment:</strong> {order.paymentMode}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-2">🛍️ Items Ordered</h4>
                      <div className="space-y-2">
                        {order.cartItems.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-secondary-700">{item.name} x{item.quantity}</span>
                            <span className="font-semibold text-secondary-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <hr className="border-secondary-200" />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-primary-600">₹{order.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">📦</div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">No orders found</h2>
                <p className="text-secondary-600">
                  {searchTerm ? 'Try adjusting your search criteria' : 'No orders have been placed yet'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;