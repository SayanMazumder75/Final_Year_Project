import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedProducts.css';

const relatedCars = [
    {
        id: 2,
        name: "BMW 5 Series",
        image: "https://i2.wp.com/www.ispravochnik.com/cdn/pictures/1_5ecfd6273fa1a.jpg",
        rent_price: 120,
        buy_price: "55,000"
    },
    {
        id: 3,
        name: "Honda Civic",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
        rent_price: 50,
        buy_price: "22,000"
    },
    {
        id: 4,
        name: "Audi A6",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
        rent_price: 150,
        buy_price: "60,000"
    }
];

const RelatedProducts = () => {
  const navigate = useNavigate();

  const handleItemClick = (carId) => {
    console.log("Navigating to car:", carId); // Debug log
    navigate(`/car/${carId}`);
    // Scroll to top after navigation (optional)
    window.scrollTo(0, 0);
  };

  return (
    <div className='relatedproducts'>
        <h2 className="relatedproducts-title">Related Vehicles</h2>
        <hr className="relatedproducts-divider" />
        <div className="relatedproducts-item">
            {relatedCars.map((item, i) => {
                return (
                  <div 
                    key={i} 
                    className="related-item clickable-item"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <img src={item.image} alt={item.name} className="item-image" />
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price rent-price">Rent: ${item.rent_price}/day</p>
                    <p className="item-price buy-price">Buy: ${item.buy_price}</p>
                  </div>
                )
            })}
        </div>
    </div>
  );
}

export default RelatedProducts;