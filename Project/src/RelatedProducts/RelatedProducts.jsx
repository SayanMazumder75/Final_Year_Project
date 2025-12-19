import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RelatedProducts.css";

const RelatedProducts = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetched cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product/get");
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();

        // Only show cars available for selling (Buy)
        const relatedCars = data
          .filter((car) => car.adType === "sell")
          .slice(0, 6); //suggestions limit right here

        setCars(relatedCars);
      } catch (err) {
        console.error("Error fetching related cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Navigate to BuyDetails page with state
  const handleItemClick = (car) => {
    navigate("/buydetails", {
      state: {
        carData: {
          name: car.brand || car.title,
          price: car.price,
          ownerEmail: car.owner?.email || car.email || "",
          description: car.description,
          adTitle: car.adTitle,
          carId: car._id,
          brand: car.brand,
          year: car.year,
          fuel: car.fuel,
          transmission: car.transmission,
          kmsDriven: car.kmsDriven,
          noOfOwners: car.noOfOwners,
          photos: car.photos,
          state: car.state,
          phoneNumber: car.phoneNumber,
        },
      },
    });

    window.scrollTo(0, 0);
  };

  if (loading) return <p className="text-center">Loading related vehicles...</p>;

  return (
    <div className="relatedproducts">
      <h2 className="relatedproducts-title">Related Vehicles</h2>
      <hr className="relatedproducts-divider" />

      <div className="relatedproducts-item">
        {cars.map((car) => (
          <div
            key={car._id}
            className="related-item clickable-item"
            onClick={() => handleItemClick(car)}
          >
            <img
              src={car.photos?.[0] || "https://via.placeholder.com/300"}
              alt={car.brand || car.title}
              className="item-image"
            />
            <h3 className="item-name">{car.brand || car.title}</h3>
            <p className="item-price buy-price">Buy: ₹{car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default RelatedProducts;
