import React, { useState, useEffect } from "react";
import showroom1 from "../User_Dashboard/rental.jpg";
import showroom2 from "../User_Dashboard/rental2.jpg";

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
  Car,
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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = [showroom1, showroom2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const payload = {
      name: form.ownerName,
      email: form.email,
      password: form.password,
      userType: "owner",
      ownerCode: process.env.REACT_APP_OWNER_CODE, // or a hardcoded secret for now
    };

    const { data } = await axios.post("http://localhost:5000/user/register", payload, {
      headers: { "Content-Type": "application/json" },
    });

    alert(data.msg || "Owner registered successfully!");
    window.location.href = "/AdminLogin"; // redirect to login

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
                  placeholder="Mark Zuckerberg "
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
                  type="number"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Address */}
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
                  placeholder="Street, City, State"
                />
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
                  type="number"
                  name="pin"
                  value={form.pin}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border border-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="123456"
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
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/70 text-white border 
                    ${
                      form.confirmPassword &&
                      form.password !== form.confirmPassword
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
