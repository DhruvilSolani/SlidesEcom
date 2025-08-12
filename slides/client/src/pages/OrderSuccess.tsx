import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary-50 pt-20 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-secondary-600 mb-2">Thank you for your purchase.</p>
        <p className="text-sm text-secondary-500 mb-8">Order ID: {orderId}</p>
        
        <div className="space-y-4">
          <Button size="lg" className="w-full" onClick={() => navigate('/products')}>
            🛍️ Continue Shopping
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={() => navigate('/')}>
            🏠 Go to Home
          </Button>
        </div>
        
        <p className="text-xs text-secondary-400 mt-6">
          You will receive an email confirmation shortly.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;