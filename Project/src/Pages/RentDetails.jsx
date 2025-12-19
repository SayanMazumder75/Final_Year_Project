import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Homepage/Footer";
import RelatedRentVehicles from "../RelatedProducts/RelatedRentVehicles";

export default function RentDetails() {
  const location = useLocation();
  const carData = location.state?.carData;

  // 🚨 SAFETY CHECK (VERY IMPORTANT)
  if (!carData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          No car data found. Please go back and select a vehicle.
        </p>
      </div>
    );
  }

  const photos = Array.isArray(carData.photos)
    ? carData.photos
    : [carData.photos];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [photos]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Link
        to="/User_Dashboard"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 max-w-7xl mx-auto">
        {/* IMAGE */}
        <img
          src={photos[currentIndex]}
          alt="Car"
          className="w-full h-[420px] object-cover rounded-lg"
        />

        {/* DETAILS */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">
            {carData.brand} ({carData.year})
          </h1>

          <p className="text-green-600 text-xl font-medium">
            Rental Price: ₹{carData.price}/day
          </p>

          <p className="text-gray-600">{carData.description}</p>

          <div className="grid grid-cols-2 gap-y-3 text-gray-700">
            <div><strong>Fuel:</strong> {carData.fuel}</div>
            <div><strong>Transmission:</strong> {carData.transmission}</div>
            <div><strong>KMs Driven:</strong> {carData.kmsDriven}</div>
            <div><strong>Year:</strong> {carData.year}</div>
          </div>

          {/* RENT FORM BUTTON */}
          <Link
            to="/booking"
            state={{
              carData: {
                name: carData.brand,
                price: carData.price,
                ownerEmail: carData.ownerEmail,
                carId: carData.carId,
              },
            }}
          >
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Rent This Car
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <RelatedRentVehicles />
      </div>

      <Footer />
    </div>
  );
}
