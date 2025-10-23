import React, { useState } from "react";
import { Home } from "lucide-react"; // Import Home icon

const CarRentalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "",
    payment: "",
  });

  const carOptions = [
    "Tesla Model S",
    "BMW X5",
    "Audi A6",
    "Mercedes C-Class",
    "Toyota Corolla",
  ];


  const paymentOptions = ["Credit Card", "Debit Card", "UPI", "Net Banking"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //backend connection
  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
    const response = await fetch("http://localhost:5000/api/rental", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) alert("Rental confirmed!");
    else alert("Failed to submit");
  } catch (err) {
    alert("Error submitting form");
  }
    
  };

  const goHome = () => {
    window.location.href = "/User_Dashboard"; //redirect to home page
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl transition hover:shadow-xl"
      >
        {/* Home Icon (inside the form - top-right corner) */}
        <button
          type="button"
          onClick={goHome}
          className="absolute top-5 right-5 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition cursor-pointer"
        >
          <Home className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          Car Rental Form
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Fill in your details to rent a car 🚘
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Pickup Time
            </label>
            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Dropoff Date */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Dropoff Date
            </label>
            <input
              type="date"
              name="dropoffDate"
              value={formData.dropoffDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Car Selection */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Select Car
            </label>
            <select
              name="car"
              value={formData.car}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="">-- Choose a Car --</option>
              {carOptions.map((car, idx) => (
                <option key={idx} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Payment Method
            </label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="">-- Choose Payment --</option>
              {paymentOptions.map((method, idx) => (
                <option key={idx} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-md transition cursor-pointer"
        >
          Confirm Rental
        </button>
      </form>
    </div>
  );
};

export default CarRentalForm;
