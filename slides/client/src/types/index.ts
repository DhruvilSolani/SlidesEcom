export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: 'slider' | 'slipper' | 'sandal';
  price: number;
  mrp: number;
  brand: string;
  stock: number;
  image: string;
}

export interface CartItem {
  _id: string;
  userId: string;
  productId: Product;
  quantity: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  fetchCart: () => Promise<void>;
  clearCart: () => void;
}