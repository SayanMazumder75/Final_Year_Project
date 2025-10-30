import React, { useState, useEffect } from "react";
import Header from "../Admin_Panel/Header";
import { Link } from "react-router-dom";
import rental2 from "./rental2.jpg";

export default function Rent() {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("vehicleWishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Fetch rent cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product/get");
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        // Filter only cars for rent
        const rentCars = data.filter((car) => car.adType === "rent");
        setCars(rentCars);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Toggle wishlist
  const toggleWishlist = (id) => {
    const idStr = id.toString();
    const updated = wishlist.includes(idStr)
      ? wishlist.filter((i) => i !== idStr)
      : [...wishlist, idStr];
    setWishlist(updated);
    localStorage.setItem("vehicleWishlist", JSON.stringify(updated));
  };

  const isInWishlist = (id) => wishlist.includes(id.toString());

  if (loading) return <p className="text-center mt-10">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[25rem] flex items-center justify-center"
        style={{
          backgroundImage: `url(${rental2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Rent a Car</h1>
          <p className="mt-4 text-lg md:text-xl">
            Drive your dream car without the commitment of ownership.
          </p>
        </div>
      </section>

      {/* Rent Cars Section */}
      <section className="py-16 px-6 sm:px-12 md:px-20 bg-gray-400">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Available for Rent
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-2xl transition"
            >
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(car._id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-2xl"
              >
                {isInWishlist(car._id) ? "❤" : "🤍"}
              </button>

              {/* Car Image */}
              <img
                src={car.photos && car.photos[0]}
                alt={car.brand || car.title}
                className="w-full h-56 object-cover"
              />

              {/* Car Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold">{car.brand || car.title}</h3>
                <p className="text-gray-600 mb-4">Rent: ₹{car.price}</p>
                <p className="text-gray-600 mb-4">gmail: {car.email}</p>

                <div className="flex gap-3">
                  <Link
                    to="/booking"
                    state={{
                      carData: {
                        name: car.brand || car.title,
                        price: car.price,
                        ownerEmail: car.email || car.ownerEmail || "",
                        carId: car._id,
                      },
                    }}
                    className="flex-1"
                  >

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                      Rent
                    </button>
                  </Link>

                  <Link
                    to="/details"
                    state={{
                      carData: {
                        name: car.brand || car.title,
                        price: car.price,
                        ownerEmail: car.owner?.email || "",
                        description: car.description,
                        adTitle: car.adTitle,   // Add this line
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
                    }}
                    className="flex-1"
                  >
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
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
          Experience the thrill of driving premium cars without the commitment
          of ownership. Choose from our handpicked selection of vehicles and
          enjoy a seamless rental experience for any occasion — short trips,
          weekend getaways, or just for fun.
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
