import React, { useState, useEffect } from "react";
import showroom1 from "../User_Dashboard/rental.jpg";
import showroom2 from "../User_Dashboard/rental2.jpg";
import axios from "axios";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Lock,
  Store,
  Briefcase,
} from "lucide-react";

export default function AdminSignup() {
  const [form, setForm] = useState({
    ownerName: "",
    shopName: "",
    email: "",
    number: "",
    address: "",
    pin: "",
    registration: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const images = [showroom1, showroom2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );

          if (!response.ok) {
            throw new Error("Reverse geocoding failed");
          }

          const data = await response.json();
          const detectedAddress = data.display_name || "";
          // Try to extract postcode if available
          const postal = data.address?.postcode || "";

          setForm((prev) => ({
            ...prev,
            address: detectedAddress,
            pin: postal || prev.pin,
          }));
        } catch (err) {
          console.error("Location error:", err);
          alert("Failed to fetch address. Try again or enter manually.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve location. Check permissions and try again.");
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        ownerName: form.ownerName,
        email: form.email,
        password: form.password,
        userType: "owner",
        ownerCode: import.meta.env.VITE_OWNER_CODE,
        contactNumber: form.number,
        shopAddress: form.address,
        pinCode: form.pin,
        shopName: form.shopName,
        businessRegId: form.registration,
        profilePic: form.profilePic,
      };

      console.log("sending payload:", payload);

      const { data } = await axios.post(
        "http://localhost:5000/owner/register",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(data.msg || "Owner registered successfully!");
      window.location.href = "/AdminLogin";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-gray-800 p-4 sm:p-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden h-screen md:h-[85vh]">
        {/* Left Section: Sliding Images */}
        <div className="w-full md:w-1/2 relative h-64 md:h-full">
          <img
            src={images[current]}
            alt="Car Showroom"
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/50 flex items-end justify-center pb-6">
            <p className="text-white text-lg font-semibold tracking-wide text-center px-3">
              "Drive Your Business to Success 🚗"
            </p>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  current === index ? "bg-yellow-400" : "bg-gray-400/60"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Right Section: Form */}

        <div className="absolute top-0 right-0 p-5 cursor-pointer" 
                    onClick={() => window.location.href = "/"}>
                    <Home size={20} className="text-yellow-400" />
                  </div>
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-400 mb-2 tracking-tight drop-shadow-md">
            Register Your Car Shop
          </h2>
          <p className="text-gray-300 text-center mb-6 text-sm sm:text-base">
            Join our dealer network to manage rentals, sales & inventory with ease.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Owner Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="Mark Zuckerberg"
                />
              </div>
            </div>

            {/* Shop Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Shop / Dealership Name
              </label>
              <div className="relative">
                <Store className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="Elite Motors"
                />
              </div>
            </div>

            {/* Business Registration Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Business Registration ID
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="registration"
                  value={form.registration}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="BR-2025-XYZ123"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="owner@elitemotors.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Address with Auto Detect (icon button) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Shop Address
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full pl-10 pr-12 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
                  placeholder="Street, City, State"
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={loadingLocation}
                  className="absolute right-2 top-2.5 bg-yellow-500 hover:bg-yellow-400 text-black p-1.5 rounded-full transition disabled:opacity-60 disabled:cursor-not-allowed"
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

            {/* PIN */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                PIN Code
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="pin"
                  value={form.pin}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="123456"
                />
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={
                    form.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover border border-gray-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setForm((prev) => ({ ...prev, profilePic: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="Owner@1234"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-yellow-500"
                  } outline-none`}
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-semibold uppercase tracking-wide transition-all duration-300 shadow-xl"
            >
              Register Shop
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-5">
            Already registered?{" "}
            <a href="/AdminLogin" className="text-yellow-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
