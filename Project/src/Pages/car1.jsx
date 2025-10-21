import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Homepage/Footer";
import "./CSS/car1.css";
import RelatedProducts from '../RelatedProducts/RelatedProducts';

export default function Car1() {
  return (
    <div className="car-detail-container">
      <Link to="/User_Dashboard" className="back-link">← Back to Dashboard</Link>
      
      {/* Car image at the top */}
      <div className="car-image-section">
        <img 
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80" 
          alt="Toyota Corolla"
          className="car-image"
        />
      </div>

      {/* Content below the image */}
      <div className="car-content">
        <div className="car-info">
          <h1 className="car-title">Toyota Corolla 2023</h1>
          
          <div className="price-section">
            <div className="price-item">
              <strong>Rental Price:</strong> <span className="rent-price">$45 per day</span>
            </div>
            <div className="price-item">
              <strong>Purchase Price:</strong> <span className="buy-price">$20,000</span>
            </div>
          </div>

          <div className="car-description">
            The Toyota Corolla is a reliable and fuel-efficient compact sedan perfect for daily commuting and long trips. 
            Known for its excellent fuel economy, comfortable interior, and advanced safety features.
          </div>

          <div className="features-section">
            <h3 className="section-title">Key Features</h3>
            <div className="features-grid">
              <div className="feature-item">✓ GPS Navigation System</div>
              <div className="feature-item">✓ Bluetooth Connectivity</div>
              <div className="feature-item">✓ Automatic Climate Control</div>
              <div className="feature-item">✓ Rearview Camera</div>
              <div className="feature-item">✓ Cruise Control</div>
              <div className="feature-item">✓ Lane Departure Warning</div>
              <div className="feature-item">✓ Apple CarPlay/Android Auto</div>
              <div className="feature-item">✓ Keyless Entry</div>
            </div>
          </div>
        </div>

        <div className="car-info">
          <div className="features-section">
            <h3 className="section-title">Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Engine:</span>
                <span className="spec-value">1.8L 4-Cylinder</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Horsepower:</span>
                <span className="spec-value">139 HP</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission:</span>
                <span className="spec-value">CVT Automatic</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Seating Capacity:</span>
                <span className="spec-value">5 Persons</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Type:</span>
                <span className="spec-value">Regular Gasoline</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Economy:</span>
                <span className="spec-value">32 MPG Combined</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/booking" className="action-btn rent-btn">
              Rent This Car
            </Link>
            <Link to="/buying" className="action-btn buy-btn">
              Buy This Car
            </Link>
          </div>
        </div>
      </div>
      {/* ADD RELATED PRODUCTS HERE - Right before Footer */}
      <div className="related-products-section">
        <RelatedProducts />
      </div>
      <Footer />
    </div>
  );
}