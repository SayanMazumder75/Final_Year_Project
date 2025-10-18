import React, { useState, useEffect } from 'react';
import Header from "../Admin_Panel/Header";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    // Load wishlist from localStorage on component mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('vehicleWishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Sample vehicle data
    const allVehicles = [
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
            img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
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

    // Get wishlisted vehicles
    const wishlistedVehicles = allVehicles.filter(vehicle =>
        wishlist.includes(vehicle.id.toString())
    );

    const removeFromWishlist = (vehicleId) => {
        const updatedWishlist = wishlist.filter(id => id !== vehicleId.toString());
        setWishlist(updatedWishlist);
        localStorage.setItem('vehicleWishlist', JSON.stringify(updatedWishlist));
    };

    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem('vehicleWishlist');
    };

    // Navigate to Rent Page
    const handleRent = (car) => {
    console.log("Rent button clicked for car:", car);
    // Store car data to use in the booking form
    localStorage.setItem('selectedCar', JSON.stringify(car));
    console.log("Stored in localStorage:", localStorage.getItem('selectedCar'));
    navigate('/booking'); // Use your existing booking route
};

    // Navigate to Buy Page
   const handleBuy = (car) => {
    console.log("Buy button clicked for car:", car);
    // Store car data to use in the buy form
    localStorage.setItem('selectedCar', JSON.stringify(car));
    console.log("Stored in localStorage:", localStorage.getItem('selectedCar'));
    navigate('/buying'); // Use your existing buying route
};

    if (wishlistedVehicles.length === 0) {
        return (
            <div className="min-h-screen w-full mx-auto font-sans bg-gray-50 text-gray-900">
                {/* Header */}
                <div className="w-full shadow-md sticky top-0 z-10 bg-white">
                    <Header />
                </div>

                <div className="container mx-auto px-6 py-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="text-6xl mb-6">🤍</div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
                        <p className="text-gray-600 mb-8">
                            Start adding your favorite cars to the wishlist to see them here!
                        </p>
                        <Link 
                            to="/user-dashboard"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition duration-300"
                        >
                            Browse Cars
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full mx-auto font-sans bg-gray-50 text-gray-900">
            {/* Header */}
            <div className="w-full shadow-md sticky top-0 z-10 bg-white">
                <Header />
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Wishlist Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Wishlist</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            {wishlistedVehicles.length} {wishlistedVehicles.length === 1 ? 'vehicle' : 'vehicles'}
                        </span>
                        <button 
                            onClick={clearWishlist}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* Wishlist Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedVehicles.map((car) => (
                        <div
                            key={car.id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
                        >
                            <img
                                src={car.img}
                                alt={car.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                                <p className="text-gray-600 mb-4">
                                    Rent: {car.price.rent} | Buy: {car.price.buy}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleRent(car.id)}
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
                                    >
                                        Rent Now
                                    </button>
                                    <button
                                        onClick={() => handleBuy(car.id)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                                    >
                                        Buy Now
                                    </button>
                                    <button 
                                        onClick={() => removeFromWishlist(car.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
