import React, { useState, useEffect } from "react";
import Header from "../Admin_Panel/Header";
import { Link } from "react-router-dom";
import rental2 from "./rental2.jpg";

// Cars Data (Buy Only)
const buyCars = [
  {
    id: 5,
    name: "Mercedes C-Class",
    price: { rent: "$160/day", buy: "$65,000" },
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Mercedes-Benz E-Class",
    price: { rent: "$170/day", buy: "$70,000" },
    img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/E-Class/9790/1728652931654/front-view-118.jpg",
  },
  {
    id: 7,
    name: "Jaguar XF",
    price: { rent: "$120/day", buy: "$50,000" },
    img: "https://stimg.cardekho.com/images/car-images/930x620/Jaguar/XF/5437/1581327491979/228_Loire-Blue_131c2d.jpg",
  },
  {
    id: 8,
    name: "Jaguar F-Pace",
    price: { rent: "$150/day", buy: "$65,000" },
    img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Jaguar/F-Pace/10644/1755774688332/front-left-side-47.jpg?tr=w-664",
  },
  {
    id: 9,
    name: "Range Rover",
    price: { rent: "$190/day", buy: "$90,000" },
    img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Land-Rover/Range-Rover/11540/1719037924320/side-view-(left)-90.jpg?imwidth=890&impolicy=resize",
  },
  {
    id: 10,
    name: "Lexus LM",
    price: { rent: "$200/day", buy: "$100,000" },
    img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Lexus/LM/11604/1750066752466/front-left-side-47.jpg",
  },
];

export default function Buy() {
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
          backgroundImage: `url(${rental2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Buy a Car</h1>
          <p className="mt-4 text-lg md:text-xl">
            Own your dream car with flexible purchase options.
          </p>
        </div>
      </section>

      {/* Buy Cars Section */}
      <section className="py-16 px-6 sm:px-12 md:px-20 bg-gray-400">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Available for Purchase
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {buyCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-2xl transition"
            >
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(car.id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-2xl"
              >
                {isInWishlist(car.id) ? "❤" : "🤍"}
              </button>

              <img src={car.img} alt={car.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-gray-600 mb-4">Buy: {car.price.buy}</p>

                <div className="flex gap-3">
                  <Link to="/buying" className="flex-1">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                      Buy
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
            Own Your Dream Car
        </h2>
        <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto">
            Take the next step towards owning a premium vehicle. Explore our exclusive collection, find the car that fits your style, and enjoy a seamless purchase experience with flexible options tailored just for you.
        </p>
        <Link to="/Wishlist">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-shadow shadow-lg hover:shadow-xl">
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
