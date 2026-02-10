import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Import Cart Context
import "../Styles/Home.css";
import shoe1 from "../Images/Shoes 1.png";
import shoe2 from "../Images/Shoes 2.png";
import shoe3 from "../Images/Shoes 3.png";
import { 
  FaShoppingCart, 
  FaHeart, 
  FaTruck, 
  FaShieldAlt, 
  FaRedo,
  FaCrown,
  FaStar,
  FaArrowRight,
  FaGem,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [showSubscribeSuccess, setShowSubscribeSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [addedProduct, setAddedProduct] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart(); // Use Cart Context
  
  const images = [shoe1, shoe2, shoe3];
  const slideTitles = ["ELEVATED ESSENTIALS", "DEFY ORDINARY", "TIMELESS ELEGANCE"];
  const slideSubtitles = ["Where Craftsmanship Meets Innovation", "Redefining Footwear Excellence", "Heritage Meets Modern Design"];
  
  // Updated product data with proper structure for cart
  const products = [
    {
      id: 101,
      name: "ELEVATED ESSENTIALS",
      price: "$289",
      originalPrice: "$349",
      image: shoe1,
      category: "Luxury",
      rating: 4.8,
      badge: "LIMITED",
      featured: true,
      description: "Where Craftsmanship Meets Innovation"
    },
    {
      id: 102,
      name: "DEFY ORDINARY",
      price: "$359",
      originalPrice: "$429",
      image: shoe2,
      category: "Performance",
      rating: 4.9,
      badge: "LIMITED",
      featured: true,
      description: "Redefining Footwear Excellence"
    },
    {
      id: 103,
      name: "TIMELESS ELEGANCE",
      price: "$319",
      originalPrice: "$389",
      image: shoe3,
      category: "Classic",
      rating: 4.7,
      badge: "LIMITED",
      featured: true,
      description: "Heritage Meets Modern Design"
    }
  ];
  
  const features = [
    { icon: <GiDiamondRing />, title: "Handcrafted Luxury", desc: "Each pair meticulously crafted by master artisans" },
    { icon: <FaGem />, title: "Premium Materials", desc: "Only the finest Italian leather & sustainable fabrics" },
    { icon: <FaCrown />, title: "Limited Editions", desc: "Exclusive collections for discerning tastes" },
    { icon: <FaStar />, title: "5-Star Service", desc: "Personalized consultations & VIP treatment" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images.length]);

  // Auto-hide success messages
  useEffect(() => {
    if (showCartSuccess) {
      const timer = setTimeout(() => {
        setShowCartSuccess(false);
        setAddedProduct(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCartSuccess]);

  useEffect(() => {
    if (showSubscribeSuccess) {
      const timer = setTimeout(() => {
        setShowSubscribeSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSubscribeSuccess]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct({ name: product.name, image: product.image });
    setShowCartSuccess(true);
    
    // Optional: Open cart after adding
    // openCart();
    
    console.log(`Added to cart: ${product.name}`);
  };

  const handleQuickView = (productName) => {
    alert(`Quick View: ${productName}\nThis would open a detailed product modal.`);
  };

  const navigateToProducts = () => {
    navigate("/products");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    // Show success message
    setShowSubscribeSuccess(true);
    console.log(`Subscribed email: ${email}`);
    
    // Clear the form
    setEmail("");
  };

  return (
    <div className="home-container" ref={containerRef}>
      
      {/* Cart Success Notification */}
      {showCartSuccess && addedProduct && (
        <div className="cart-success-notification">
          <div className="success-content">
            <FaCheck className="success-icon" />
            <div className="success-details">
              <h4>Successfully Added!</h4>
              <p>{addedProduct.name} has been added to your cart</p>
            </div>
            <button 
              className="close-notification"
              onClick={() => setShowCartSuccess(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Subscribe Success Notification */}
      {showSubscribeSuccess && (
        <div className="subscribe-success-notification">
          <div className="subscribe-success-content">
            <FaCheck className="subscribe-success-icon" />
            <div className="subscribe-success-details">
              <h4>Successfully Subscribed!</h4>
              <p>Welcome to the inner circle. Check your email for exclusive offers.</p>
            </div>
            <button 
              className="close-subscribe-notification"
              onClick={() => setShowSubscribeSuccess(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Luxury Hero Section with Background Slider */}
      <section className="luxury-hero">
        {/* Background Image Slider */}
        <div className="hero-background-slider">
          {images.map((img, index) => (
            <div 
              key={index}
              className={`background-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img 
                src={img} 
                alt={`Slide ${index + 1}`} 
                className="slide-bg-image"
              />
              <div className="slide-overlay-bg"></div>
            </div>
          ))}
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <FaCrown />
            <span>LUXURY FOOTWEAR</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">REDEFINE YOUR</span>
            <span className="title-line highlight">STEPPERIENCE</span>
          </h1>
          
          <p className="hero-subtitle">
            Where every step tells a story of craftsmanship, comfort, and unparalleled style.
          </p>
          
          <div className="hero-cta">
            <button className="cta-primary" onClick={navigateToProducts}>
              EXPLORE COLLECTION <FaArrowRight />
            </button>
          </div>
        </div>
        
        {/* Slider Controls */}
        <div className="slider-controls">
          <button className="slider-control prev" onClick={prevSlide}>
            ‹
          </button>
          <div className="slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <button className="slider-control next" onClick={nextSlide}>
            ›
          </button>
        </div>
      </section>

      {/* Featured Showcase */}
      <section className="showcase-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">01</span>
            CURATED COLLECTIONS
          </h2>
          <p className="section-subtitle">Handpicked excellence for the connoisseur</p>
        </div>

        <div className="showcase-grid">
          {products.map((product, index) => (
            <div className="showcase-card" key={product.id}>
              <div className="card-badge">LIMITED</div>
              <div className="card-image">
                <img src={product.image} alt={product.name} />
                <div className="image-overlay">
                  <button 
                    className="quick-view"
                    onClick={() => handleQuickView(product.name)}
                  >
                    QUICK VIEW
                  </button>
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{product.name}</h3>
                  <button className="wishlist-btn">
                    <FaHeart />
                  </button>
                </div>
                <p className="card-description">
                  {product.description}
                </p>
                <div className="card-footer">
                  <div className="price-tag">
                    <span className="from">FROM</span>
                    <span className="price">{product.price}</span>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Luxury Features */}
      <section className="luxury-features">
        <div className="features-container">
          <div className="features-header">
            <h2>
              <span className="title-number">02</span>
              THE LUXURY DIFFERENCE
            </h2>
            <p>Experience unparalleled quality and service</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <div className="feature-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number" data-count="5000">100</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="150">20</div>
            <div className="stat-label">Design Awards</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="98">100</div>
            <div className="stat-label">% Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="50">30</div>
            <div className="stat-label">Countries Served</div>
          </div>
        </div>
      </section>

      {/* Newsletter - Premium */}
      <section className="premium-newsletter">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>JOIN THE INNER CIRCLE</h2>
            <p>Be the first to access exclusive drops, VIP events, and members-only offers.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-border"></div>
              </div>
              <button type="submit" className="subscribe-btn">
                SUBSCRIBE <FaArrowRight />
              </button>
            </form>
            <p className="privacy-note">By subscribing, you agree to our Privacy Policy</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;