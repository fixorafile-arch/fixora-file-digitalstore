import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '',
    color: ''
  });

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category_id: '',
    subcategory: '',
    description: '',
    image_url: ''
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
    }
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (!error) setCategories(data);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();
      setProductForm({ ...productForm, image_url: data.secure_url });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Image upload failed!');
    }
    setUploadingImage(false);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('categories').insert([categoryForm]);

    if (error) {
      alert('Error adding category: ' + error.message);
    } else {
      alert('Category added successfully!');
      setCategoryForm({ name: '', icon: '', color: '' });
      fetchCategories();
    }
    setLoading(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('products').insert([{
      ...productForm,
      price: parseInt(productForm.price)
    }]);

    if (error) {
      alert('Error adding product: ' + error.message);
    } else {
      alert('Product added successfully!');
      setProductForm({
        name: '',
        price: '',
        category_id: '',
        subcategory: '',
        description: '',
        image_url: ''
      });
      fetchProducts();
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      alert('Category deleted!');
      fetchCategories();
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      alert('Product deleted!');
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 font-semibold ${
              activeTab === 'categories'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-600'
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold ${
              activeTab === 'products'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-600'
            }`}
          >
            Products ({products.length})
          </button>
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Category Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="💼"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Color (Tailwind class)</label>
                  <input
                    type="text"
                    value={categoryForm.color}
                    onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="from-purple-400 to-purple-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
                >
                  {loading ? 'Adding...' : 'Add Category'}
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">All Categories</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <p className="font-semibold">{cat.name}</p>
                        <p className="text-sm text-gray-500">{cat.color}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Product Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subcategory</label>
                  <input
                    type="text"
                    value={productForm.subcategory}
                    onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border rounded-lg"
                    accept="image/*"
                  />
                  {uploadingImage && <p className="text-sm text-gray-600 mt-2">Uploading image...</p>}
                  {productForm.image_url && (
                    <img src={productForm.image_url} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">All Products</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {products.map((prod) => (
                  <div key={prod.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {prod.image_url && (
                        <img src={prod.image_url} alt={prod.name} className="w-12 h-12 object-cover rounded" />
                      )}
                      <div>
                        <p className="font-semibold">{prod.name}</p>
                        <p className="text-sm text-gray-500">₹{prod.price} | {prod.subcategory}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
