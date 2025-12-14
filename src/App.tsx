import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle, Download, Plus } from 'lucide-react';
import { supabase } from './supabaseClient';

const FixoraFileStore = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [subCategoryPage, setSubCategoryPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [randomProducts, setRandomProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        setProducts(data);
        console.log('Products loaded:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const ITEMS_PER_PAGE = 20;

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleWhatsAppQuery = (product) => {
    const message = `Hi, I want to customize this design: ${product.name}`;
    window.open(`https://wa.me/917091328594?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePayment = () => {
    alert('Razorpay payment gateway will be integrated here. After successful payment, download links will be provided.');
  };

  const handleDirectDownload = (product) => {
    alert(`Downloading ${product.name}...\n\nFile: ${product.fileType || 'Digital File'}\nSize: ${product.fileSize || 'N/A'}\n\nPayment gateway will be integrated for actual purchase.`);
  };

  const getPaginatedItems = (items, page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = (items) => {
    return Math.ceil(items.length / ITEMS_PER_PAGE);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const sortProducts = (productsToSort) => {
    const sorted = [...productsToSort];
    switch(sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-az':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };
  // Hardcoded categories (will be replaced with database later)
  const categoriesData = {
    'Business Cards': {
      subCategories: ['Corporate Business Cards', 'Freelancer Business Cards', 'Real Estate Agent Cards', 'Doctor/Medical Business Cards'],
      color: 'from-purple-400 to-purple-600',
      icon: '💼',
      colorTheme: 'purple'
    },
    'Banners & Posters': {
      subCategories: ['Event Banners', 'Sale/Discount Banners', 'Festival Banners', 'Birthday Party Posters'],
      color: 'from-pink-400 to-pink-600',
      icon: '📋',
      colorTheme: 'pink'
    },
    'Menu Cards': {
      subCategories: ['Restaurant Menu Cards', 'Cafe Menu Cards', 'Fast Food Menu Cards', 'Fine Dining Menu Cards'],
      color: 'from-blue-400 to-blue-600',
      icon: '🍽️',
      colorTheme: 'blue'
    }
  };

  const renderPagination = (currentPageNum, totalPages, setPageFunc) => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPageNum - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const handlePageChange = (page) => {
      setPageFunc(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div className="flex justify-center mt-8 space-x-2">
        {currentPageNum > 1 && (
          <button 
            onClick={() => handlePageChange(currentPageNum - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-all transform hover:scale-105"
          >
            Previous
          </button>
        )}
        
        {startPage > 1 && (
          <>
            <button 
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 py-2">...</span>}
          </>
        )}
        
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              page === currentPageNum 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 py-2">...</span>}
            <button 
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105"
            >
              {totalPages}
            </button>
          </>
        )}
        
        {currentPageNum < totalPages && (
          <button 
            onClick={() => handlePageChange(currentPageNum + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-all transform hover:scale-105"
          >
            Next
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { 
              setCurrentPage('home'); 
              setSelectedCategory(null); 
              setSelectedSubCategory(null); 
              setSelectedProduct(null);
            }}>
              <h1 className="text-2xl font-bold">Fixora File</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowCart(!showCart)}
                className="relative bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {showCart && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Cart</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-purple-600">₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <button 
                    onClick={handlePayment}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="w-full px-4 py-8">
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4">
              <div className="w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-semibold">Loading...</p>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Products from Database</h2>
          
          {products.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">No products found in database</p>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                  <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl">📦</span>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{product.subcategory}</p>
                    <p className="text-2xl font-bold text-purple-600 mb-3">₹{product.price}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleWhatsAppQuery(product)}
                        className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                      >
                        <MessageCircle size={20} className="mx-auto" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
                      >
                        <ShoppingCart size={20} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Fixora File. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FixoraFileStore;
