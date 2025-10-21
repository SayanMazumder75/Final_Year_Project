import React, { useState, useEffect } from "react";
import Header from "../Admin_Panel/Header";
import rental from "./rental.jpg";
import rental2 from "./rental2.jpg";
import { Link } from "react-router-dom";

// Cars Data
const carsData = [
  {
    id: 1,
    name: "Toyota Corolla",
    price: { rent: "$45/day", buy: "$20,000" },
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "BMW 5 Series",
    price: { rent: "$120/day", buy: "$55,000" },
    img: "https://i2.wp.com/www.ispravochnik.com/cdn/pictures/1_5ecfd6273fa1a.jpg",
  },
  {
    id: 3,
    name: "Honda Civic",
    price: { rent: "$50/day", buy: "$22,000" },
    img: rental2,
  },
  {
    id: 4,
    name: "Audi A6",
    price: { rent: "$150/day", buy: "$60,000" },
    img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Mercedes C-Class",
    price: { rent: "$160/day", buy: "$65,000" },
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80",
  },
];

export default function User_Dashboard() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("vehicleWishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Toggle wishlist items
  const toggleWishlist = (vehicleId) => {
    const idStr = vehicleId.toString();
    let updatedWishlist;

    if (wishlist.includes(idStr)) {
      updatedWishlist = wishlist.filter((id) => id !== idStr);
    } else {
      updatedWishlist = [...wishlist, idStr];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("vehicleWishlist", JSON.stringify(updatedWishlist));
    console.log("Updated Wishlist:", updatedWishlist);
  };

  const isInWishlist = (vehicleId) => wishlist.includes(vehicleId.toString());

  return (
    <>
      {/* Main Wrapper */}
      <div className="min-h-screen w-full mx-auto font-sans bg-gray-50 text-gray-900">
        {/* Header */}
        <div className="w-full shadow-md sticky top-0 z-10 bg-white">
          <Header />
        </div>

        {/* Hero Section */}
        <section
          className="relative w-full h-[28rem] flex items-center justify-center"
          style={{
            backgroundImage: `url(${rental})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative text-center max-w-3xl p-10 rounded-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Drive Your Dream Car
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Flexible plans to buy or rent premium cars at the best prices.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/booking">
                <button className="px-6 py-3 bg-green-500 hover:bg-green-700 text-black font-semibold rounded-lg shadow-lg transition">
                  Rent a Car
                </button>
              </Link>
              <Link to="/buying">
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-lg transition">
                  Buy a Car
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Wishlist Bar */}
        <div className="w-full bg-yellow-500 shadow-md overflow-hidden mb-8">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 px-6 py-3">
            <span className="text-black font-bold text-lg flex items-center gap-2">
              ❤️ My Wishlist: {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </span>
            <Link
              to="/wishlist"
              className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold transition duration-300"
            >
              View Wishlist
            </Link>
          </div>
        </div>


        {/* Popular Cars Section */}
        <section className="py-16 px-6 sm:px-12 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Popular Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {carsData.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(car.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition duration-300 z-10 text-2xl"
                  title={isInWishlist(car.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isInWishlist(car.id) ? "❤️" : "🤍"}
                </button>

                <img src={car.img} alt={car.name} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <p className="text-gray-600">
                    Rent: {car.price.rent} | Buy: {car.price.buy}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Link to="/booking" className="flex-1">
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition">
                        Rent
                      </button>
                    </Link>
                    <Link to="/buying" className="flex-1">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                        Buy
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100 px-6 sm:px-12 md:px-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                name: "John D.",
                feedback: "Smooth booking process, affordable rates, and excellent service. Highly recommend!",
              },
              {
                name: "Sophia R.",
                feedback: "Bought my dream BMW here. The experience was professional and transparent.",
              },
            ].map((test, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
                <p className="text-gray-700 italic">"{test.feedback}"</p>
                <h4 className="mt-4 font-bold text-gray-900">- {test.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-center text-white px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-6 text-lg md:text-xl">
            Book your car today — rent or buy with just a click.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking">
              <button className="bg-black hover:bg-gray-800 px-8 py-3 rounded-lg text-lg font-semibold transition">
                Rent a Car
              </button>
            </Link>
            <Link to="/buying">
              <button className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-lg text-lg font-semibold transition">
                Buy a Car
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-10 px-6 sm:px-12 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">About Us</h4>
              <p className="text-sm">
                We offer the best car rental & buying experience with a wide collection of vehicles.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/User_Dashboard" className="hover:text-white">Home</Link></li>
                <li><Link to="/wishlist" className="hover:text-white">My Wishlist</Link></li>
                <li><Link to="/booking" className="hover:text-white">Rent a Car</Link></li>
                <li><Link to="/buying" className="hover:text-white">Buy a Car</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Contact Us</h4>
              <p className="text-sm">Email: support@carrental.com</p>
              <p className="text-sm">Phone: +91 98765 43210</p>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} CarRentPro. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
