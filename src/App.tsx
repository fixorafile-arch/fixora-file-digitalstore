import React, { useState } from 'react';
import { Search, ShoppingCart, Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle, Download, Plus } from 'lucide-react';

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

  const categories = {
    'Business Cards': {
      subCategories: ['Corporate Business Cards', 'Freelancer Business Cards', 'Real Estate Agent Cards', 'Doctor/Medical Business Cards', 'Lawyer/Advocate Cards', 'CA/Accountant Cards', 'Restaurant Owner Cards', 'Salon/Parlor Owner Cards', 'Gym/Fitness Trainer Cards', 'Photographer Business Cards', 'Event Planner Cards', 'Interior Designer Cards', 'Fashion Designer Cards', 'Teacher/Tutor Cards', 'Consultant Business Cards', 'Insurance Agent Cards', 'Travel Agent Cards', 'Tech/IT Professional Cards', 'Construction Business Cards', 'E-commerce Business Cards', 'Hotel/Hospitality Cards', 'Jewellery Shop Cards', 'Automobile Dealer Cards', 'Electronics Shop Cards', 'Real Estate Developer Cards'],
      color: 'from-purple-400 to-purple-600',
      icon: '💼',
      image: '/category-images/3.jpg',
      colorTheme: 'purple'
    },
    'Banners & Posters': {
      subCategories: ['Event Banners', 'Sale/Discount Banners', 'Festival Banners', 'Birthday Party Posters', 'Wedding Banners', 'Grand Opening Banners', 'Product Launch Posters', 'Movie Posters', 'Concert/Music Event Posters', 'Sports Event Banners', 'Education/Coaching Institute Banners', 'Real Estate Banners', 'Political Campaign Posters', 'Restaurant Promotional Banners', 'Gym/Fitness Posters', 'Medical/Healthcare Banners', 'Workshop/Seminar Posters', 'Job Fair Banners', 'Charity/NGO Posters', 'Motivational Posters', 'Trade Show Banners', 'Fashion Show Posters', 'Food Festival Banners', 'Technology Event Posters', 'Corporate Event Banners'],
      color: 'from-pink-400 to-pink-600',
      icon: '📋',
      image: '/category-images/2.jpg',
      colorTheme: 'pink'
    },
    'Menu Cards': {
      subCategories: ['Restaurant Menu Cards', 'Cafe Menu Cards', 'Fast Food Menu Cards', 'Fine Dining Menu Cards', 'Bakery Menu Cards', 'Ice Cream Parlor Menu Cards', 'Juice/Shake Bar Menu Cards', 'Pizza Menu Cards', 'Chinese Restaurant Menu Cards', 'South Indian Menu Cards', 'North Indian Menu Cards', 'Street Food Menu Cards', 'Cloud Kitchen Menu Cards', 'Hotel Room Service Menu Cards', 'Catering Service Menu Cards', 'Dessert Menu Cards', 'Bar/Pub Menu Cards', 'Breakfast Menu Cards', 'Buffet Menu Cards', 'Kids Special Menu Cards', 'Vegan Menu Cards', 'Continental Menu Cards', 'Seafood Menu Cards', 'BBQ/Grill Menu Cards', 'Healthy Food Menu Cards'],
      color: 'from-blue-400 to-blue-600',
      icon: '🍽️',
      colorTheme: 'blue'
    },
    'Bill Books & Invoices': {
      subCategories: ['Retail Shop Bill Books', 'Restaurant Bill Books', 'Medical Store Bill Books', 'Grocery Store Bill Books', 'Garment Shop Bill Books', 'Salon Bill Books', 'Gym Membership Invoices', 'Freelancer Invoices', 'Consulting Service Invoices', 'Repair Shop Bill Books', 'Automobile Service Invoices', 'Printing Press Bill Books', 'Coaching Institute Fee Receipts', 'Hotel Bill Books', 'Catering Service Invoices', 'Construction Work Invoices', 'Transport/Logistics Invoices', 'Event Management Invoices', 'Photography Service Invoices', 'E-commerce Tax Invoices', 'Wholesale Bill Books', 'Jewellery Shop Invoices', 'Electronics Store Bill Books', 'Furniture Shop Invoices', 'Hardware Store Bill Books'],
      color: 'from-green-400 to-green-600',
      icon: '🧾',
      colorTheme: 'green'
    },
    'Packaging Design': {
      subCategories: ['Food Product Packaging', 'Snacks Packaging', 'Beverage Bottle Labels', 'Cosmetics Packaging', 'Medicine/Pharma Packaging', 'Soap Packaging', 'Perfume Box Design', 'Chocolate Packaging', 'Tea/Coffee Packaging', 'Bakery Product Packaging', 'Gift Box Design', 'Jewelry Packaging', 'Clothing Packaging', 'Electronics Product Packaging', 'Toy Packaging', 'Organic Product Packaging', 'Spices Packaging', 'Oil/Ghee Packaging', 'Handicraft Packaging', 'Supplement/Protein Packaging', 'Dry Fruits Packaging', 'Herbal Product Packaging', 'Baby Product Packaging', 'Pet Food Packaging', 'Frozen Food Packaging'],
      color: 'from-orange-400 to-orange-600',
      icon: '📦',
      colorTheme: 'orange'
    },
    'Stickers & Labels': {
      subCategories: ['Product Label Stickers', 'Brand Logo Stickers', 'Bottle Labels', 'Jar Labels', 'Warning/Safety Stickers', 'Barcode Labels', 'Price Tag Stickers', 'Shipping Labels', 'Food Product Labels', 'Cosmetic Product Labels', 'Medicine Labels', 'Thank You Stickers', 'Promotional Stickers', 'Bumper Stickers', 'Laptop/Mobile Stickers', 'Envelope Seal Stickers', 'Ingredients Label Stickers', 'Expiry Date Labels', 'Handmade Product Labels', 'QR Code Stickers', 'Eco-Friendly Labels', 'Waterproof Labels', 'Custom Shape Stickers', 'Holographic Stickers', 'Security Seal Labels'],
      color: 'from-yellow-400 to-yellow-600',
      icon: '🏷️',
      colorTheme: 'yellow'
    },
    'Wedding Cards & Invitations': {
      subCategories: ['Hindu Wedding Cards', 'Muslim Wedding Cards', 'Christian Wedding Cards', 'Sikh Wedding Cards', 'Engagement Ceremony Cards', 'Haldi Ceremony Invitations', 'Mehendi Ceremony Invitations', 'Sangeet Ceremony Cards', 'Reception Invitations', 'Save The Date Cards', 'Digital Wedding Invitations', 'Video Wedding Invitations', 'Ring Ceremony Cards', 'Baraat Welcome Cards', 'Pre-Wedding Party Invitations', 'Destination Wedding Cards', 'Royal/Luxury Wedding Cards', 'Eco-Friendly Wedding Cards', 'Housewarming Cards', 'Anniversary Invitations', 'Beach Wedding Cards', 'Garden Wedding Cards', 'Palace Wedding Cards', 'Modern Minimalist Cards', 'Traditional Wedding Cards'],
      color: 'from-red-400 to-red-600',
      icon: '💒',
      colorTheme: 'red'
    },
    'YouTube Thumbnails & Channel Art': {
      subCategories: ['Gaming Channel Thumbnails', 'Tech Review Thumbnails', 'Vlog Thumbnails', 'Cooking Channel Thumbnails', 'Educational/Tutorial Thumbnails', 'Comedy/Entertainment Thumbnails', 'Music Channel Thumbnails', 'Fitness/Workout Thumbnails', 'Travel Vlog Thumbnails', 'Product Review Thumbnails', 'Motivational Video Thumbnails', 'News Channel Thumbnails', 'Podcast Thumbnails', 'Unboxing Video Thumbnails', 'Kids Channel Thumbnails', 'Fashion/Beauty Thumbnails', 'Business/Finance Thumbnails', 'Sports Channel Thumbnails', 'DIY/Craft Thumbnails', 'Movie/Web Series Review Thumbnails', 'Animation Channel Thumbnails', 'Live Stream Thumbnails', 'Reaction Video Thumbnails', 'Challenge Video Thumbnails', 'Shorts Thumbnails'],
      color: 'from-red-500 to-red-700',
      icon: '🎬',
      colorTheme: 'red'
    },
    'T-Shirt Design': {
      subCategories: ['Brand Logo T-shirts', 'Motivational Quote T-shirts', 'Sports Team T-shirts', 'Gym/Fitness T-shirts', 'Music Band T-shirts', 'Movie/Web Series T-shirts', 'Gaming T-shirts', 'College/School T-shirts', 'Corporate Event T-shirts', 'Festival T-shirts', 'Birthday T-shirts', 'Couple T-shirts', 'Family Matching T-shirts', 'Cartoon Character T-shirts', 'Political Campaign T-shirts', 'NGO/Charity T-shirts', 'Travel/Adventure T-shirts', 'Funny/Meme T-shirts', 'Religious T-shirts', 'Startup/Company T-shirts', 'Superhero T-shirts', 'Anime T-shirts', 'Vintage Design T-shirts', 'Abstract Art T-shirts', 'Typography T-shirts'],
      color: 'from-indigo-400 to-indigo-600',
      icon: '👕',
      colorTheme: 'indigo'
    },
    'Envelope Cover': {
      subCategories: ['Wedding Envelope Design', 'Money Envelope Design', 'Shagun Envelope Design', 'Birthday Gift Envelope Design', 'Festival Envelope Design', 'Business Envelope Design', 'Invitation Card Envelope Design', 'ATM Card Cover Design', 'PAN Card Cover Design', 'Aadhar Card Cover Design', 'Driving License Cover Design', 'Voter ID Card Cover Design', 'Credit/Debit Card Cover Design', 'Passport Cover Design', 'Checkbook Cover Design', 'Gift Voucher Envelope Design', 'Greeting Card Envelope Design', 'Cash Envelope Design', 'Document Envelope Design', 'Medical Card Cover Design', 'Student ID Card Cover', 'Employee ID Card Cover', 'Library Card Cover', 'Membership Card Cover', 'Loyalty Card Cover'],
      color: 'from-teal-400 to-teal-600',
      icon: '✉️',
      colorTheme: 'teal'
    },
    'CV Design': {
      subCategories: ['Fresher CV Design', 'Experienced Professional CV Design', 'Creative CV Design', 'Corporate CV Design', 'IT Professional CV Design', 'Medical Professional CV Design', 'Teacher CV Design', 'Engineer CV Design', 'Marketing Professional CV Design', 'Sales Executive CV Design', 'Graphic Designer CV Design', 'HR Professional CV Design', 'Accountant CV Design', 'Lawyer CV Design', 'Architect CV Design', 'Chef CV Design', 'Fashion Designer CV Design', 'Photographer CV Design', 'Content Writer CV Design', 'Student Internship CV Design', 'Manager CV Design', 'Executive CV Design', 'Minimalist CV Design', 'Modern CV Design', 'Professional CV Design'],
      color: 'from-cyan-400 to-cyan-600',
      icon: '📄',
      colorTheme: 'cyan'
    },
    'Bookmark Design': {
      subCategories: ['Student Bookmark Design', 'Library Bookmark Design', 'Religious Bookmark Design', 'Motivational Quote Bookmark Design', 'Book Store Bookmark Design', 'Kids Cartoon Bookmark Design', 'School Event Bookmark Design', 'Festival Bookmark Design', 'Educational Bookmark Design', 'Personalized Name Bookmark Design', 'Poetry Bookmark Design', 'Brand Promotional Bookmark Design', 'Bookshop Advertising Bookmark Design', 'Wedding Favor Bookmark Design', 'Birthday Gift Bookmark Design', 'Travel Theme Bookmark Design', 'Nature Theme Bookmark Design', 'Vintage Bookmark Design', 'Minimalist Bookmark Design', 'Custom Photo Bookmark Design', 'Literary Quote Bookmark Design', 'Bible Verse Bookmark Design', 'Animal Theme Bookmark Design', 'Floral Bookmark Design', 'Geometric Pattern Bookmark Design'],
      color: 'from-purple-500 to-purple-700',
      icon: '🔖',
      colorTheme: 'purple'
    }
  };

  const ITEMS_PER_PAGE = 20;

  const generateProducts = (subCategory) => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: `${subCategory}-${i + 1}`,
      name: `${subCategory} ${i + 1}`,
      price: Math.floor(Math.random() * 500) + 99,
      fileUrl: '/sample-file.zip',
      description: `Professional ${subCategory} design template perfect for your business needs. High-quality, ready-to-use design that can be easily customized to match your brand identity.`,
      fileType: ['AI', 'PSD', 'CDR'][Math.floor(Math.random() * 3)],
      fileSize: `${Math.floor(Math.random() * 50) + 5} MB`,
      resolution: ['300 DPI', '600 DPI', '1200 DPI'][Math.floor(Math.random() * 3)],
      colorMode: ['CMYK', 'RGB'][Math.floor(Math.random() * 2)],
      dimensions: ['3.5" x 2"', '4" x 6"', '5" x 7"', '8.5" x 11"', '11" x 17"'][Math.floor(Math.random() * 5)],
      layers: 'Fully Layered',
      fonts: 'Free Fonts Used',
      editable: 'Yes',
      printReady: 'Yes'
    }));
  };

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
    alert(`Downloading ${product.name}...\n\nFile: ${product.fileType}\nSize: ${product.fileSize}\n\nPayment gateway will be integrated for actual purchase.`);
  };

  const getPaginatedItems = (items, page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = (items) => {
    return Math.ceil(items.length / ITEMS_PER_PAGE);
  };

  const generateRandomProducts = () => {
    const allProducts = [];
    Object.entries(categories).forEach(([catName, catData]) => {
      catData.subCategories.forEach(subCat => {
        const products = generateProducts(subCat);
        products.forEach(product => {
          allProducts.push({
            ...product,
            category: catName,
            subCategory: subCat
          });
        });
      });
    });
    
    // Shuffle array
    const shuffled = allProducts.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 20);
  };

  const handleRandomClick = () => {
    setIsLoading(true);
    setCurrentPage('random');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedProduct(null);
    
    // Simulate loading delay
    setTimeout(() => {
      setRandomProducts(generateRandomProducts());
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const allProducts = [];
      Object.entries(categories).forEach(([catName, catData]) => {
        // Search in category names
        if (catName.toLowerCase().includes(searchQuery.toLowerCase())) {
          catData.subCategories.forEach(subCat => {
            const products = generateProducts(subCat);
            products.forEach(product => {
              allProducts.push({
                ...product,
                category: catName,
                subCategory: subCat
              });
            });
          });
        }
        
        // Search in sub-category names
        catData.subCategories.forEach(subCat => {
          if (subCat.toLowerCase().includes(searchQuery.toLowerCase())) {
            const products = generateProducts(subCat);
            products.forEach(product => {
              allProducts.push({
                ...product,
                category: catName,
                subCategory: subCat
              });
            });
          }
        });
      });
      
      // Remove duplicates
      const uniqueProducts = allProducts.filter((product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
      );
      
      setSearchResults(uniqueProducts);
      setCurrentPage('search');
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedProduct(null);
      setIsLoading(false);
    }, 500);
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

  const sortProducts = (products) => {
    const sorted = [...products];
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
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { 
              setCurrentPage('home'); 
              setSelectedCategory(null); 
              setSelectedSubCategory(null); 
              setSelectedProduct(null);
              setSubCategoryPage(1);
              setProductPage(1);
            }}>
              <div className="relative w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center transform hover:rotate-12 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg opacity-20"></div>
                <svg className="w-8 h-8 text-purple-600 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 12H5V8h14v10z"/>
                  <path d="M7 10h10v2H7zm0 3h10v2H7zm0 3h7v2H7z" opacity="0.7"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Fixora File</h1>
            </div>
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                  className="w-full px-4 py-2 pl-10 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 top-1.5 bg-purple-600 text-white px-4 py-1.5 rounded-full hover:bg-purple-700 transition-all font-medium text-sm"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRandomClick}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Random</span>
              </button>

              <button 
                onClick={() => setShowWishlist(!showWishlist)}
                className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => window.open('https://wa.me/917091328594', '_blank')}
                className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </button>


            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-white text-gray-800 shadow-sm">
          <div className="w-full px-4">
            <div className="flex space-x-1 overflow-x-auto py-2">
              <button
                onClick={() => { 
                  setCurrentPage('home'); 
                  setSelectedCategory(null); 
                  setSelectedSubCategory(null); 
                  setSelectedProduct(null);
                  setSubCategoryPage(1);
                  setProductPage(1);
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all transform hover:scale-105 border-2 ${currentPage === 'home' && !selectedCategory ? 'bg-purple-600 text-white border-purple-600' : 'border-purple-600 text-purple-600 hover:bg-purple-50'}`}
              >
                Home
              {Object.keys(categories).map((cat) => (
  <button
    key={cat}
    onClick={() => {
      setCurrentPage('category');
      setSelectedCategory(cat);
      setSelectedSubCategory(null);
      setSelectedProduct(null);
      setSubCategoryPage(1);
      setProductPage(1);
    }}
    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all transform hover:scale-105 border-2 ${selectedCategory === cat ? 'bg-purple-600 text-white border-purple-600' : 'border-purple-600'}`}
  >
    {categories[cat].image && <img src={categories[cat].image} alt={cat} style={{width: '20px', height: '20px', display: 'inline-block', marginRight: '5px'}} />}
    {cat}
  </button>
))}
            </div>
          </div>
        </nav>

        {currentPage === 'category' && selectedCategory && !selectedSubCategory && (
          <div className="bg-gray-100">
            <div className="w-full px-4 py-3">
              <div className="flex space-x-2 overflow-x-auto">
                {categories[selectedCategory].subCategories.map(subCat => (
                  <button
                    key={subCat}
                    onClick={() => {
                      setCurrentPage('subcategory');
                      setSelectedSubCategory(subCat);
                      setProductPage(1);
                    }}
                    className="px-4 py-1.5 rounded-full whitespace-nowrap text-sm border-2 border-purple-600 bg-white text-purple-600 hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105"
                  >
                    {subCat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Wishlist Sidebar */}
      {showWishlist && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Wishlist</span>
              </h2>
              <button onClick={() => setShowWishlist(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <p className="text-gray-500 text-lg">Your wishlist is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add products you love!</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {wishlist.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:shadow-lg transition-all">
                      <div className="flex items-center space-x-3">
                        <div className={`w-20 h-20 bg-gradient-to-br ${categories[item.category]?.color || 'from-gray-400 to-gray-600'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-2xl">{categories[item.category]?.icon || '📦'}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.subCategory}</p>
                          <p className="text-lg font-bold text-purple-600">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => {
                            handleWhatsAppQuery(item);
                          }}
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all text-sm font-semibold flex items-center justify-center space-x-2"
                        >
                          <MessageCircle size={18} />
                          <span>Order on WhatsApp</span>
                        </button>
                        <button 
                          onClick={() => toggleWishlist(item)}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-all"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
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
                        className="text-red-500 hover:text-red-700 transition-all transform hover:scale-110"
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
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full px-4 py-8">
        {/* Loading Indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 shadow-2xl">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-xl font-semibold text-gray-800">Loading...</p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          </div>
        )}

        {currentPage !== 'home' && (
          <div className="mb-8">
            {/* Breadcrumbs */}
            <div className="mb-4 flex items-center space-x-2 text-sm">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedCategory(null);
                  setSelectedSubCategory(null);
                  setSelectedProduct(null);
                }}
                className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
              >
                Home
              </button>
              
              {selectedCategory && (
                <>
                  <span className="text-gray-400">/</span>
                  <button
                    onClick={() => {
                      setCurrentPage('category');
                      setSelectedSubCategory(null);
                      setSelectedProduct(null);
                    }}
                    className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                  >
                    {selectedCategory}
                  </button>
                </>
              )}
              
              {selectedSubCategory && (
                <>
                  <span className="text-gray-400">/</span>
                  <button
                    onClick={() => {
                      setCurrentPage('subcategory');
                      setSelectedProduct(null);
                    }}
                    className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                  >
                    {selectedSubCategory}
                  </button>
                </>
              )}
              
              {selectedProduct && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600 font-medium">
                    {selectedProduct.name}
                  </span>
                </>
              )}
              
              {currentPage === 'random' && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600 font-medium">Random Products</span>
                </>
              )}
              
              {currentPage === 'search' && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-600 font-medium">Search Results</span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  if (currentPage === 'product') {
                    setCurrentPage('subcategory');
                    setSelectedProduct(null);
                  } else if (currentPage === 'subcategory') {
                    setCurrentPage('category');
                    setSelectedSubCategory(null);
                    setProductPage(1);
                  } else if (currentPage === 'category') {
                    setCurrentPage('home');
                    setSelectedCategory(null);
                    setSubCategoryPage(1);
                  } else if (currentPage === 'random') {
                    setCurrentPage('home');
                    setRandomProducts([]);
                  } else if (currentPage === 'search') {
                    setCurrentPage('home');
                    setSearchResults([]);
                    setSearchQuery('');
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-3 transition-all transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
              
              <div className="w-32"></div>
            </div>
            
            <div className="border-4 border-purple-600 bg-white px-8 py-4 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                {currentPage === 'product' && selectedSubCategory}
                {currentPage === 'subcategory' && selectedSubCategory}
                {currentPage === 'category' && selectedCategory}
                {currentPage === 'random' && 'Random Products'}
                {currentPage === 'search' && `Search Results for "${searchQuery}"`}
              </h2>
            </div>

            {/* Sort & Filter Section */}
            {(currentPage === 'subcategory' || currentPage === 'random' || currentPage === 'search') && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between bg-white rounded-xl shadow-md px-6 py-4 max-w-4xl mx-auto border-2 border-purple-200">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-semibold">Sort By:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border-2 border-purple-600 rounded-lg bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
                    >
                      <option value="default">Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-az">Name: A to Z</option>
                      <option value="name-za">Name: Z to A</option>
                    </select>
                  </div>
                  
                  <div className="text-gray-600 font-medium">
                    {currentPage === 'subcategory' && `${generateProducts(selectedSubCategory).length} Products`}
                    {currentPage === 'random' && `${randomProducts.length} Products`}
                    {currentPage === 'search' && `${searchResults.length} Results`}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Home Page */}
        {currentPage === 'home' && !selectedCategory && (
          <>
            <div className="text-center mb-12 max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-3">Premium Graphic Templates for Your Business</h2>
              <p className="text-gray-600 text-lg">Professional designs at affordable prices</p>
            </div>
            
            <div className="max-w-7xl mx-auto mb-12">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ height: '280px' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 animate-gradient"></div>
                <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-32 translate-y-32 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-300 opacity-10 rounded-full animate-bounce-slow"></div>
                <div className="absolute top-10 right-20 w-20 h-20 border-4 border-white opacity-20 rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-10 left-20 w-16 h-16 border-4 border-white opacity-20 rounded-full animate-ping-slow"></div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white opacity-10 transform rotate-12"></div>
                
                <div className="relative h-full flex flex-col items-center justify-center px-8 z-10">
                  <div className="absolute top-8 left-8">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                  
                  <div className="mb-6 transform hover:rotate-12 transition-transform duration-300">
                    <svg className="w-20 h-20 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.71 4.63l-1.34-1.34c-0.39-0.39-1.02-0.39-1.41 0L9 12.25 11.75 15l8.96-8.96c0.39-0.39 0.39-1.02 0-1.41zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 0.92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z"/>
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-5xl font-black text-white mb-3 tracking-tight drop-shadow-lg">
                      Creativity begins where
                    </h3>
                    <h3 className="text-5xl font-black text-yellow-300 tracking-tight drop-shadow-lg">
                      rules end
                    </h3>
                  </div>
                  
                  <div className="mt-6 flex items-center space-x-3">
                    <div className="w-16 h-1 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                    <div className="w-16 h-1 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="absolute bottom-8 right-8">
                    <div className="flex space-x-2">
                      <span className="text-3xl animate-pulse">✨</span>
                      <span className="text-2xl animate-pulse delay-300">🎨</span>
                      <span className="text-3xl animate-pulse delay-500">✨</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <style>{`
              @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              
              .animate-gradient {
                background-size: 200% 200%;
                animation: gradient 8s ease infinite;
              }
              
              .animate-bounce-slow {
                animation: bounce 3s infinite;
              }
              
              .animate-spin-slow {
                animation: spin 8s linear infinite;
              }
              
              .animate-ping-slow {
                animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
              }
              
              .delay-100 {
                animation-delay: 0.1s;
              }
              
              .delay-200 {
                animation-delay: 0.2s;
              }
              
              .delay-300 {
                animation-delay: 0.3s;
              }
              
              .delay-500 {
                animation-delay: 0.5s;
              }
              
              .delay-1000 {
                animation-delay: 1s;
              }
            `}</style>
            
            <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
              {Object.entries(categories).map(([catName, catData]) => {
                const getCategoryDesign = (name) => {
                  switch(name) {
                    case 'Business Cards':
                      return (
  <div className="w-full h-full flex items-center justify-center p-2">
    <img 
      src="/3.jpg"
      alt="Business Card" 
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
);
                    
                    case 'Banners & Posters':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3 transform hover:scale-105 transition-all">
                            <div className="bg-pink-500 rounded-lg p-3 mb-2">
                              <div className="text-white font-bold text-center text-xl">SALE</div>
                            </div>
                            <div className="bg-pink-100 rounded-lg h-16 mb-2"></div>
                            <div className="bg-pink-500 rounded-lg p-2">
                              <div className="text-white text-center font-bold">50% OFF</div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Menu Cards':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-white rounded-lg shadow-xl p-4 transform hover:scale-105 transition-all">
                            <div className="bg-blue-500 rounded-lg p-2 mb-3 text-white text-center font-bold">MENU</div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="h-2 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-2 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-2 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-2 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-2 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-2 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bill Books & Invoices':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-white rounded-lg shadow-xl p-4 transform hover:scale-105 transition-all">
                            <div className="bg-green-500 rounded-lg p-2 mb-3 text-white text-center font-bold text-sm">INVOICE</div>
                            <div className="space-y-2 mb-3">
                              <div className="h-1.5 bg-green-300 rounded w-1/2"></div>
                              <div className="h-1.5 bg-green-300 rounded w-2/3"></div>
                            </div>
                            <div className="space-y-1.5 mb-3">
                              <div className="flex justify-between">
                                <div className="h-1.5 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1.5 bg-green-200 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between">
                                <div className="h-1.5 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1.5 bg-green-200 rounded w-1/4"></div>
                              </div>
                            </div>
                            <div className="bg-green-500 rounded p-1.5 text-white text-center text-xs font-bold">TOTAL</div>
                          </div>
                        </div>
                      );
                    
                    case 'Packaging Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-6">
                          <div className="relative w-32 h-32 transform hover:rotate-12 transition-all duration-300">
                            <div className="absolute inset-0 bg-white rounded-lg shadow-2xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
                                <div className="text-white font-bold text-xs">LOGO</div>
                              </div>
                            </div>
                            <div className="absolute top-0 left-1/2 w-px h-full bg-orange-600 opacity-50"></div>
                            <div className="absolute top-1/2 left-0 w-full h-px bg-orange-600 opacity-50"></div>
                          </div>
                        </div>
                      );
                    
                    case 'Stickers & Labels':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-6">
                          <div className="relative w-32 h-32 transform hover:scale-110 transition-all">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
                            <div className="absolute inset-2 bg-white rounded-full"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="text-yellow-600 font-bold text-sm">PREMIUM</div>
                              <div className="text-yellow-600 font-bold text-xs">QUALITY</div>
                            </div>
                            <svg className="absolute bottom-4 left-1/2 transform -translate-x-1/2" width="60" height="10" viewBox="0 0 60 10">
                              <path d="M0,5 Q15,0 30,5 T60,5" stroke="#fbbf24" strokeWidth="2" fill="none"/>
                            </svg>
                          </div>
                        </div>
                      );
                    
                    case 'Wedding Cards & Invitations':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-pink-50 rounded-lg shadow-xl p-4 border-2 border-pink-200 transform hover:scale-105 transition-all">
                            <div className="flex justify-center mb-2">
                              <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-2 bg-pink-400 rounded w-full"></div>
                              <div className="h-1.5 bg-pink-300 rounded w-3/4 mx-auto"></div>
                              <div className="h-1.5 bg-pink-300 rounded w-2/3 mx-auto"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'YouTube Thumbnails & Channel Art':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-red-600 rounded-lg shadow-xl p-4 transform hover:scale-105 transition-all">
                            <div className="flex items-center justify-center h-full">
                              <div className="relative">
                                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <div className="h-1.5 bg-white rounded w-1/3"></div>
                              <div className="h-1.5 bg-white rounded w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'T-Shirt Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-32 h-36 transform hover:scale-105 transition-all">
                            <svg viewBox="0 0 100 120" className="w-full h-full">
                              <path d="M30,15 L30,30 L20,35 L20,110 L80,110 L80,35 L70,30 L70,15 L60,20 L50,12 L40,20 Z" 
                                    fill="#6366f1" stroke="#4f46e5" strokeWidth="1"/>
                              <circle cx="50" cy="45" r="12" fill="white" opacity="0.3"/>
                              <rect x="35" y="65" width="30" height="4" rx="2" fill="white"/>
                              <rect x="30" y="75" width="40" height="4" rx="2" fill="white"/>
                            </svg>
                          </div>
                        </div>
                      );
                    
                    case 'Envelope Cover':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-full max-w-[140px]">
                            <div className="bg-teal-400 rounded-lg shadow-xl p-4 pt-8 transform hover:scale-105 transition-all">
                              <div className="absolute top-0 left-0 right-0 h-12 bg-teal-500 rounded-t-lg" style={{clipPath: 'polygon(0 0, 50% 60%, 100% 0)'}}></div>
                              <div className="absolute top-3 right-3 w-8 h-8 bg-yellow-400 rounded transform rotate-12">
                                <div className="absolute inset-1 border-2 border-yellow-600 rounded"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'CV Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3 transform hover:scale-105 transition-all">
                            <div className="bg-cyan-500 rounded-lg p-2 mb-2 flex items-center space-x-2">
                              <div className="w-8 h-8 bg-white rounded-full"></div>
                              <div className="flex-1">
                                <div className="h-1.5 bg-white rounded w-3/4 mb-1"></div>
                                <div className="h-1 bg-cyan-200 rounded w-1/2"></div>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-1.5 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1.5 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1.5 bg-cyan-200 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bookmark Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-6">
                          <div className="relative w-16 h-40 transform hover:scale-110 transition-all">
                            <div className="absolute inset-0 bg-purple-600 rounded-t-lg shadow-xl"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-8" style={{clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 0, 0 0)'}}>
                              <div className="w-full h-full bg-purple-600"></div>
                            </div>
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full opacity-30"></div>
                            <div className="absolute top-16 left-2 right-2 space-y-1.5">
                              <div className="h-1 bg-white rounded opacity-50"></div>
                              <div className="h-1 bg-white rounded opacity-50"></div>
                              <div className="h-1 bg-white rounded opacity-50"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    default:
                      return <span className="text-7xl">{catData.icon}</span>;
                  }
                };

                return (
                  <div
                    key={catName}
                    onClick={() => { 
                      setCurrentPage('category'); 
                      setSelectedCategory(catName); 
                      setSubCategoryPage(1);
                    }}
                    className="cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div 
                      className={`aspect-square bg-gradient-to-br ${catData.color} flex items-center justify-center`}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      {getCategoryDesign(catName)}
                    </div>
                    <div className="p-6 text-center bg-white">
                      <h3 className="text-xl font-bold text-gray-800">{catName}</h3>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-20 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-12 max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">About Fixora File</h3>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                  Fixora File is your one-stop destination for premium graphic design templates. We provide high-quality, 
                  professional designs for businesses of all sizes. From business cards to wedding invitations, 
                  from menu cards to YouTube thumbnails - we have everything you need to make your brand stand out. 
                  All our designs are fully editable, print-ready, and available at affordable prices.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h4>
                <div className="flex justify-center space-x-6">
                  <div className="cursor-pointer" onClick={() => window.open('https://wa.me/917091328594', '_blank')}>
                    <div className="bg-green-500 text-white p-4 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg">
                      <MessageCircle size={32} />
                    </div>
                    <p className="mt-2 text-gray-700 font-medium">WhatsApp</p>
                  </div>

                  <div className="cursor-pointer" onClick={() => window.open('https://www.instagram.com/fixorafile/', '_blank')}>
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-4 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg">
                      <Instagram size={32} />
                    </div>
                    <p className="mt-2 text-gray-700 font-medium">Instagram</p>
                  </div>

                  <div className="cursor-pointer" onClick={() => window.open('https://www.facebook.com/altafallrounder', '_blank')}>
                    <div className="bg-blue-600 text-white p-4 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg">
                      <Facebook size={32} />
                    </div>
                    <p className="mt-2 text-gray-700 font-medium">Facebook</p>
                  </div>

                  <div className="cursor-pointer" onClick={() => window.open('https://in.pinterest.com/Altafallrounder/', '_blank')}>
                    <div className="bg-red-600 text-white p-4 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <p className="mt-2 text-gray-700 font-medium">Pinterest</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Category Page */}
        {currentPage === 'category' && selectedCategory && !selectedSubCategory && (
          <>
            <div className="grid grid-cols-5 gap-6">
              {getPaginatedItems(categories[selectedCategory].subCategories, subCategoryPage).map((subCat) => {
                const getCategoryDesign = (catName) => {
                  switch(catName) {
                    case 'Business Cards':
                     return (
                       
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="w-full bg-white rounded-lg shadow-xl p-3">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="h-1.5 bg-purple-600 rounded w-3/4 mb-1"></div>
          <div className="h-1.5 bg-purple-400 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-1 bg-purple-300 rounded w-2/3"></div>
        <div className="h-1 bg-purple-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);
                    
                    case 'Banners & Posters':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-2 transform hover:scale-105 transition-all">
                            <div className="bg-pink-500 rounded-lg p-2 mb-1.5">
                              <div className="text-white font-bold text-center text-sm">SALE</div>
                            </div>
                            <div className="bg-pink-100 rounded-lg h-12 mb-1.5"></div>
                            <div className="bg-pink-500 rounded-lg p-1.5">
                              <div className="text-white text-center font-bold text-xs">50% OFF</div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Menu Cards':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3 transform hover:scale-105 transition-all">
                            <div className="bg-blue-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">MENU</div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bill Books & Invoices':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3 transform hover:scale-105 transition-all">
                            <div className="bg-green-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">INVOICE</div>
                            <div className="space-y-1.5 mb-2">
                              <div className="h-1 bg-green-300 rounded w-1/2"></div>
                              <div className="h-1 bg-green-300 rounded w-2/3"></div>
                            </div>
                            <div className="space-y-1 mb-2">
                              <div className="flex justify-between">
                                <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1 bg-green-200 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between">
                                <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1 bg-green-200 rounded w-1/4"></div>
                              </div>
                            </div>
                            <div className="bg-green-500 rounded p-1 text-white text-center text-xs font-bold">TOTAL</div>
                          </div>
                        </div>
                      );
                    
                    case 'Packaging Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-24 h-24 transform hover:rotate-12 transition-all duration-300">
                            <div className="absolute inset-0 bg-white rounded-lg shadow-2xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                                <div className="text-white font-bold text-xs">LOGO</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Stickers & Labels':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-24 h-24 transform hover:scale-110 transition-all">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
                            <div className="absolute inset-2 bg-white rounded-full"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="text-yellow-600 font-bold text-xs">PREMIUM</div>
                              <div className="text-yellow-600 font-bold text-xs">QUALITY</div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Wedding Cards & Invitations':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-pink-50 rounded-lg shadow-xl p-3 border-2 border-pink-200 transform hover:scale-105 transition-all">
                            <div className="flex justify-center mb-1.5">
                              <svg className="w-10 h-10 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1.5 bg-pink-400 rounded w-full"></div>
                              <div className="h-1 bg-pink-300 rounded w-3/4 mx-auto"></div>
                              <div className="h-1 bg-pink-300 rounded w-2/3 mx-auto"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'YouTube Thumbnails & Channel Art':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-red-600 rounded-lg shadow-xl p-3 transform hover:scale-105 transition-all">
                            <div className="flex items-center justify-center h-full">
                              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/>
                              </svg>
                            </div>
                            <div className="flex justify-between mt-1.5">
                              <div className="h-1 bg-white rounded w-1/3"></div>
                              <div className="h-1 bg-white rounded w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'T-Shirt Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="relative w-24 h-28 transform hover:scale-105 transition-all">
                            <svg viewBox="0 0 100 120" className="w-full h-full">
                              <path d="M30,15 L30,30 L20,35 L20,110 L80,110 L80,35 L70,30 L70,15 L60,20 L50,12 L40,20 Z" 
                                    fill="#6366f1" stroke="#4f46e5" strokeWidth="1"/>
                              <circle cx="50" cy="45" r="10" fill="white" opacity="0.3"/>
                              <rect x="35" y="60" width="30" height="3" rx="1.5" fill="white"/>
                              <rect x="30" y="68" width="40" height="3" rx="1.5" fill="white"/>
                            </svg>
                          </div>
                        </div>
                      );
                    
                    case 'Envelope Cover':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="relative w-full max-w-[100px]">
                            <div className="bg-teal-400 rounded-lg shadow-xl p-3 pt-6 transform hover:scale-105 transition-all">
                              <div className="absolute top-0 left-0 right-0 h-8 bg-teal-500 rounded-t-lg" style={{clipPath: 'polygon(0 0, 50% 60%, 100% 0)'}}></div>
                              <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded transform rotate-12">
                                <div className="absolute inset-1 border border-yellow-600 rounded"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'CV Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-2.5 transform hover:scale-105 transition-all">
                            <div className="bg-cyan-500 rounded-lg p-1.5 mb-1.5 flex items-center space-x-1.5">
                              <div className="w-6 h-6 bg-white rounded-full"></div>
                              <div className="flex-1">
                                <div className="h-1 bg-white rounded w-3/4 mb-1"></div>
                                <div className="h-1 bg-cyan-200 rounded w-1/2"></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1 bg-cyan-200 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bookmark Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-12 h-32 transform hover:scale-110 transition-all">
                            <div className="absolute inset-0 bg-purple-600 rounded-t-lg shadow-xl"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-6" style={{clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 0, 0 0)'}}>
                              <div className="w-full h-full bg-purple-600"></div>
                            </div>
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full opacity-30"></div>
                            <div className="absolute top-12 left-1 right-1 space-y-1">
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    default:
                      return <span className="text-6xl">{categories[selectedCategory].icon}</span>;
                  }
                };

                return (
                  <div
                    key={subCat}
                    onClick={() => { 
                      setCurrentPage('subcategory'); 
                      setSelectedSubCategory(subCat); 
                      setProductPage(1);
                    }}
                    className="cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div 
                      className={`aspect-square bg-gradient-to-br ${categories[selectedCategory].color} flex items-center justify-center`}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      {getCategoryDesign(selectedCategory)}
                    </div>
                    <div className="p-4 text-center bg-white">
                      <h3 className="font-semibold text-gray-800">{subCat}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="max-w-7xl mx-auto">
              {renderPagination(
                subCategoryPage, 
                getTotalPages(categories[selectedCategory].subCategories), 
                setSubCategoryPage
              )}
            </div>
          </>
        )}

        {/* Search Results Page */}
        {currentPage === 'search' && (
          <>
            {searchResults.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-32 h-32 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-3xl font-bold text-gray-600 mb-3">No Results Found</h3>
                <p className="text-gray-500 text-lg mb-6">
                  We couldn't find any products matching "<span className="font-semibold text-purple-600">{searchQuery}</span>"
                </p>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all transform hover:scale-105"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-center">
                  <p className="text-gray-600 text-lg">
                    Found <span className="font-bold text-purple-600">{searchResults.length}</span> products
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-6">
                  {sortProducts(searchResults).map((product) => {
                    const getCategoryDesign = (catName) => {
                      switch(catName) {
                        case 'Business Cards':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-4">
                              <div className="w-full bg-white rounded-lg shadow-xl p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-1.5 bg-purple-600 rounded w-3/4 mb-1"></div>
                                    <div className="h-1.5 bg-purple-400 rounded w-1/2"></div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="h-1 bg-purple-300 rounded w-2/3"></div>
                                  <div className="h-1 bg-purple-300 rounded w-1/2"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Banners & Posters':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="w-full bg-white rounded-lg shadow-xl p-2">
                                <div className="bg-pink-500 rounded-lg p-2 mb-1.5">
                                  <div className="text-white font-bold text-center text-sm">SALE</div>
                                </div>
                                <div className="bg-pink-100 rounded-lg h-12 mb-1.5"></div>
                                <div className="bg-pink-500 rounded-lg p-1.5">
                                  <div className="text-white text-center font-bold text-xs">50% OFF</div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Menu Cards':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="w-full bg-white rounded-lg shadow-xl p-3">
                                <div className="bg-blue-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">MENU</div>
                                <div className="space-y-1.5">
                                  <div className="flex justify-between items-center">
                                    <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                    <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                    <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                    <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Bill Books & Invoices':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="w-full bg-white rounded-lg shadow-xl p-3">
                                <div className="bg-green-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">INVOICE</div>
                                <div className="space-y-1.5 mb-2">
                                  <div className="h-1 bg-green-300 rounded w-1/2"></div>
                                  <div className="h-1 bg-green-300 rounded w-2/3"></div>
                                </div>
                                <div className="space-y-1 mb-2">
                                  <div className="flex justify-between">
                                    <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                    <div className="h-1 bg-green-200 rounded w-1/4"></div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                    <div className="h-1 bg-green-200 rounded w-1/4"></div>
                                  </div>
                                </div>
                                <div className="bg-green-500 rounded p-1 text-white text-center text-xs font-bold">TOTAL</div>
                              </div>
                            </div>
                          );
                        
                        case 'Packaging Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-4">
                              <div className="relative w-24 h-24">
                                <div className="absolute inset-0 bg-white rounded-lg shadow-2xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg opacity-80"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                                    <div className="text-white font-bold text-xs">LOGO</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Stickers & Labels':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-4">
                              <div className="relative w-24 h-24">
                                <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
                                <div className="absolute inset-2 bg-white rounded-full"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <div className="text-yellow-600 font-bold text-xs">PREMIUM</div>
                                  <div className="text-yellow-600 font-bold text-xs">QUALITY</div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Wedding Cards & Invitations':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="w-full bg-pink-50 rounded-lg shadow-xl p-3 border-2 border-pink-200">
                                <div className="flex justify-center mb-1.5">
                                  <svg className="w-10 h-10 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                </div>
                                <div className="space-y-1">
                                  <div className="h-1.5 bg-pink-400 rounded w-full"></div>
                                  <div className="h-1 bg-pink-300 rounded w-3/4 mx-auto"></div>
                                  <div className="h-1 bg-pink-300 rounded w-2/3 mx-auto"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'YouTube Thumbnails & Channel Art':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="w-full bg-red-600 rounded-lg shadow-xl p-3">
                                <div className="flex items-center justify-center h-full">
                                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/>
                                  </svg>
                                </div>
                                <div className="flex justify-between mt-1.5">
                                  <div className="h-1 bg-white rounded w-1/3"></div>
                                  <div className="h-1 bg-white rounded w-1/3"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'T-Shirt Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="relative w-24 h-28">
                                <svg viewBox="0 0 100 120" className="w-full h-full">
                                  <path d="M30,15 L30,30 L20,35 L20,110 L80,110 L80,35 L70,30 L70,15 L60,20 L50,12 L40,20 Z" 
                                        fill="#6366f1" stroke="#4f46e5" strokeWidth="1"/>
                                  <circle cx="50" cy="45" r="10" fill="white" opacity="0.3"/>
                                  <rect x="35" y="60" width="30" height="3" rx="1.5" fill="white"/>
                                  <rect x="30" y="68" width="40" height="3" rx="1.5" fill="white"/>
                                </svg>
                              </div>
                            </div>
                          );
                        
                        case 'Envelope Cover':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="relative w-full max-w-[100px]">
                                <div className="bg-teal-400 rounded-lg shadow-xl p-3 pt-6">
                                  <div className="absolute top-0 left-0 right-0 h-8 bg-teal-500 rounded-t-lg" style={{clipPath: 'polygon(0 0, 50% 60%, 100% 0)'}}></div>
                                  <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded transform rotate-12">
                                    <div className="absolute inset-1 border border-yellow-600 rounded"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'CV Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-3">
                              <div className="w-full bg-white rounded-lg shadow-xl p-2.5">
                                <div className="bg-cyan-500 rounded-lg p-1.5 mb-1.5 flex items-center space-x-1.5">
                                  <div className="w-6 h-6 bg-white rounded-full"></div>
                                  <div className="flex-1">
                                    <div className="h-1 bg-white rounded w-3/4 mb-1"></div>
                                    <div className="h-1 bg-cyan-200 rounded w-1/2"></div>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="h-1 bg-cyan-200 rounded w-full"></div>
                                  <div className="h-1 bg-cyan-200 rounded w-full"></div>
                                  <div className="h-1 bg-cyan-200 rounded w-3/4"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Bookmark Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-4">
                              <div className="relative w-12 h-32">
                                <div className="absolute inset-0 bg-purple-600 rounded-t-lg shadow-xl"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-6" style={{clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 0, 0 0)'}}>
                                  <div className="w-full h-full bg-purple-600"></div>
                                </div>
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full opacity-30"></div>
                                <div className="absolute top-12 left-1 right-1 space-y-1">
                                  <div className="h-0.5 bg-white rounded opacity-50"></div>
                                  <div className="h-0.5 bg-white rounded opacity-50"></div>
                                  <div className="h-0.5 bg-white rounded opacity-50"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        default:
                          return <span className="text-6xl">{categories[product.category].icon}</span>;
                      }
                    };

                    return (
                      <div 
                        key={product.id} 
                        className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <div 
                          onClick={() => {
                            setCurrentPage('product');
                            setSelectedProduct(product);
                            setSelectedCategory(product.category);
                            setSelectedSubCategory(product.subCategory);
                          }}
                          className="cursor-pointer relative"
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product);
                            }}
                            className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-all transform hover:scale-110 shadow-lg ${
                              isInWishlist(product.id) 
                                ? 'bg-red-500 text-white' 
                                : 'bg-white text-red-500'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          </button>
                          <div 
                            className={`aspect-square bg-gradient-to-br ${categories[product.category].color} flex items-center justify-center`}
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            {getCategoryDesign(product.category)}
                          </div>
                          <div className="p-4 bg-white">
                            <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">{product.subCategory}</p>
                            <p className="text-2xl font-bold text-purple-600 mb-3">₹{product.price}</p>
                          </div>
                        </div>
                        <div className="px-4 pb-4 bg-white">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWhatsAppQuery(product);
                            }}
                            className="w-full bg-green-500 text-white p-2.5 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                            title="WhatsApp"
                          >
                            <MessageCircle size={20} />
                            <span className="font-semibold">Order on WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* Random Products Page */}
        {currentPage === 'random' && (
          <>
            <div className="grid grid-cols-5 gap-6">
              {sortProducts(randomProducts).map((product) => {
                const getCategoryDesign = (catName) => {
                  switch(catName) {
                    case 'Business Cards':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="h-1.5 bg-purple-600 rounded w-3/4 mb-1"></div>
                                <div className="h-1.5 bg-purple-400 rounded w-1/2"></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-purple-300 rounded w-2/3"></div>
                              <div className="h-1 bg-purple-300 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Banners & Posters':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-2">
                            <div className="bg-pink-500 rounded-lg p-2 mb-1.5">
                              <div className="text-white font-bold text-center text-sm">SALE</div>
                            </div>
                            <div className="bg-pink-100 rounded-lg h-12 mb-1.5"></div>
                            <div className="bg-pink-500 rounded-lg p-1.5">
                              <div className="text-white text-center font-bold text-xs">50% OFF</div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Menu Cards':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3">
                            <div className="bg-blue-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">MENU</div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bill Books & Invoices':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3">
                            <div className="bg-green-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">INVOICE</div>
                            <div className="space-y-1.5 mb-2">
                              <div className="h-1 bg-green-300 rounded w-1/2"></div>
                              <div className="h-1 bg-green-300 rounded w-2/3"></div>
                            </div>
                            <div className="space-y-1 mb-2">
                              <div className="flex justify-between">
                                <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1 bg-green-200 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between">
                                <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1 bg-green-200 rounded w-1/4"></div>
                              </div>
                            </div>
                            <div className="bg-green-500 rounded p-1 text-white text-center text-xs font-bold">TOTAL</div>
                          </div>
                        </div>
                      );
                    
                    case 'Packaging Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-24 h-24">
                            <div className="absolute inset-0 bg-white rounded-lg shadow-2xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                                <div className="text-white font-bold text-xs">LOGO</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Stickers & Labels':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-24 h-24">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
                            <div className="absolute inset-2 bg-white rounded-full"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="text-yellow-600 font-bold text-xs">PREMIUM</div>
                              <div className="text-yellow-600 font-bold text-xs">QUALITY</div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Wedding Cards & Invitations':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-pink-50 rounded-lg shadow-xl p-3 border-2 border-pink-200">
                            <div className="flex justify-center mb-1.5">
                              <svg className="w-10 h-10 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1.5 bg-pink-400 rounded w-full"></div>
                              <div className="h-1 bg-pink-300 rounded w-3/4 mx-auto"></div>
                              <div className="h-1 bg-pink-300 rounded w-2/3 mx-auto"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'YouTube Thumbnails & Channel Art':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-red-600 rounded-lg shadow-xl p-3">
                            <div className="flex items-center justify-center h-full">
                              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/>
                              </svg>
                            </div>
                            <div className="flex justify-between mt-1.5">
                              <div className="h-1 bg-white rounded w-1/3"></div>
                              <div className="h-1 bg-white rounded w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'T-Shirt Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="relative w-24 h-28">
                            <svg viewBox="0 0 100 120" className="w-full h-full">
                              <path d="M30,15 L30,30 L20,35 L20,110 L80,110 L80,35 L70,30 L70,15 L60,20 L50,12 L40,20 Z" 
                                    fill="#6366f1" stroke="#4f46e5" strokeWidth="1"/>
                              <circle cx="50" cy="45" r="10" fill="white" opacity="0.3"/>
                              <rect x="35" y="60" width="30" height="3" rx="1.5" fill="white"/>
                              <rect x="30" y="68" width="40" height="3" rx="1.5" fill="white"/>
                            </svg>
                          </div>
                        </div>
                      );
                    
                    case 'Envelope Cover':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="relative w-full max-w-[100px]">
                            <div className="bg-teal-400 rounded-lg shadow-xl p-3 pt-6">
                              <div className="absolute top-0 left-0 right-0 h-8 bg-teal-500 rounded-t-lg" style={{clipPath: 'polygon(0 0, 50% 60%, 100% 0)'}}></div>
                              <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded transform rotate-12">
                                <div className="absolute inset-1 border border-yellow-600 rounded"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'CV Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-2.5">
                            <div className="bg-cyan-500 rounded-lg p-1.5 mb-1.5 flex items-center space-x-1.5">
                              <div className="w-6 h-6 bg-white rounded-full"></div>
                              <div className="flex-1">
                                <div className="h-1 bg-white rounded w-3/4 mb-1"></div>
                                <div className="h-1 bg-cyan-200 rounded w-1/2"></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1 bg-cyan-200 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bookmark Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-12 h-32">
                            <div className="absolute inset-0 bg-purple-600 rounded-t-lg shadow-xl"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-6" style={{clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 0, 0 0)'}}>
                              <div className="w-full h-full bg-purple-600"></div>
                            </div>
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full opacity-30"></div>
                            <div className="absolute top-12 left-1 right-1 space-y-1">
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    default:
                      return <span className="text-6xl">{categories[product.category].icon}</span>;
                  }
                };

                return (
                  <div 
                    key={product.id} 
                    className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div 
                      onClick={() => {
                        setCurrentPage('product');
                        setSelectedProduct(product);
                        setSelectedCategory(product.category);
                        setSelectedSubCategory(product.subCategory);
                      }}
                      className="cursor-pointer relative"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-all transform hover:scale-110 shadow-lg ${
                          isInWishlist(product.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white text-red-500'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      <div 
                        className={`aspect-square bg-gradient-to-br ${categories[product.category].color} flex items-center justify-center`}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        {getCategoryDesign(product.category)}
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-purple-600 mb-3">₹{product.price}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 bg-white">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppQuery(product);
                        }}
                        className="w-full bg-green-500 text-white p-2.5 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                        title="WhatsApp"
                      >
                        <MessageCircle size={20} />
                        <span className="font-semibold">Order on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Sub-category Page */}
        {currentPage === 'subcategory' && selectedSubCategory && !selectedProduct && (
          <>
            <div className="grid grid-cols-5 gap-6">
              {sortProducts(getPaginatedItems(generateProducts(selectedSubCategory), productPage)).map((product) => {
                const getCategoryDesign = (catName) => {
                  switch(catName) {
                    case 'Business Cards':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="h-1.5 bg-purple-600 rounded w-3/4 mb-1"></div>
                                <div className="h-1.5 bg-purple-400 rounded w-1/2"></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-purple-300 rounded w-2/3"></div>
                              <div className="h-1 bg-purple-300 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Banners & Posters':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-2">
                            <div className="bg-pink-500 rounded-lg p-2 mb-1.5">
                              <div className="text-white font-bold text-center text-sm">SALE</div>
                            </div>
                            <div className="bg-pink-100 rounded-lg h-12 mb-1.5"></div>
                            <div className="bg-pink-500 rounded-lg p-1.5">
                              <div className="text-white text-center font-bold text-xs">50% OFF</div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Menu Cards':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3">
                            <div className="bg-blue-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">MENU</div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 bg-blue-300 rounded w-2/3"></div>
                                <div className="h-1.5 bg-yellow-400 rounded w-1/4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bill Books & Invoices':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-3">
                            <div className="bg-green-500 rounded-lg p-1.5 mb-2 text-white text-center font-bold text-xs">INVOICE</div>
                            <div className="space-y-1.5 mb-2">
                              <div className="h-1 bg-green-300 rounded w-1/2"></div>
                              <div className="h-1 bg-green-300 rounded w-2/3"></div>
                            </div>
                            <div className="space-y-1 mb-2">
                              <div className="flex justify-between">
                                <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1 bg-green-200 rounded w-1/4"></div>
                              </div>
                              <div className="flex justify-between">
                                <div className="h-1 bg-green-200 rounded w-1/2"></div>
                                <div className="h-1 bg-green-200 rounded w-1/4"></div>
                              </div>
                            </div>
                            <div className="bg-green-500 rounded p-1 text-white text-center text-xs font-bold">TOTAL</div>
                          </div>
                        </div>
                      );
                    
                    case 'Packaging Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-24 h-24">
                            <div className="absolute inset-0 bg-white rounded-lg shadow-2xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                                <div className="text-white font-bold text-xs">LOGO</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Stickers & Labels':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-24 h-24">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
                            <div className="absolute inset-2 bg-white rounded-full"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="text-yellow-600 font-bold text-xs">PREMIUM</div>
                              <div className="text-yellow-600 font-bold text-xs">QUALITY</div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Wedding Cards & Invitations':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-pink-50 rounded-lg shadow-xl p-3 border-2 border-pink-200">
                            <div className="flex justify-center mb-1.5">
                              <svg className="w-10 h-10 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1.5 bg-pink-400 rounded w-full"></div>
                              <div className="h-1 bg-pink-300 rounded w-3/4 mx-auto"></div>
                              <div className="h-1 bg-pink-300 rounded w-2/3 mx-auto"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'YouTube Thumbnails & Channel Art':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-red-600 rounded-lg shadow-xl p-3">
                            <div className="flex items-center justify-center h-full">
                              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/>
                              </svg>
                            </div>
                            <div className="flex justify-between mt-1.5">
                              <div className="h-1 bg-white rounded w-1/3"></div>
                              <div className="h-1 bg-white rounded w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'T-Shirt Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="relative w-24 h-28">
                            <svg viewBox="0 0 100 120" className="w-full h-full">
                              <path d="M30,15 L30,30 L20,35 L20,110 L80,110 L80,35 L70,30 L70,15 L60,20 L50,12 L40,20 Z" 
                                    fill="#6366f1" stroke="#4f46e5" strokeWidth="1"/>
                              <circle cx="50" cy="45" r="10" fill="white" opacity="0.3"/>
                              <rect x="35" y="60" width="30" height="3" rx="1.5" fill="white"/>
                              <rect x="30" y="68" width="40" height="3" rx="1.5" fill="white"/>
                            </svg>
                          </div>
                        </div>
                      );
                    
                    case 'Envelope Cover':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="relative w-full max-w-[100px]">
                            <div className="bg-teal-400 rounded-lg shadow-xl p-3 pt-6">
                              <div className="absolute top-0 left-0 right-0 h-8 bg-teal-500 rounded-t-lg" style={{clipPath: 'polygon(0 0, 50% 60%, 100% 0)'}}></div>
                              <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded transform rotate-12">
                                <div className="absolute inset-1 border border-yellow-600 rounded"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'CV Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-3">
                          <div className="w-full bg-white rounded-lg shadow-xl p-2.5">
                            <div className="bg-cyan-500 rounded-lg p-1.5 mb-1.5 flex items-center space-x-1.5">
                              <div className="w-6 h-6 bg-white rounded-full"></div>
                              <div className="flex-1">
                                <div className="h-1 bg-white rounded w-3/4 mb-1"></div>
                                <div className="h-1 bg-cyan-200 rounded w-1/2"></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1 bg-cyan-200 rounded w-full"></div>
                              <div className="h-1 bg-cyan-200 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    case 'Bookmark Design':
                      return (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-12 h-32">
                            <div className="absolute inset-0 bg-purple-600 rounded-t-lg shadow-xl"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-6" style={{clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 0, 0 0)'}}>
                              <div className="w-full h-full bg-purple-600"></div>
                            </div>
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full opacity-30"></div>
                            <div className="absolute top-12 left-1 right-1 space-y-1">
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                              <div className="h-0.5 bg-white rounded opacity-50"></div>
                            </div>
                          </div>
                        </div>
                      );
                    
                    default:
                      return <span className="text-6xl">{categories[selectedCategory].icon}</span>;
                  }
                };

                return (
                  <div 
                    key={product.id} 
                    className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div 
                      onClick={() => {
                        setCurrentPage('product');
                        setSelectedProduct(product);
                      }}
                      className="cursor-pointer relative"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-all transform hover:scale-110 shadow-lg ${
                          isInWishlist(product.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white text-red-500'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      <div 
                        className={`aspect-square bg-gradient-to-br ${categories[selectedCategory].color} flex items-center justify-center`}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        {getCategoryDesign(selectedCategory)}
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-purple-600 mb-3">₹{product.price}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 bg-white">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppQuery(product);
                        }}
                        className="w-full bg-green-500 text-white p-2.5 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                        title="WhatsApp"
                      >
                        <MessageCircle size={20} />
                        <span className="font-semibold">Order on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="max-w-7xl mx-auto">
              {renderPagination(
                productPage, 
                getTotalPages(generateProducts(selectedSubCategory)), 
                setProductPage
              )}
            </div>
          </>
        )}

        {/* Product Detail Page */}
        {currentPage === 'product' && selectedProduct && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div 
                  className={`aspect-square bg-gradient-to-br ${categories[selectedCategory].color} flex items-center justify-center rounded-xl shadow-lg`}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {(() => {
                    const getCategoryDesign = (catName) => {
                      switch(catName) {
                        case 'Business Cards':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-8">
                              <div className="w-full bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all">
                                <div className="flex items-center space-x-4 mb-4">
                                  <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-3 bg-purple-600 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-purple-400 rounded w-1/2"></div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="h-2 bg-purple-300 rounded w-2/3"></div>
                                  <div className="h-2 bg-purple-300 rounded w-1/2"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Banners & Posters':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="w-full bg-white rounded-xl shadow-2xl p-4 transform hover:scale-105 transition-all">
                                <div className="bg-pink-500 rounded-xl p-4 mb-3">
                                  <div className="text-white font-bold text-center text-3xl">SALE</div>
                                </div>
                                <div className="bg-pink-100 rounded-xl h-24 mb-3"></div>
                                <div className="bg-pink-500 rounded-xl p-3">
                                  <div className="text-white text-center font-bold text-xl">50% OFF</div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Menu Cards':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="w-full bg-white rounded-xl shadow-2xl p-5 transform hover:scale-105 transition-all">
                                <div className="bg-blue-500 rounded-xl p-3 mb-4 text-white text-center font-bold text-xl">MENU</div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <div className="h-3 bg-blue-300 rounded w-2/3"></div>
                                    <div className="h-3 bg-yellow-400 rounded w-1/4"></div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="h-3 bg-blue-300 rounded w-2/3"></div>
                                    <div className="h-3 bg-yellow-400 rounded w-1/4"></div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="h-3 bg-blue-300 rounded w-2/3"></div>
                                    <div className="h-3 bg-yellow-400 rounded w-1/4"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Bill Books & Invoices':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="w-full bg-white rounded-xl shadow-2xl p-5 transform hover:scale-105 transition-all">
                                <div className="bg-green-500 rounded-xl p-3 mb-4 text-white text-center font-bold text-lg">INVOICE</div>
                                <div className="space-y-3 mb-4">
                                  <div className="h-2 bg-green-300 rounded w-1/2"></div>
                                  <div className="h-2 bg-green-300 rounded w-2/3"></div>
                                </div>
                                <div className="space-y-2 mb-4">
                                  <div className="flex justify-between">
                                    <div className="h-2 bg-green-200 rounded w-1/2"></div>
                                    <div className="h-2 bg-green-200 rounded w-1/4"></div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="h-2 bg-green-200 rounded w-1/2"></div>
                                    <div className="h-2 bg-green-200 rounded w-1/4"></div>
                                  </div>
                                </div>
                                <div className="bg-green-500 rounded p-2 text-white text-center text-sm font-bold">TOTAL</div>
                              </div>
                            </div>
                          );
                        
                        case 'Packaging Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-10">
                              <div className="relative w-40 h-40 transform hover:rotate-12 transition-all duration-300">
                                <div className="absolute inset-0 bg-white rounded-xl shadow-2xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-xl opacity-80"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center">
                                    <div className="text-white font-bold text-lg">LOGO</div>
                                  </div>
                                </div>
                                <div className="absolute top-0 left-1/2 w-px h-full bg-orange-600 opacity-50"></div>
                                <div className="absolute top-1/2 left-0 w-full h-px bg-orange-600 opacity-50"></div>
                              </div>
                            </div>
                          );
                        
                        case 'Stickers & Labels':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-10">
                              <div className="relative w-40 h-40 transform hover:scale-110 transition-all">
                                <div className="absolute inset-0 bg-yellow-400 rounded-full shadow-2xl"></div>
                                <div className="absolute inset-3 bg-white rounded-full"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <div className="text-yellow-600 font-bold text-xl">PREMIUM</div>
                                  <div className="text-yellow-600 font-bold text-lg">QUALITY</div>
                                </div>
                                <svg className="absolute bottom-6 left-1/2 transform -translate-x-1/2" width="80" height="15" viewBox="0 0 80 15">
                                  <path d="M0,7 Q20,0 40,7 T80,7" stroke="#fbbf24" strokeWidth="3" fill="none"/>
                                </svg>
                              </div>
                            </div>
                          );
                        
                        case 'Wedding Cards & Invitations':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="w-full bg-pink-50 rounded-xl shadow-2xl p-6 border-4 border-pink-200 transform hover:scale-105 transition-all">
                                <div className="flex justify-center mb-3">
                                  <svg className="w-16 h-16 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                </div>
                                <div className="space-y-2">
                                  <div className="h-3 bg-pink-400 rounded w-full"></div>
                                  <div className="h-2 bg-pink-300 rounded w-3/4 mx-auto"></div>
                                  <div className="h-2 bg-pink-300 rounded w-2/3 mx-auto"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'YouTube Thumbnails & Channel Art':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="w-full bg-red-600 rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all">
                                <div className="flex items-center justify-center h-full mb-3">
                                  <div className="relative">
                                    <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/>
                                    </svg>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="h-2 bg-white rounded w-1/3"></div>
                                  <div className="h-2 bg-white rounded w-1/3"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'T-Shirt Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="relative w-44 h-52 transform hover:scale-105 transition-all">
                                <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
                                  <path d="M30,15 L30,30 L20,35 L20,110 L80,110 L80,35 L70,30 L70,15 L60,20 L50,12 L40,20 Z" 
                                        fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
                                  <circle cx="50" cy="45" r="15" fill="white" opacity="0.3"/>
                                  <rect x="30" y="65" width="40" height="5" rx="2.5" fill="white"/>
                                  <rect x="25" y="75" width="50" height="5" rx="2.5" fill="white"/>
                                </svg>
                              </div>
                            </div>
                          );
                        
                        case 'Envelope Cover':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="relative w-full max-w-[200px]">
                                <div className="bg-teal-400 rounded-xl shadow-2xl p-6 pt-14 transform hover:scale-105 transition-all">
                                  <div className="absolute top-0 left-0 right-0 h-16 bg-teal-500 rounded-t-xl" style={{clipPath: 'polygon(0 0, 50% 60%, 100% 0)'}}></div>
                                  <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-400 rounded transform rotate-12 shadow-lg">
                                    <div className="absolute inset-2 border-2 border-yellow-600 rounded"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'CV Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <div className="w-full bg-white rounded-xl shadow-2xl p-5 transform hover:scale-105 transition-all">
                                <div className="bg-cyan-500 rounded-xl p-3 mb-3 flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-white rounded-full"></div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-white rounded w-3/4 mb-2"></div>
                                    <div className="h-2 bg-cyan-200 rounded w-1/2"></div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="h-2 bg-cyan-200 rounded w-full"></div>
                                  <div className="h-2 bg-cyan-200 rounded w-full"></div>
                                  <div className="h-2 bg-cyan-200 rounded w-3/4"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        case 'Bookmark Design':
                          return (
                            <div className="w-full h-full flex items-center justify-center p-10">
                              <div className="relative w-24 h-56 transform hover:scale-110 transition-all">
                                <div className="absolute inset-0 bg-purple-600 rounded-t-xl shadow-2xl"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-12" style={{clipPath: 'polygon(0 0, 50% 100%, 100% 0, 100% 0, 0 0)'}}>
                                  <div className="w-full h-full bg-purple-600"></div>
                                </div>
                                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full opacity-30"></div>
                                <div className="absolute top-24 left-3 right-3 space-y-2">
                                  <div className="h-1.5 bg-white rounded opacity-50"></div>
                                  <div className="h-1.5 bg-white rounded opacity-50"></div>
                                  <div className="h-1.5 bg-white rounded opacity-50"></div>
                                </div>
                              </div>
                            </div>
                          );
                        
                        default:
                          return <span className="text-7xl">{categories[selectedCategory].icon}</span>;
                      }
                    };
                    return getCategoryDesign(selectedCategory);
                  })()}
                </div>

                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
                    <p className="text-4xl font-bold text-purple-600 mb-3">₹{selectedProduct.price}</p>
                  </div>

                  <div className="border-t border-b py-3 space-y-2">
                    <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">File Type</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.fileType}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">File Size</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.fileSize}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Resolution</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.resolution}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Color Mode</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.colorMode}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Dimensions</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.dimensions}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Layers</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.layers}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Fonts</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.fonts}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs mb-1">Editable</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.editable}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-gray-500 text-xs mb-1">Print Ready</p>
                      <p className="font-bold text-gray-800 text-sm">{selectedProduct.printReady}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3">
                    <button
                      onClick={() => handleWhatsAppQuery(selectedProduct)}
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-base hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle size={20} />
                      <span>WhatsApp for Customization</span>
                    </button>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">
                      <strong>Note:</strong> Contact us on WhatsApp for customization and purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {currentPage !== 'home' && (
            <div className="text-center mb-12 pb-8 border-b border-gray-800">
              <h4 className="text-3xl font-bold mb-8">Connect With Us</h4>
              <div className="flex justify-center space-x-8">
                <div className="cursor-pointer group" onClick={() => window.open('https://wa.me/917091328594', '_blank')}>
                  <div className="bg-green-500 text-white p-5 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg group-hover:bg-green-600">
                    <MessageCircle size={36} />
                  </div>
                  <p className="mt-3 text-gray-300 font-semibold group-hover:text-white transition">WhatsApp</p>
                </div>

                <div className="cursor-pointer group" onClick={() => window.open('https://www.instagram.com/fixorafile/', '_blank')}>
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-5 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg">
                    <Instagram size={36} />
                  </div>
                  <p className="mt-3 text-gray-300 font-semibold group-hover:text-white transition">Instagram</p>
                </div>

                <div className="cursor-pointer group" onClick={() => window.open('https://www.facebook.com/altafallrounder', '_blank')}>
                  <div className="bg-blue-600 text-white p-5 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg group-hover:bg-blue-700">
                    <Facebook size={36} />
                  </div>
                  <p className="mt-3 text-gray-300 font-semibold group-hover:text-white transition">Facebook</p>
                </div>

                <div className="cursor-pointer group" onClick={() => window.open('https://in.pinterest.com/Altafallrounder/', '_blank')}>
                  <div className="bg-red-600 text-white p-5 rounded-full hover:scale-110 transition-all duration-300 transform hover:shadow-2xl shadow-lg group-hover:bg-red-700">
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <p className="mt-3 text-gray-300 font-semibold group-hover:text-white transition">Pinterest</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 12H5V8h14v10z"/>
                    <path d="M7 10h10v2H7zm0 3h10v2H7zm0 3h7v2H7z" opacity="0.7"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Fixora File</h3>
              </div>
              <p className="text-gray-400">Premium graphic templates for businesses</p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition">About Us</li>
                <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
                <li className="hover:text-white cursor-pointer transition">Refund Policy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2 hover:text-white transition cursor-pointer">
                  <Phone size={18} />
                  <span>+91 7091328594</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-white transition cursor-pointer">
                  <Mail size={18} />
                  <span>fixorafile@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-white transition">
                  <MapPin size={18} />
                  <span>Patna, Bihar, India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook 
                  className="cursor-pointer hover:text-blue-400 transition transform hover:scale-110" 
                  onClick={() => window.open('https://www.facebook.com/altafallrounder', '_blank')}
                />
                <Instagram 
                  className="cursor-pointer hover:text-pink-400 transition transform hover:scale-110" 
                  onClick={() => window.open('https://www.instagram.com/fixorafile/', '_blank')}
                />
                <div 
                  className="cursor-pointer hover:text-red-400 transition transform hover:scale-110"
                  onClick={() => window.open('https://in.pinterest.com/Altafallrounder/', '_blank')}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </div>
                <MessageCircle 
                  className="cursor-pointer hover:text-green-400 transition transform hover:scale-110" 
                  onClick={() => window.open('https://wa.me/917091328594', '_blank')}
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fixora File. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FixoraFileStore;
