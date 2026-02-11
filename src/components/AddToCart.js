import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../Styles/AddToCart.css';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const AddToCart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    closeCart, 
    updateQuantity, 
    removeFromCart,
    cartTotal,
    itemCount
  } = useCart();

  const [isAnimating, setIsAnimating] = useState(false);

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      } else {
        removeFromCart(productId);
      }
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout. Total: ₹${cartTotal.toFixed(2)}`);
    closeCart();
  };

  // Format individual price in Indian style
  const formatIndianPrice = (priceString) => {
    const price = parseFloat(priceString.replace(/[^0-9.]/g, ''));
    return '₹' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  // Format item total in Indian style
  const formatIndianItemTotal = (item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    const total = price * item.quantity;
    return '₹' + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  // Format currency in Indian style with commas
  const formatIndianCurrency = (amount) => {
    return '₹' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  // Get total number of items in cart
  const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* Cart Icon Button - This will float on all pages */}
      <button 
        className={`cart-icon-btn ${totalItemCount > 0 ? 'has-items' : ''}`}
        onClick={toggleCart}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        <FaShoppingCart />
        {totalItemCount > 0 && (
          <span className="cart-count-badge">{totalItemCount}</span>
        )}
      </button>

      {/* Cart Overlay */}
      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={closeCart}></div>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>
            Your Shopping Cart
            {totalItemCount > 0 && ` (${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'})`}
          </h2>
          <button className="close-cart" onClick={closeCart}>
            <FaTimes />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingCart />
            </div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items yet</p>
            <button className="continue-shopping" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.quantity}`} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-content">
                      <div className="cart-item-header">
                        <h4 className="cart-item-title">{item.name}</h4>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="remove-item-btn"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      
                      <div className="cart-item-price-row">
                        <span className="cart-item-unit-price">
                          {formatIndianPrice(item.price)} each
                        </span>
                        <span className="cart-item-total">
                          {formatIndianItemTotal(item)}
                        </span>
                      </div>
                      
                      <div className="cart-item-controls">
                        <div className="quantity-selector">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="quantity-btn minus"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="quantity-btn plus"
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatIndianCurrency(cartTotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                <div className="summary-row tax-row">
                  <span>Estimated Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span className="total-amount">{formatIndianCurrency(cartTotal)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button 
                  className="checkout-btn" 
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout ({formatIndianCurrency(cartTotal)})
                </button>
                <button className="continue-shopping-btn" onClick={closeCart}>
                  Continue Shopping
                </button>
              </div>
              
              <div className="cart-security-notice">
                <p>✅ Secure checkout • 30-day return policy • Free shipping</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddToCart;
