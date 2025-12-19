import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RelatedProducts.css";

const RelatedRentVehicles = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch RENT vehicles
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product/get");
        if (!res.ok) throw new Error("Failed to fetch cars");

        const data = await res.json();

        // 🔹 ONLY RENT VEHICLES
        const rentCars = data
          .filter((car) => car.adType === "rent")
          .slice(0, 6); // limit

        setCars(rentCars);
      } catch (err) {
        console.error("Error fetching rent vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Navigate to Rent Details Page
  const handleItemClick = (car) => {
    navigate("/rentdetails", {
      state: {
        carData: {
          carId: car._id,
          brand: car.brand,
          year: car.year,
          fuel: car.fuel,
          transmission: car.transmission,
          kmsDriven: car.kmsDriven,
          noOfOwners: car.noOfOwners,
          price: car.price,
          adTitle: car.adTitle,
          description: car.description,
          photos: car.photos,
          state: car.state,
          ownerEmail: car.email,
          phoneNumber: car.mobilePhone,
          adType: car.adType,
        },
      },
    });

    window.scrollTo(0, 0);
  };

  if (loading) return <p className="text-center">Loading rental vehicles...</p>;

  return (
    <div className="relatedproducts">
      <h2 className="relatedproducts-title">Related Rental Vehicles</h2>
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
              alt={car.brand}
              className="item-image"
            />

            <h3 className="item-name">
              {car.brand} ({car.year})
            </h3>

            <p className="item-price rent-price">
              Rent: ₹{car.price}/day
            </p>

            <p className="item-meta">
              {car.fuel} • {car.transmission}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedRentVehicles;