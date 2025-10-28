import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Homepage/Footer";
import "./CSS/car2.css";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function Car2() {
  return (
    <div className="car-detail-container">
      <Link to="/User_Dashboard" className="back-link">← Back to Dashboard</Link>
      
      {/* Car image at the top */}
      <div className="car-image-section">
        <img 
          src="https://i2.wp.com/www.ispravochnik.com/cdn/pictures/1_5ecfd6273fa1a.jpg" 
          alt="BMW 5 Series"
          className="car-image"
        />
      </div>

      {/* Content below the image */}
      <div className="car-content">
        <div className="car-info">
          <h1 className="car-title">BMW 5 Series 2023</h1>
          
          <div className="price-section">
            <div className="price-item">
              <strong>Rental Price:</strong> <span className="rent-price">$120 per day</span>
            </div>
            <div className="price-item">
              <strong>Purchase Price:</strong> <span className="buy-price">$55,000</span>
            </div>
          </div>

          <div className="car-description">
            The BMW 5 Series is a luxury executive sedan that combines exceptional performance with premium comfort. 
            Featuring advanced technology, sophisticated design, and powerful engine options for an unparalleled driving experience.
          </div>

          <div className="features-section">
            <h3 className="section-title">Premium Features</h3>
            <div className="features-grid">
              <div className="feature-item">✓ Leather Upholstery</div>
              <div className="feature-item">✓ Panoramic Sunroof</div>
              <div className="feature-item">✓ Harman Kardon Sound System</div>
              <div className="feature-item">✓ Heads-Up Display</div>
              <div className="feature-item">✓ Adaptive Cruise Control</div>
              <div className="feature-item">✓ Lane Keeping Assist</div>
              <div className="feature-item">✓ Wireless Charging</div>
              <div className="feature-item">✓ Gesture Control</div>
              <div className="feature-item">✓ Heated & Ventilated Seats</div>
              <div className="feature-item">✓ 360° Camera System</div>
              <div className="feature-item">✓ Parking Assistant</div>
              <div className="feature-item">✓ BMW Live Cockpit</div>
            </div>
          </div>
        </div>

        <div className="car-info">
          <div className="features-section">
            <h3 className="section-title">Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Engine:</span>
                <span className="spec-value">3.0L Turbo I6</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Horsepower:</span>
                <span className="spec-value">335 HP</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission:</span>
                <span className="spec-value">8-Speed Automatic</span>
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
                <span className="spec-value">4.9 seconds</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Economy:</span>
                <span className="spec-value">25 MPG Combined</span>
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