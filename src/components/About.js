import React, { useEffect } from "react";
import "../Styles/About.css";
import shoeLogo from "../Images/shoes.png";
import shoesBackground from "../Images/Shoes4.png";
import { FaShoePrints, FaStore, FaUsers, FaBolt } from "react-icons/fa";

function About() {
  // Create floating particles effect
  useEffect(() => {
    const createParticles = () => {
      const container = document.querySelector('.about-container');
      if (!container) return;
      
      // Clear existing particles
      const existingParticles = document.querySelectorAll('.particle');
      existingParticles.forEach(p => p.remove());
      
      // Create new particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and position
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}vw`;
        particle.style.top = `${top}vh`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Random color variation
        const goldVariation = Math.random() > 0.5 ? '#FFD700' : '#D4AF37';
        particle.style.backgroundColor = goldVariation;
        
        const particlesContainer = document.querySelector('.particles-container');
        if (particlesContainer) {
          particlesContainer.appendChild(particle);
        }
      }
    };
    
    createParticles();
    window.addEventListener('resize', createParticles);
    
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  return (
    <div className="about-container">
      {/* Background Image Section */}
      <div className="background-image-container">
        <img 
          src={shoesBackground} 
          alt="Luxury Shoes Background" 
          className="background-image"
        />
        <div className="background-overlay"></div>
      </div>
      
      {/* Floating particles container */}
      <div className="particles-container"></div>
      
      {/* Logo Section */}
      <div className="about-logo-section">
        <img 
          src={shoeLogo}
          alt="STEPPERIENCE Logo"
          className="about-logo"
        />
        <div className="logo-glow"></div>
      </div>

      {/* About Content */}
      <div className="about-content">
        <div className="content-border-glow"></div>
        <p className="fade-in-text">
          Welcome to <strong>STEPPERIENCE</strong>, where luxury meets craftsmanship. 
          We are dedicated to providing premium footwear that combines Italian design 
          with cutting-edge technology. Each pair is meticulously crafted for those 
          who appreciate the finer things in life.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="about-features">
        <div className="feature-card">
          <div className="card-glow"></div>
          <FaStore className="feature-icon" />
          <h3>Artisan Quality</h3>
          <p>Handcrafted shoes using premium Italian leather and materials.</p>
          <div className="card-decoration-line"></div>
        </div>

        <div className="feature-card">
          <div className="card-glow"></div>
          <FaBolt className="feature-icon" />
          <h3>Expedited Delivery</h3>
          <p>Worldwide express shipping with premium packaging and handling.</p>
          <div className="card-decoration-line"></div>
        </div>

        <div className="feature-card">
          <div className="card-glow"></div>
          <FaUsers className="feature-icon" />
          <h3>Elite Clientele</h3>
          <p>Trusted by fashion connoisseurs and luxury enthusiasts worldwide.</p>
          <div className="card-decoration-line"></div>
        </div>

        <div className="feature-card">
          <div className="card-glow"></div>
          <FaShoePrints className="feature-icon" />
          <h3>Bespoke Designs</h3>
          <p>Customizable options for truly unique, personalized footwear.</p>
          <div className="card-decoration-line"></div>
        </div>
      </div>

      {/* Mission + Vision */}
      <div className="about-mission">
        <div className="mission-decoration">
          <div className="decoration-line line-1"></div>
          <div className="decoration-line line-2"></div>
          <div className="decoration-line line-3"></div>
        </div>
        
        <h2 className="mission-title">
          <span className="title-number">01</span>
          Our Mission
        </h2>
        <p className="mission-text">
          To redefine luxury footwear by combining timeless elegance with 
          innovative design. We strive to create pieces that aren't just worn, 
          but experienced—where every step tells a story of craftsmanship 
          and sophistication.
        </p>

        <h2 className="vision-title">
          <span className="title-number">02</span>
          Our Vision
        </h2>
        <p className="vision-text">
          To become the world's most coveted footwear brand, setting new 
          standards in luxury fashion. We envision a future where STEPPERIENCE 
          is synonymous with unparalleled quality, exclusivity, and 
          groundbreaking design innovation.
        </p>
      </div>

      {/* Luxury Footer */}
      <div className="luxury-footer">
        <div className="footer-line"></div>
        <p className="footer-signature">
          Crafted with Excellence • Since 2024
        </p>
        <div className="footer-dots">
          <span className="gold-dot"></span>
          <span className="gold-dot"></span>
          <span className="gold-dot"></span>
        </div>
      </div>
    </div>
  );
}

export default About;
