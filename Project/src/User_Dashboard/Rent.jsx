import React, { useState, useEffect } from "react";
import Header from "../Admin_Panel/Header";
import { Link } from "react-router-dom";
import rental from "./rental.jpg";
import rental2 from "./rental2.jpg";

// Cars Data
const carsData = [
  { id: 1, name: "Toyota Corolla", price: { rent: "$45/day", buy: "$20,000" }, img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "BMW 5 Series", price: { rent: "$120/day", buy: "$55,000" }, img: "https://i2.wp.com/www.ispravochnik.com/cdn/pictures/1_5ecfd6273fa1a.jpg" },
  { id: 3, name: "Honda Civic", price: { rent: "$50/day", buy: "$22,000" }, img: rental2 },
  { id: 4, name: "Audi A6", price: { rent: "$150/day", buy: "$60,000" }, img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80" },
];

export default function Rent() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("vehicleWishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  const toggleWishlist = (id) => {
    const idStr = id.toString();
    const updated = wishlist.includes(idStr)
      ? wishlist.filter((i) => i !== idStr)
      : [...wishlist, idStr];
    setWishlist(updated);
    localStorage.setItem("vehicleWishlist", JSON.stringify(updated));
  };

  const isInWishlist = (id) => wishlist.includes(id.toString());

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />

      
      {/* Hero Section */}
      <section
        className="relative h-[25rem] flex items-center justify-center"
        style={{
          backgroundImage: `url(${rental})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Rent a Car</h1>
          <p className="mt-4 text-lg md:text-xl">
            Choose from our collection of top-rated rental cars.
          </p>
        </div>
      </section>

      {/* Rent Cars Section */}
      <section className="py-16 px-6 sm:px-12 md:px-20 bg-gray-400">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Available for Rent
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {carsData.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-2xl transition"
            >
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(car.id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-2xl"
                title={isInWishlist(car.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isInWishlist(car.id) ? "❤" : "🤍"}
              </button>

              <img src={car.img} alt={car.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-gray-600 mb-4">Rent: {car.price.rent}</p>

                <div className="flex gap-3">
                  <Link to="/booking" className="flex-1">
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition">
                      Rent
                    </button>
                  </Link>
                  <Link to={`/car/${car.id}`} className="flex-1">
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-center text-white px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Rent Your Dream Car Today
        </h2>
        <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto">
            Experience the thrill of driving premium cars without the commitment of ownership. Choose from our handpicked selection of vehicles and enjoy a seamless rental experience for any occasion — short trips, weekend getaways, or just for fun.
        </p>
        <Link to="/Wishlist">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-xl text-lg transition-shadow shadow-lg hover:shadow-xl">
            Your Wishlist Awaits
            </button>
        </Link>
        </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center">
        © {new Date().getFullYear()} CarRentPro. All rights reserved.
      </footer>
    </div>
  );
}
