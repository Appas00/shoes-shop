import React from "react";
import "../Styles/About.css";
import shoeLogo from "../Images/shoes.png";

import { FaShoePrints, FaStore, FaUsers, FaBolt } from "react-icons/fa";

function About() {
  return (
    <div className="about-container">
      
      {/* Logo Section */}
    <div className="about-logo-section">
    <img 
        src={shoeLogo}
        alt="logo"
        className="about-logo"
    />
    </div>


      {/* About Content */}
      <div className="about-content">
        <p>
          Welcome to <strong>STEPPERIENCE</strong>, your one-stop destination for premium 
          branded shoes. We deliver top-quality footwear with modern designs, 
          ultimate comfort, and unbeatable style.  
          Our goal is to make every step you take more stylish and comfortable.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="about-features">

        <div className="feature-card">
          <FaStore className="feature-icon" />
          <h3>Premium Quality</h3>
          <p>We bring you top-notch shoes chosen for durability and style.</p>
        </div>

        <div className="feature-card">
          <FaBolt className="feature-icon" />
          <h3>Fast Delivery</h3>
          <p>Get your favourite shoes delivered quickly and safely.</p>
        </div>

        <div className="feature-card">
          <FaUsers className="feature-icon" />
          <h3>Trusted by Thousands</h3>
          <p>A large community of happy customers trust us every day.</p>
        </div>

        <div className="feature-card">
          <FaShoePrints className="feature-icon" />
          <h3>Stylish Designs</h3>
          <p>Trendy, comfortable, and designed for everyday wear.</p>
        </div>

      </div>

      {/* Mission + Vision */}
      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To offer high-quality footwear that blends comfort and fashion, 
          making every customer feel confident with every step.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become the most trusted online shoe store with exclusive collections 
          and a seamless shopping experience.
        </p>
      </div>

    </div>
  );
}

export default About;
