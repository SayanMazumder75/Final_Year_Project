import React, { useState } from "react";

const cars = [
  { label: "Toyota Supra", value: "supra", pricePerDay: 120 },
  { label: "BMW M3", value: "bmw-m3", pricePerDay: 150 },
  { label: "Audi A4", value: "audi-a4", pricePerDay: 100 },
];

const RentalForm = () => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [carType, setCarType] = useState(cars[0].value);
  const [mode, setMode] = useState("distance");

  // Calculate days between dates
  const getDays = () => {
    if (!pickupDate || !dropoffDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  // Calculate price
  const getTotalPrice = () => {
    const car = cars.find(c => c.value === carType);
    const days = getDays();
    return car ? days * car.pricePerDay : 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-80">
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("distance")}
            className={`px-4 py-2 rounded ${mode === "distance" ? "bg-green-700 text-white" : "bg-gray-700 text-gray-200"}`}>
            Distance
          </button>
          <button
            onClick={() => setMode("hourly")}
            className={`px-4 py-2 rounded ${mode === "hourly" ? "bg-green-700 text-white" : "bg-gray-700 text-gray-200"}`}>
            Hourly
          </button>
          <button
            onClick={() => setMode("flat")}
            className={`px-4 py-2 rounded ${mode === "flat" ? "bg-green-700 text-white" : "bg-gray-700 text-gray-200"}`}>
            Flat rate
          </button>
        </div>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            className="p-3 rounded bg-gray-700 text-white"
            placeholder="Pickup address"
            value={pickupAddress}
            onChange={e => setPickupAddress(e.target.value)}
          />
          <input
            type="text"
            className="p-3 rounded bg-gray-700 text-white"
            placeholder="Dropoff address"
            value={dropoffAddress}
            onChange={e => setDropoffAddress(e.target.value)}
          />
          <input
            type="date"
            className="p-3 rounded bg-gray-700 text-white"
            value={pickupDate}
            onChange={e => setPickupDate(e.target.value)}
          />
          <input
            type="date"
            className="p-3 rounded bg-gray-700 text-white"
            value={dropoffDate}
            onChange={e => setDropoffDate(e.target.value)}
          />
          <input
            type="time"
            className="p-3 rounded bg-gray-700 text-white"
            value={pickupTime}
            onChange={e => setPickupTime(e.target.value)}
          />
          <select
            className="p-3 rounded bg-gray-700 text-white"
            value={carType}
            onChange={e => setCarType(e.target.value)}>
            {cars.map(car => (
              <option key={car.value} value={car.value}>
                {car.label} (${car.pricePerDay}/day)
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-300">Total Days: <b>{getDays()}</b></span>
            <span className="text-gray-300">Total Price: <b>${getTotalPrice()}</b></span>
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 mt-4 py-3 rounded text-white font-semibold">
            Search now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentalForm;
