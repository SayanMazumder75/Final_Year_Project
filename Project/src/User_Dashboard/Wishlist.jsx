import React, { useState, useEffect } from 'react';
import Header from "../Admin_Panel/Header";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const navigate = useNavigate();

    // Load wishlist from localStorage on component mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('vehicleWishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Consolidated vehicle data with proper type classification
    const allVehicles = [
        {
            id: 1,
            name: "Toyota Corolla",
            price: { rent: "$45/day", buy: "" },
            type: "rent",
            img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 2,
            name: "BMW 5 Series",
            price: { rent: "$120/day", buy: "" },
            type: "rent",
            img: "https://i2.wp.com/www.ispravochnik.com/cdn/pictures/1_5ecfd6273fa1a.jpg",
        },
        {
            id: 3,
            name: "Honda Civic",
            price: { rent: "$50/day", buy: "" },
            type: "rent",
            img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 4,
            name: "Audi A6",
            price: { rent: "$150/day", buy: "" },
            type: "rent",
            img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 5,
            name: "Mercedes C-Class",
            price: { rent: "", buy: "$65,000" },
            type: "buy",
            img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 6,
            name: "Mercedes-Benz E-Class",
            price: { rent: "", buy: "$70,000" },
            type: "buy",
            img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/E-Class/9790/1728652931654/front-view-118.jpg",
        },
        {
            id: 7,
            name: "Jaguar XF",
            price: { rent: "", buy: "$50,000" },
            type: "buy",
            img: "https://stimg.cardekho.com/images/car-images/930x620/Jaguar/XF/5437/1581327491979/228_Loire-Blue_131c2d.jpg",
        },
        {
            id: 8,
            name: "Jaguar F-Pace",
            price: { rent: "", buy: "$65,000" },
            type: "buy",
            img: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Jaguar/F-Pace/10644/1755774688332/front-left-side-47.jpg?tr=w-664",
        },
        {
            id: 9,
            name: "Range Rover",
            price: { rent: "", buy: "$90,000" },
            type: "buy",
            img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Land-Rover/Range-Rover/11540/1719037924320/side-view-(left)-90.jpg?imwidth=890&impolicy=resize",
        },
        {
            id: 10,
            name: "Lexus LM",
            price: { rent: "", buy: "$100,000" },
            type: "buy",
            img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Lexus/LM/11604/1750066752466/front-left-side-47.jpg",
        },
    ];

    // Get wishlisted vehicles with filtering
    const wishlistedVehicles = allVehicles
        .filter(vehicle => wishlist.includes(vehicle.id.toString()))
        .filter(vehicle => {
            if (activeFilter === 'all') return true;
            if (activeFilter === 'rent') return vehicle.type === 'rent';
            if (activeFilter === 'buy') return vehicle.type === 'buy';
            return true;
        });

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
        if (!car.price.rent) {
            alert("This car is not available for rent");
            return;
        }
        localStorage.setItem('selectedCar', JSON.stringify(car));
        navigate('/booking');
    };

    // Navigate to Buy Page
    const handleBuy = (car) => {
        console.log("Buy button clicked for car:", car);
        if (!car.price.buy) {
            alert("This car is not available for purchase");
            return;
        }
        localStorage.setItem('selectedCar', JSON.stringify(car));
        navigate('/buying');
    };

    // Count vehicles by type for filter badges
    const rentCount = allVehicles.filter(v => 
        wishlist.includes(v.id.toString()) && v.type === 'rent'
    ).length;
    
    const buyCount = allVehicles.filter(v => 
        wishlist.includes(v.id.toString()) && v.type === 'buy'
    ).length;

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen w-full font-sans bg-gray-50 text-gray-900 overflow-x-hidden">
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
                            to="/user_dashboard"
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
            <div className="w-full shadow-md sticky top-0 z-10 bg-white">
                <Header />
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Wishlist Header with Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold">My Wishlist</h1>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Filter Buttons */}
                        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
                            <button 
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-md transition ${
                                    activeFilter === 'all' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All ({wishlist.length})
                            </button>
                            <button 
                                onClick={() => setActiveFilter('rent')}
                                className={`px-4 py-2 rounded-md transition ${
                                    activeFilter === 'rent' 
                                        ? 'bg-yellow-500 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Rent ({rentCount})
                            </button>
                            <button 
                                onClick={() => setActiveFilter('buy')}
                                className={`px-4 py-2 rounded-md transition ${
                                    activeFilter === 'buy' 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Buy ({buyCount})
                            </button>
                        </div>
                        
                        <button 
                            onClick={clearWishlist}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* Wishlist Items */}
                {wishlistedVehicles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No {activeFilter !== 'all' ? activeFilter : ''} cars in your wishlist
                        </p>
                    </div>
                ) : (
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
                                    <div className="text-gray-600 mb-4 space-y-1">
                                        {car.price.rent && (
                                            <p className="font-semibold text-yellow-600">
                                                Rent: {car.price.rent}
                                            </p>
                                        )}
                                        {car.price.buy && (
                                            <p className="font-semibold text-green-600">
                                                Buy: {car.price.buy}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleRent(car)}
                                            disabled={!car.price.rent}
                                            className={`flex-1 py-2 rounded-lg transition ${
                                                car.price.rent 
                                                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            Rent Now
                                        </button>
                                        <button
                                            onClick={() => handleBuy(car)}
                                            disabled={!car.price.buy}
                                            className={`flex-1 py-2 rounded-lg transition ${
                                                car.price.buy 
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
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
                )}
            </div>
        </div>
    );
};

export default Wishlist;