import React, { useState } from "react";
import { Home } from "lucide-react"; // Icon from lucide-react

const CarBuyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car: "",
    color: "",
    priceRange: "",
    address: "",
    payment: "",
    testDrive: "",
  });

  const carOptions = [
    "Tesla Model 3",
    "BMW X5",
    "Audi A4",
    "Mercedes GLA",
    "Toyota Fortuner",
    "Hyundai Creta",
  ];

 

  const colorOptions = ["White", "Black", "Blue", "Red", "Silver", "Gray"];

  const paymentOptions = ["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash"];

  const testDriveOptions = ["Yes", "No"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //buyer backend 

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
    const response = await fetch("http://localhost:5000/api/buyer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) alert("Buyer confirmed!");
    else alert("Failed to submit");
  } catch (err) {
    alert("Error submitting form");
  }
    
  };
  const goHome = () => {
    window.location.href = "/User_Dashboard"; // redirect to homepage
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl transition hover:shadow-xl"
      >
        {/* Home Icon (top-right corner) */}
        <button
          type="button"
          onClick={goHome}
          className="absolute top-5 right-5 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition cursor-pointer"
        >
          <Home className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          Buy Your Dream Car
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Fill out the details to proceed with your car purchase 🚗
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Select Car */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Select Car
            </label>
            <select
              name="car"
              value={formData.car}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Choose a Car --</option>
              {carOptions.map((car, idx) => (
                <option key={idx} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Color</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Choose Color --</option>
              {colorOptions.map((color, idx) => (
                <option key={idx} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price Range
            </label>
            <input
              type="text"
              name="priceRange"
              placeholder="₹10,00,000 - ₹20,00,000"
              value={formData.priceRange}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
            ></textarea>
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
              className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Choose Payment Method --</option>
              {paymentOptions.map((method, idx) => (
                <option key={idx} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Test Drive Option */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Want a Test Drive?
            </label>
            <select
              name="testDrive"
              value={formData.testDrive}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Select --</option>
              {testDriveOptions.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md transition cursor-pointer"
        >
          Submit Purchase Request
        </button>
      </form>
    </div>
  );
};
 
export default CarBuyForm;
