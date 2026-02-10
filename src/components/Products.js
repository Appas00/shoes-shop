import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import "../Styles/Products.css";
import { FaShoppingCart, FaHeart, FaEye, FaStar, FaFilter, FaSort, FaCheck } from "react-icons/fa";

function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nike Air Max 270",
      price: "₹4,999",
      originalPrice: "₹6,499",
      image: "https://pngimg.com/d/running_shoes_PNG5823.png",
      category: "Running",
      rating: 4.5,
      badge: "BESTSELLER",
      featured: true,
      description: "Premium running shoes with Air Max technology"
    },
    {
      id: 2,
      name: "Adidas UltraBoost 22",
      price: "₹5,499",
      originalPrice: "₹6,999",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5819.png",
      category: "Running",
      rating: 4.8,
      badge: "NEW",
      featured: true,
      description: "Responsive Boost cushioning for maximum comfort"
    },
    {
      id: 3,
      name: "Puma SoftRide Enzo",
      price: "₹3,999",
      originalPrice: "₹4,999",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5820.png",
      category: "Casual",
      rating: 4.2,
      badge: "SALE",
      featured: false,
      description: "Stylish casual shoes with SoftFoam+ technology"
    },
    {
      id: 4,
      name: "Reebok Zig Kinetica II",
      price: "₹4,299",
      originalPrice: "₹5,299",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5821.png",
      category: "Training",
      rating: 4.4,
      badge: "LIMITED",
      featured: true,
      description: "Dynamic training shoes with Zig Energy Bands"
    },
    {
      id: 5,
      name: "Asics Gel Nimbus 24",
      price: "₹6,099",
      originalPrice: "₹7,499",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5825.png",
      category: "Running",
      rating: 4.7,
      badge: "PREMIUM",
      featured: false,
      description: "Long-distance running with Gel cushioning"
    },
    {
      id: 6,
      name: "New Balance 1080v12",
      price: "₹5,799",
      originalPrice: "₹6,799",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5822.png",
      category: "Running",
      rating: 4.6,
      badge: "TRENDING",
      featured: true,
      description: "Fresh Foam X cushioning for plush comfort"
    },
    {
      id: 7,
      name: "Under Armour HOVR Sonic 5",
      price: "₹6,199",
      originalPrice: "₹7,199",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5824.png",
      category: "Training",
      rating: 4.3,
      badge: "NEW",
      featured: false,
      description: "Zero gravity feel with HOVR technology"
    },
    {
      id: 8,
      name: "Asics Gel-Kayano 29",
      price: "₹7,499",
      originalPrice: "₹8,999",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5825.png",
      category: "Running",
      rating: 4.9,
      badge: "PREMIUM",
      featured: true,
      description: "Stability running shoes with FlyteFoam"
    },
    {
      id: 9,
      name: "Skechers GoRun Ride 10",
      price: "₹3,799",
      originalPrice: "₹4,799",
      image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5818.png",
      category: "Casual",
      rating: 4.1,
      badge: "SALE",
      featured: false,
      description: "Lightweight running shoes with Goodyear rubber"
    },
    {
      id: 10,
      name: "Nike Pegasus 39",
      price: "₹5,299",
      originalPrice: "₹6,299",
      image: "https://pngimg.com/d/running_shoes_PNG5823.png",
      category: "Running",
      rating: 4.7,
      badge: "BESTSELLER",
      featured: true,
      description: "Responsive React foam with secure fit"
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState(null);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const itemsPerPage = 8;

  const filters = [
    { id: "all", label: "All Shoes" },
    { id: "running", label: "Running" },
    { id: "casual", label: "Casual" },
    { id: "training", label: "Training" },
    { id: "featured", label: "Featured" }
  ];

  const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "rating", label: "Top Rated" },
    { id: "newest", label: "Newest First" }
  ];

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (activeFilter !== "all") {
      result = result.filter(product =>
        activeFilter === "featured" 
          ? product.featured 
          : product.category.toLowerCase() === activeFilter
      );
    }
    
    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => parseFloat(a.price.replace(/[^0-9]/g, '')) - parseFloat(b.price.replace(/[^0-9]/g, '')));
        break;
      case "price-high":
        result.sort((a, b) => parseFloat(b.price.replace(/[^0-9]/g, '')) - parseFloat(a.price.replace(/[^0-9]/g, '')));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        result.sort((a, b) => (b.featured - a.featured) || b.rating - a.rating);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, activeFilter, sortBy, products]);

  // Auto-hide cart success message
  useEffect(() => {
    if (showCartSuccess) {
      const timer = setTimeout(() => {
        setShowCartSuccess(false);
        setAddedToCart(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCartSuccess]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleQuickView = (product) => {
    alert(`🚀 ${product.name}\n\n💰 Price: ${product.price} (Original: ${product.originalPrice})\n⭐ Rating: ${product.rating}/5\n🏷️ Category: ${product.category}\n📝 ${product.description}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product);
    setShowCartSuccess(true);
    
    // Add animation effect to the button
    const button = document.querySelector(`.buy-btn[data-id="${product.id}"]`);
    if (button) {
      button.classList.add('added');
      setTimeout(() => button.classList.remove('added'), 500);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < Math.floor(rating) ? "star filled" : "star"}
          />
        ))}
        <span className="rating-number">{rating}</span>
      </div>
    );
  };

  return (
    <div className="products-container">
      
      {/* Cart Success Notification */}
      {showCartSuccess && addedToCart && (
        <div className="cart-success-notification">
          <div className="success-content">
            <FaCheck className="success-icon" />
            <div className="success-details">
              <h4>Added to Cart!</h4>
              <p>{addedToCart.name} has been added to your shopping cart</p>
            </div>
          </div>
        </div>
      )}

      <h1 className="title">🔥 Premium Footwear Collection</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search premium shoes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-options">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <FaFilter /> {filter.label}
            </button>
          ))}
        </div>
        
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map(option => (
            <option key={option.id} value={option.id}>
              <FaSort /> {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Products Count */}
      <div className="products-count">
        Showing {currentProducts.length} of {filteredProducts.length} products
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {currentProducts.map((item, index) => (
          <div 
            key={item.id} 
            className="product-card"
            style={{ '--card-index': index }}
          >
            {/* Product Badge */}
            {item.badge && (
              <div className="product-badge">
                {item.badge}
              </div>
            )}
            
            {/* Image Wrapper */}
            <div className="product-img-wrapper">
              <img src={item.image} alt={item.name} className="product-img" />
              
              {/* Quick Actions Overlay */}
              <div className="quick-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleQuickView(item)}
                  title="Quick View"
                >
                  <FaEye />
                </button>
                <button 
                  className={`action-btn ${wishlist.includes(item.id) ? 'active' : ''}`}
                  onClick={() => handleAddToWishlist(item.id)}
                  title={wishlist.includes(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <FaHeart style={wishlist.includes(item.id) ? { color: '#ff4757' } : {}} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <h3>{item.name}</h3>
            
            {/* Rating */}
            {renderStars(item.rating)}
            
            {/* Price */}
            <div className="price-container">
              <p className="price">{item.price}</p>
              {item.originalPrice && (
                <span className="original-price">
                  <s>{item.originalPrice}</s>
                </span>
              )}
            </div>
            
            {/* Category */}
            <div className="product-category">
              <span>{item.category}</span>
            </div>

            {/* Description */}
            <p className="product-description">{item.description}</p>

            {/* Add to Cart Button */}
            <button 
              className="buy-btn"
              onClick={() => handleAddToCart(item)}
              data-id={item.id}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ←
          </button>
          
          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="page-dots">...</span>;
              }
              return null;
            })}
          </div>
          
          <button 
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;