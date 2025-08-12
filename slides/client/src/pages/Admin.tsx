import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product, User } from '../types';
import api from '../utils/api';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    category: 'slider' as 'slider' | 'slipper' | 'sandal',
    price: '',
    mrp: '',
    brand: '',
    stock: '',
    image: ''
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchProducts();
      fetchUsers();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        price: Number(productForm.price),
        mrp: Number(productForm.mrp),
        stock: Number(productForm.stock)
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productData);
      } else {
        await api.post('/products', productData);
      }

      setProductForm({
        title: '',
        description: '',
        category: 'slider',
        price: '',
        mrp: '',
        brand: '',
        stock: '',
        image: ''
      });
      setShowAddProduct(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductForm({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      mrp: product.mrp.toString(),
      brand: product.brand,
      stock: product.stock.toString(),
      image: product.image
    });
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (user?.role !== 'admin') {
    return <div className="text-center py-8">Access denied. Admin only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Users
        </button>
        <button
          onClick={() => window.location.href = '/admin/orders'}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>

          {showAddProduct && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleProductSubmit} className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={productForm.title}
                  onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Brand"
                  value={productForm.brand}
                  onChange={(e) => setProductForm({...productForm, brand: e.target.value})}
                  className="border rounded px-3 py-2"
                  required
                />
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value as any})}
                  className="border rounded px-3 py-2"
                  required
                >
                  <option value="slider">Slider</option>
                  <option value="slipper">Slipper</option>
                  <option value="sandal">Sandal</option>
                </select>
                <input
                  type="number"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="MRP"
                  value={productForm.mrp}
                  onChange={(e) => setProductForm({...productForm, mrp: e.target.value})}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  className="border rounded px-3 py-2 md:col-span-2"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="border rounded px-3 py-2 md:col-span-2"
                  rows={3}
                  required
                />
                <div className="md:col-span-2 flex space-x-2">
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProduct(false);
                      setEditingProduct(null);
                      setProductForm({
                        title: '',
                        description: '',
                        category: 'slider',
                        price: '',
                        mrp: '',
                        brand: '',
                        stock: '',
                        image: ''
                      });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid gap-4">
            {products.map(product => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-gray-600 capitalize">{product.category} • {product.brand}</p>
                  <p className="text-sm">₹{product.price} • Stock: {product.stock}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Users</h2>
          <div className="grid gap-4">
            {users.map(u => (
              <div key={u.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{u.name}</h3>
                  <p className="text-gray-600">{u.email}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${u.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;