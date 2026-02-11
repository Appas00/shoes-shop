import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/Footer.css";
import { FaLinkedin, FaGithub, FaInstagram, FaArrowRight, FaArrowUp } from "react-icons/fa";

function Footer() {
    const currentYear = new Date().getFullYear();
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Handle back to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle back to top click
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    
                    {/* Footer Main Content */}
                    <div className="footer-content">
                        
                        {/* Brand Section */}
                        <div className="footer-brand">
                            <h2 className="footer-logo">STEPPERIENCE</h2>
                            <p className="footer-tagline">
                                Where every step defines your journey. 
                                Experience premium footwear crafted for the extraordinary.
                            </p>
                            <div className="social-links">
                                <a 
                                    href="https://www.linkedin.com/in/appas-m-55bb05294/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin />
                                </a>
                                <a 
                                    href="https://github.com/Appas00" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="GitHub"
                                >
                                    <FaGithub />
                                </a>
                                <a 
                                    href="https://www.instagram.com/mr_appass/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h3 className="footer-heading">Navigation</h3>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/" className="footer-link">Home</Link>
                                </li>
                                <li>
                                    <Link to="/products" className="footer-link">Collection</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="footer-link">Heritage</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Information */}
                        <div className="footer-section">
                            <h3 className="footer-heading">Information</h3>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="footer-link">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link to="/shipping" className="footer-link">Shipping & Returns</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="footer-link">Contact Us</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="footer-section">
                            <h3 className="footer-heading">Stay Updated</h3>
                            <p className="footer-text">
                                Subscribe to receive exclusive offers and latest collections
                            </p>
                            <form className="newsletter-form" onSubmit={(e) => {
                                e.preventDefault();
                                // Handle newsletter subscription
                                alert('Thank you for subscribing!');
                                e.target.reset();
                            }}>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="newsletter-input"
                                    required
                                />
                                <button type="submit" className="newsletter-btn">
                                    <FaArrowRight />
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        
                        {/* Copyright */}
                        <div className="copyright">
                            © {currentYear} STEPPERIENCE. All rights reserved.
                        </div>

                        {/* Portfolio Link */}
                        <div className="portfolio-section">
                            <span className="portfolio-text">Crafted with passion by</span>
                            <a 
                                href="http://appas05portfolio.great-site.net/?i=1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="portfolio-link"
                            >
                                APPAS
                            </a>
                        </div>

                        {/* Additional Links */}
                        <div className="legal-links">
                            <Link to="/sitemap" className="legal-link">Sitemap</Link>
                            <span className="separator">•</span>
                            <Link to="/cookies" className="legal-link">Cookies</Link>
                            <span className="separator">•</span>
                            <Link to="/accessibility" className="legal-link">Accessibility</Link>
                        </div>

                    </div>

                </div>
            </footer>

            {/* Back to Top Button */}
            <button 
                className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <FaArrowUp />
            </button>
        </>
    );
}

export default Footer;
