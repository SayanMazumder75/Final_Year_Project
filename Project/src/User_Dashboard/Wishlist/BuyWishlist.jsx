import React, { useState, useEffect } from "react";
import Header from "../../Admin_Panel/Header";
import { useNavigate } from "react-router-dom";

const BuyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("vehicleWishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const allVehicles = [
    // Only buy vehicles
    {
      id: 5,
      name: "Mercedes C-Class",
      price: { buy: "$65,000" },
      img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Mercedes-Benz E-Class",
      price: { buy: "$70,000" },
      img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/E-Class/9790/1728652931654/front-view-118.jpg",
    },
    {
      id: 7,
      name: "Jaguar XF",
      price: { buy: "$50,000" },
      img: "https://stimg.cardekho.com/images/car-images/930x620/Jaguar/XF/5437/1581327491979/228_Loire-Blue_131c2d.jpg",
    },
    {
      id: 8,
      name: "Jaguar F-Pace",
      price: { buy: "$65,000" },
      img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Jaguar/F-Pace/10644/1755774688332/front-left-side-47.jpg?tr=w-664",
    },
    {
      id: 9,
      name: "Range Rover",
      price: { buy: "$90,000" },
      img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Land-Rover/Range-Rover/11540/1719037924320/side-view-(left)-90.jpg?imwidth=890&impolicy=resize",
    },
    {
      id: 10,
      name: "Lexus LM",
      price: { buy: "$100,000" },
      img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Lexus/LM/11604/1750066752466/front-left-side-47.jpg",
    },
  ];

  const buyCars = allVehicles.filter((v) => wishlist.includes(v.id.toString()));

  const handleBuy = (car) => {
    localStorage.setItem('selectedCar', JSON.stringify(car));
    navigate('/buying');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Buy Wishlist</h1>
          <span className="text-gray-600">
            {buyCars.length} {buyCars.length === 1 ? 'car' : 'cars'}
          </span>
        </div>

        {buyCars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <p className="text-gray-600 text-lg mb-4">No cars in your Buy Wishlist</p>
            <p className="text-gray-500">Add some cars you'd like to purchase to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img src={car.img} alt={car.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <p className="text-green-600 font-semibold mb-4">Buy: {car.price.buy}</p>
                  <button 
                    onClick={() => handleBuy(car)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition"
                  >
                    Buy Now
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

export default BuyWishlist;