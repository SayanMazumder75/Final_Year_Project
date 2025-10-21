import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Homepage/Footer";
import "./CSS/car5.css";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function Car5() {
  return (
    <div className="car-detail-container">
      <Link to="/User_Dashboard" className="back-link">← Back to Dashboard</Link>
      
      {/* Car image at the top */}
      <div className="car-image-section">
        <img 
          src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80" 
          alt="Mercedes C-Class"
          className="car-image"
        />
      </div>

      {/* Content below the image */}
      <div className="car-content">
        <div className="car-info">
          <h1 className="car-title">Mercedes-Benz C-Class 2023</h1>
          
          <div className="price-section">
            <div className="price-item">
              <strong>Rental Price:</strong> <span className="rent-price">$160 per day</span>
            </div>
            <div className="price-item">
              <strong>Purchase Price:</strong> <span className="buy-price">$65,000</span>
            </div>
          </div>

          <div className="car-description">
            The Mercedes-Benz C-Class epitomizes luxury and sophistication with its elegant design, premium comfort, and cutting-edge technology. 
            Experience the perfect blend of performance, comfort, and advanced features that define the Mercedes-Benz legacy.
          </div>

          <div className="features-section">
            <h3 className="section-title">Premium Features</h3>
            <div className="features-grid">
              <div className="feature-item">✓ MBUX Infotainment System</div>
              <div className="feature-item">✓ Ambient Lighting</div>
              <div className="feature-item">✓ Leather Upholstery</div>
              <div className="feature-item">✓ Panoramic Sunroof</div>
              <div className="feature-item">✓ Burmester Sound System</div>
              <div className="feature-item">✓ Digital Instrument Cluster</div>
              <div className="feature-item">✓ Heated & Ventilated Seats</div>
              <div className="feature-item">✓ Memory Seats</div>
              <div className="feature-item">✓ Wireless Charging</div>
              <div className="feature-item">✓ 360° Camera</div>
              <div className="feature-item">✓ Distronic Plus</div>
              <div className="feature-item">✓ Active Parking Assist</div>
            </div>
          </div>
        </div>

        <div className="car-info">
          <div className="features-section">
            <h3 className="section-title">Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Engine:</span>
                <span className="spec-value">2.0L Turbo I4</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Horsepower:</span>
                <span className="spec-value">255 HP</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission:</span>
                <span className="spec-value">9-Speed Automatic</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Drivetrain:</span>
                <span className="spec-value">Rear-Wheel Drive</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Seating Capacity:</span>
                <span className="spec-value">5 Persons</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Type:</span>
                <span className="spec-value">Premium Gasoline</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">0-60 mph:</span>
                <span className="spec-value">5.7 seconds</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Economy:</span>
                <span className="spec-value">26 MPG Combined</span>
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