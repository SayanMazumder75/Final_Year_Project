import React, { useState, useEffect } from "react";
import Header from "../../Admin_Panel/Header";
import { useNavigate } from "react-router-dom";

const RentWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("vehicleWishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const allVehicles = [
    // Only rent vehicles
    {
      id: 1,
      name: "Toyota Corolla",
      price: { rent: "$45/day" },
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "BMW 5 Series",
      price: { rent: "$120/day" },
      img: "https://i2.wp.com/www.ispravochnik.com/cdn/pictures/1_5ecfd6273fa1a.jpg",
    },
    {
      id: 3,
      name: "Honda Civic",
      price: { rent: "$50/day" },
      img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Audi A6",
      price: { rent: "$150/day" },
      img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const rentCars = allVehicles.filter((v) => wishlist.includes(v.id.toString()));

  const handleRent = (car) => {
    localStorage.setItem('selectedCar', JSON.stringify(car));
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Rent Wishlist</h1>
          <span className="text-gray-600">
            {rentCars.length} {rentCars.length === 1 ? 'car' : 'cars'}
          </span>
        </div>

        {rentCars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔑</div>
            <p className="text-gray-600 text-lg mb-4">No cars in your Rent Wishlist</p>
            <p className="text-gray-500">Add some cars you'd like to rent to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img src={car.img} alt={car.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <p className="text-yellow-600 font-semibold mb-4">Rent: {car.price.rent}</p>
                  <button 
                    onClick={() => handleRent(car)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg transition"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentWishlist;