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
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to checkout
    alert(`Proceeding to checkout. Total: ₹${cartTotal.toFixed(2)}`);
    closeCart();
  };

  const formatPrice = (priceString) => {
    // Remove any non-numeric characters except decimal point
    const price = parseFloat(priceString.replace(/[^0-9.]/g, ''));
    return price.toFixed(2);
  };

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return (price * item.quantity).toFixed(2);
  };

  // Format currency in Indian style with commas
  const formatIndianCurrency = (amount) => {
    return '₹' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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

  return (
    <>
      {/* Cart Icon Button */}
      <button 
        className="cart-icon-btn"
        onClick={toggleCart}
        onAnimationEnd={() => setIsAnimating(false)}
        data-count={itemCount}
      >
        <FaShoppingCart />
      </button>

      {/* Cart Overlay */}
      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={closeCart}></div>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
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
            <p>Add some premium shoes to get started</p>
            <button className="continue-shopping" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{formatIndianPrice(item.price)}</p>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="quantity-btn"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="quantity-btn"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="cart-item-total">
                      Total: {formatIndianItemTotal(item)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatIndianCurrency(cartTotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatIndianCurrency(cartTotal)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
                <button className="continue-shopping-btn" onClick={closeCart}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddToCart;