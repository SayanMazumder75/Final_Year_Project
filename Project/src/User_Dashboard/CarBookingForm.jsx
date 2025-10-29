import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const CarRentalForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carData = location.state?.carData || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car: carData.name || "",
    price: carData.price || "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "",
    payment: "",
    ownerEmail: carData.ownerEmail || "",
  });

  const paymentOptions = [
    "Credit Card",
    "Debit Card",
    "UPI",
    "Net Banking",
    "Cash",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "name",
      "phone",
      "email",
      "car",
      "price",
      "pickupDate",
      "dropoffDate",
      "pickupTime",
      "payment",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill ${field}`);
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:5000/api/rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // includes ownerEmail
      });

      if (!res.ok) throw new Error("Failed to save rental");

      const data = await res.json();
      console.log("Rental saved:", data);

      navigate("/RentPaymentPage", { state: { formData } });
    } catch (err) {
      console.error(err);
      alert("Error saving rental. Please try again.");
    }
  };

  const goHome = () => navigate("/User_Dashboard");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-500 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="relative bg-gray-700 p-10 rounded-2xl shadow-2xl w-full max-w-2xl transition hover:shadow-xl"
      >
        {/* Home Button */}
        <button
          type="button"
          onClick={goHome}
          className="absolute top-5 right-5 bg-gray-500 p-2 rounded-full shadow hover:bg-gray-400 transition cursor-pointer"
        >
          <Home className="w-6 h-6 text-gray-200" />
        </button>

        <h2 className="text-3xl font-extrabold text-gray-300 mb-2 text-center">
          Rent Your Dream Car
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Fill in your details to rent a car 🚘
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
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
              required
              disabled
              className="w-full px-4 py-3 border rounded-lg text-gray-300 bg-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Car Name (readonly) */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Car Name
            </label>
            <input
              type="text"
              name="car"
              value={formData.car}
              readOnly
              className="w-full px-4 py-3 border rounded-lg text-gray-300 bg-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Price (readonly) */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              readOnly
              className="w-full px-4 py-3 border rounded-lg text-gray-300 bg-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 text-gray-300 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Pickup Time
            </label>
            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 text-gray-300 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Dropoff Date */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">
              Dropoff Date
            </label>
            <input
              type="date"
              name="dropoffDate"
              value={formData.dropoffDate}
              onChange={handleChange}
              required
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
              <option value="">-- Choose Payment --</option>
              {paymentOptions.map((method, idx) => (
                <option key={idx} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
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

export default CarRentalForm;
