import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./homepage.css";
import car1 from "/src/assets/Car5.jpg";
import car2 from "/src/assets/Car8.jpg";
import car3 from "/src/assets/Car6.jpg";

function Homepage() {
  const images = [car1, car2, car3];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [images.length]);
  
  const goToAdminPanel = () => {
    navigate("/admin/dashboard");
  };


  return (
      <div className="homepage">
        <header className="header">
          <div className="logo">LOGO</div>
          <div className="app-name">APP NAME</div>
          <nav className="nav">
            <a href="#">LOG IN</a>
            <a href="#">HOME</a>
          </nav>
        </header>

      <main className="main-content">
        <div className="slider">
          <img src={images[index]} alt="Car" className="car-image" />
        </div>

      <div className="info-section">
        <div className="info-card">
          <h3>Who We Are</h3>
            <p>
                 Since our founding in 2010, we’ve helped over <strong>15,000 customers</strong> find their dream cars across India.What started as a small showroom has now grown into a full-service dealership offering luxury vehicles, expert maintenance,and trusted resale services. Our mission is to bring high-performance vehicles to enthusiasts and first-time buyers alike,with full transparency and a customer-first approach.
            </p>
        </div>

  <div className="info-card">
    <h3>Successful Deals</h3>
    <p>
      ⭐️⭐️⭐️⭐️⭐️ “I bought a used BMW M4 and the experience was exceptional — transparent, fast, and professional.
      The vehicle quality and customer support exceeded expectations.”  
      <br />— <i>Rajeev T., Bangalore</i>
    </p>
  </div>
</div>

<div class="review-section">
  <h3>Customer Reviews</h3>
  <div class="review-cards">
    <div class="review-card">
      <p>“Fantastic service and great selection of cars! Highly recommend.”</p>
      <small>- Anjali S.</small>
    </div>
    <div class="review-card">
      <p>“Professional team, helped me find the perfect car quickly.”</p>
      <small>- Rohit K.</small>
    </div>
    <div class="review-card">
      <p>“Smooth buying process with full transparency. Love my new ride!”</p>
      <small>- Priya M.</small>
    </div>
  </div>
</div>        
{/* 🟢 Button to navigate to Admin Panel */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button onClick={goToAdminPanel} className="admin-button">
            Go to Admin Panel
          </button>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
