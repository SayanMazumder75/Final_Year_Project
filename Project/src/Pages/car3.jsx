import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Homepage/Footer";
import "./CSS/car3.css";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function Car3() {
  return (
    <div className="car-detail-container">
      <Link to="/User_Dashboard" className="back-link">← Back to Dashboard</Link>
      
      {/* Car image at the top */}
      <div className="car-image-section">
        <img 
          src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80" 
          alt="Honda Civic"
          className="car-image"
        />
      </div>

      {/* Content below the image */}
      <div className="car-content">
        <div className="car-info">
          <h1 className="car-title">Honda Civic 2023</h1>
          
          <div className="price-section">
            <div className="price-item">
              <strong>Rental Price:</strong> <span className="rent-price">$50 per day</span>
            </div>
            <div className="price-item">
              <strong>Purchase Price:</strong> <span className="buy-price">$22,000</span>
            </div>
          </div>

          <div className="car-description">
            The Honda Civic combines sporty styling with exceptional efficiency and modern technology. 
            Known for its reliability, comfortable ride, and advanced safety features, it's the perfect choice for daily commuting and weekend adventures.
          </div>

          <div className="features-section">
            <h3 className="section-title">Advanced Features</h3>
            <div className="features-grid">
              <div className="feature-item">✓ Apple CarPlay & Android Auto</div>
              <div className="feature-item">✓ Honda Sensing® Safety Suite</div>
              <div className="feature-item">✓ LED Headlights</div>
              <div className="feature-item">✓ Wireless Phone Charger</div>
              <div className="feature-item">✓ Adaptive Cruise Control</div>
              <div className="feature-item">✓ Lane Keeping Assist</div>
              <div className="feature-item">✓ Dual-Zone Climate Control</div>
              <div className="feature-item">✓ 7-inch Digital Display</div>
              <div className="feature-item">✓ Remote Engine Start</div>
              <div className="feature-item">✓ Heated Front Seats</div>
              <div className="feature-item">✓ Blind Spot Information</div>
              <div className="feature-item">✓ Multi-Angle Rearview Camera</div>
            </div>
          </div>
        </div>

        <div className="car-info">
          <div className="features-section">
            <h3 className="section-title">Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Engine:</span>
                <span className="spec-value">2.0L 4-Cylinder</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Horsepower:</span>
                <span className="spec-value">158 HP</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission:</span>
                <span className="spec-value">CVT Automatic</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Drivetrain:</span>
                <span className="spec-value">Front-Wheel Drive</span>
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
                <span className="spec-value">36 MPG Combined</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Cargo Space:</span>
                <span className="spec-value">14.8 cu ft</span>
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
       <div className="related-products-section">
        <RelatedProducts />
      </div>
      <Footer/>
    </div>
  );
}