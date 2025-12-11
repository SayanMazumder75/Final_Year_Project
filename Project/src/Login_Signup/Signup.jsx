import React, { useState, useEffect } from "react";
import rental from "../User_Dashboard/rental.jpg";
import rental2 from "../User_Dashboard/rental2.jpg";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Lock,
} from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    pin: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const images = [rental, rental2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch user's current address using Geolocation + Geoapify
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.geoapify.com/v1/geocode/reverse?format=json&lat=${latitude}&lon=${longitude}&apiKey=5acb781bc81749e9bcbfc96768ea77ad`;

        try {
          const res = await fetch(url);
          const data = await res.json();

          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted;
            setForm((prev) => ({ ...prev, address }));
          } else {
            alert("No address found for this location.");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Error fetching location. Please try again.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to get location. Please check permissions.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          userType: "user",
          phoneNumber: form.number,
          address: form.address,
          pincode: form.pin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Registration failed");
      } else {
        alert("Registered successfully!");
        console.log("Server Response:", data);
        setForm({
          name: "",
          email: "",
          number: "",
          address: "",
          pin: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-slate-900 p-4 sm:p-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden h-screen md:h-[80vh]">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 relative h-64 md:h-full">
          <img
            src={images[current]}
            alt="slide"
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-6">
            <p className="text-white text-sm sm:text-lg font-semibold px-2 text-center">
              Capturing Moments, Creating Memories
            </p>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  current === index ? "bg-white" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 text-center mb-6 text-sm sm:text-base">
            Sign up to create your account and access all features. 🚀
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Address + Get Location Button */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address
              </label>
              <div className="relative">
                <Home
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full pl-10 pr-20 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Street, City, State"
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={loadingLocation}
                  className="absolute right-2 top-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white p-1.5 rounded-full transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                  title="Get Current Location"
                >
                  {loadingLocation ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <MapPin size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* PIN Code */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                PIN Code
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  name="pin"
                  value={form.pin}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="123456"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="User@1234"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border 
                  ${
                    form.confirmPassword !== "" &&
                    form.password !== form.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-green-700 focus:ring-blue-500"
                  }
                  outline-none`}
                  placeholder="User@1234"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold transition-all duration-300 shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-5">
            Already have an account?{" "}
            <a href="/Login" className="text-blue-400 hover:underline">
              Login here
            </a>
          </p>

          <p className="text-sm text-gray-400 text-center mt-5">
            Signup as Shop Owner?{" "}
            <a href="/AdminSignup" className="text-blue-400 hover:underline">
              Click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
