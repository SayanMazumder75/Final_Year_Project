import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const CarBuyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carData = location.state?.carData || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car: carData.name || "",
    color: "",
    priceRange: carData.price || "",
    address: "",
    payment: "",
    testDrive: "",
    ownerEmail: carData.ownerEmail || "",
  });

  const colorOptions = ["White", "Black", "Blue", "Red", "Silver", "Gray"];
  const paymentOptions = [
    "Credit Card",
    "Debit Card",
    "UPI",
    "Net Banking",
    "Cash",
  ];
  const testDriveOptions = ["Yes", "No"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "name",
      "phone",
      "email",
      "color",
      "address",
      "payment",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill ${field}`);
        return;
      }
    }
    navigate("/PaymentPage", { state: { formData } });
  };

  const goHome = () => navigate("/User_Dashboard");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-500 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-700 p-10 rounded-2xl shadow-2xl w-full max-w-2xl transition hover:shadow-xl"
      >
        <button
          type="button"
          onClick={goHome}
          className="absolute top-5 right-5 bg-gray-500 p-2 rounded-full shadow hover:bg-gray-400 transition cursor-pointer"
        >
          <Home className="w-6 h-6 text-gray-200" />
        </button>

        <h2 className="text-3xl font-extrabold text-gray-300 mb-2 text-center">
          Buy Your Dream Car
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Fill out the details 🚗
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 text-gray-300 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 text-gray-300 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 text-gray-300 focus:ring-indigo-500 outline-none"
            />
          </div>
          {/* Owner Email */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              OwnerEmail
            </label>
            <input
              type="email"
              name="ownerEmail"
              placeholder="john@example.com"
              value={formData.ownerEmail}
              onChange={handleChange}
              disabled
              required
              className="w-full px-4 py-3 border rounded-lg text-gray-300 bg-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Car Name - Disabled */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Car Name
            </label>
            <input
              type="text"
              name="car"
              value={formData.car}
              disabled
              className="w-full px-4 py-3 border rounded-lg text-gray-300 bg-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Price - Disabled */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Price
            </label>
            <input
              type="text"
              name="priceRange"
              value={formData.priceRange}
              disabled
              className="w-full px-4 py-3 border rounded-lg text-gray-300 bg-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Color
            </label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="">-- Choose Color --</option>
              {colorOptions.map((color, idx) => (
                <option key={idx} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              placeholder="123 Street Name, City, State, ZIP"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 text-gray-300 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Payment Method */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Payment Method
            </label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="">-- Choose Payment Method --</option>
              {paymentOptions.map((method, idx) => (
                <option key={idx} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Test Drive */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Want a Test Drive?
            </label>
            <select
              name="testDrive"
              value={formData.testDrive}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
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

        <button
          type="submit"
          className="w-full mt-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-md transition cursor-pointer"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CarBuyForm;
