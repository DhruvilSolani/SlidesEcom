import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartContextType, CartItem } from '../types';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      await api.post('/cart/add', { productId, quantity });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await api.put('/cart/update', { productId, quantity });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await api.delete('/cart/remove', { data: { productId } });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};