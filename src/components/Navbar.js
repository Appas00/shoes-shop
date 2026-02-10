import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/Navbar.css";
import shoeIcon from "../Images/shoes.png"; // Import your shoe icon

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Collection" },
    { path: "/about", label: "Heritage" }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        
        {/* Brand Logo with LARGE Shoe Icon */}
        <div className="brand-container">
          <img 
            src={shoeIcon} 
            alt="Stepperience Logo" 
            className="brand-logo-icon"
          />
          <h2>STEPPERIENCE</h2>
        </div>

        {/* Desktop Navigation */}
        <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
              style={{ "--link-index": index }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      {/* Scroll Indicator (Optional) */}
      <div className="nav-indicator">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`indicator-dot ${location.pathname === item.path ? "active" : ""}`}
            title={item.label}
          />
        ))}
      </div>
    </>
  );
}

export default Navbar;