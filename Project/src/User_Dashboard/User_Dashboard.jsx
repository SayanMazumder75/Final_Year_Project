import React, { useState, useEffect } from "react";
import Header from "./Header";
import rental from "./rental.jpg";
import rental2 from "./rental2.jpg";
import { Link } from "react-router-dom";
import AfterLogin from "./AfterLogin";

// Cars Data (Dynamic)
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
  {
    id:6,
    name: " Mercedes-Benz E-Class",
    price: { rent: "$170/day", buy: "$70,000"},
    img : "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/E-Class/9790/1728652931654/front-view-118.jpg",
  },
  {
    id:7,
    name: " Jaguar XF",
    price: { rent: "$120/day", buy: "$50,000"},
    img : "https://stimg.cardekho.com/images/car-images/930x620/Jaguar/XF/5437/1581327491979/228_Loire-Blue_131c2d.jpg",
  },
  {
    id:8,
    name: " Jaguar F-Pace",
    price: { rent: "$150/day", buy: "$65,000"},
    img : "https://stimg.cardekho.com/images/carexteriorimages/630x420/Jaguar/F-Pace/10644/1755774688332/front-left-side-47.jpg?tr=w-664",
  },
  {
    id:9,
    name: " Range Rover ",
    price: { rent: "$190/day", buy: "$90,000"},
    img : "https://stimg.cardekho.com/images/carexteriorimages/930x620/Land-Rover/Range-Rover/11540/1719037924320/side-view-(left)-90.jpg?imwidth=890&impolicy=resize",
  },
  {
    id:10,
    name: " Lexus LM ",
    price: { rent: "$200/day", buy: "$1,00,000"},
    img : "https://stimg.cardekho.com/images/carexteriorimages/930x620/Lexus/LM/11604/1750066752466/front-left-side-47.jpg",
  },
];

export default function User_Dashboard() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('vehicleWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const toggleWishlist = (vehicleId) => {
    const idStr = vehicleId.toString(); // Make sure ID is always a string
    let updatedWishlist;

    if (wishlist.includes(idStr)) {
      updatedWishlist = wishlist.filter(id => id !== idStr);
    } else {
      updatedWishlist = [...wishlist, idStr];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('vehicleWishlist', JSON.stringify(updatedWishlist));

    console.log("Updated Wishlist:", updatedWishlist); // Debug log
  };


  const isInWishlist = (vehicleId) => wishlist.includes(vehicleId.toString());


  return (
    <div className="min-h-screen w-full mx-auto font-sans bg-gray-50 text-gray-900">
      {/* Header with Wishlist Navigation */}
      <div className="w-full shadow-md sticky top-0 z-10 bg-white">
        <Header />

        {/* Wishlist Navigation Bar */}
        {/* <div className="bg-yellow-500 py-3 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-black font-bold text-lg">
              ❤ My Wishlist: {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </span>
            <Link
              to="/wishlist"
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
            >
              View Wishlist
            </Link>
          </div>
        </div> */}
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
          
        </div>
      </section>

      {/* Popular Cars Section with Wishlist Buttons */}
      <section className="py-16 px-6 sm:px-12 md:px-20 bg-gray-400 ">
        <AfterLogin />
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-600 text-black px-6 sm:px-12 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          What Our Customers Say
        </h2>
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
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition"
            >
              <p className="text-gray-700 italic">"{test.feedback}"</p>
              <h4 className="mt-4 font-bold text-gray-900">- {test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-center text-white px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Your Dream Car Awaits
        </h2>
        <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto">
          Explore our premium collection of cars and make your journey unforgettable. Whether it's renting for a weekend getaway or buying your ultimate ride, we make it seamless and hassle-free.
        </p>
        <Link to="/wishlist">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-xl text-lg transition-shadow shadow-lg hover:shadow-xl">
            Explore Wishlist
          </button>
        </Link>
      </section>


      {/* Footer - CORRECTED VERSION */}
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
  );
}