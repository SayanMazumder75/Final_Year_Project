import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Homepage/Footer";
import "./CSS/car4.css";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function Car4() {
  return (
    <div className="car-detail-container">
      <Link to="/User_Dashboard" className="back-link">← Back to Dashboard</Link>
      
      {/* Car image at the top */}
      <div className="car-image-section">
        <img 
          src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80" 
          alt="Audi A6"
          className="car-image"
        />
      </div>

      {/* Content below the image */}
      <div className="car-content">
        <div className="car-info">
          <h1 className="car-title">Audi A6 2023</h1>
          
          <div className="price-section">
            <div className="price-item">
              <strong>Rental Price:</strong> <span className="rent-price">$150 per day</span>
            </div>
            <div className="price-item">
              <strong>Purchase Price:</strong> <span className="buy-price">$60,000</span>
            </div>
          </div>

          <div className="car-description">
            The Audi A6 represents the pinnacle of German engineering, combining sophisticated luxury with cutting-edge technology. 
            Featuring legendary Quattro all-wheel drive, a premium interior, and advanced driver assistance systems for an exceptional driving experience.
          </div>

          <div className="features-section">
            <h3 className="section-title">Luxury Features</h3>
            <div className="features-grid">
              <div className="feature-item">✓ Audi Virtual Cockpit</div>
              <div className="feature-item">✓ Quattro All-Wheel Drive</div>
              <div className="feature-item">✓ Leather Upholstery</div>
              <div className="feature-item">✓ Panoramic Sunroof</div>
              <div className="feature-item">✓ Bang & Olufsen Sound</div>
              <div className="feature-item">✓ Heads-Up Display</div>
              <div className="feature-item">✓ Adaptive Air Suspension</div>
              <div className="feature-item">✓ Matrix LED Headlights</div>
              <div className="feature-item">✓ Heated & Ventilated Seats</div>
              <div className="feature-item">✓ 360° Camera System</div>
              <div className="feature-item">✓ Wireless Apple CarPlay</div>
              <div className="feature-item">✓ Park Assist</div>
            </div>
          </div>
        </div>

        <div className="car-info">
          <div className="features-section">
            <h3 className="section-title">Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Engine:</span>
                <span className="spec-value">3.0L Turbo V6</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Horsepower:</span>
                <span className="spec-value">335 HP</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission:</span>
                <span className="spec-value">7-Speed S tronic</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Drivetrain:</span>
                <span className="spec-value">Quattro AWD</span>
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
                <span className="spec-value">5.1 seconds</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Fuel Economy:</span>
                <span className="spec-value">24 MPG Combined</span>
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