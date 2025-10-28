import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShieldCheck,Home } from "lucide-react";
import axios from "axios";
export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/owner/login", // your backend login URL
      form, // automatically sent as JSON
      { headers: { "Content-Type": "application/json" } }
    );

    // Optional: check if user is admin
    // if (data.userType !== "owner") {
    //   alert("You are not an owner!");
    //   return;
    // }

    // Save token
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("userType", data.userType);
    localStorage.setItem("ownerId", data.ownerId);

    
    window.location.href = "/Profile"; // redirect to admin dashboard

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.msg || "Login failed");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">

        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>

        {/* Icon Header */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-500/20 p-4 rounded-full border border-yellow-500/40">
            <ShieldCheck size={40} className="text-yellow-400" />
          </div>
          <div className="absolute top-0 right-0 p-2 cursor-pointer" 
            onClick={() => window.location.href = "/"}>
            <Home size={20} className="text-yellow-400" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-400 mb-1 tracking-tight">
          Owner Login Panel
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm sm:text-base">
          Secure access to your management dashboard 👨‍💼
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Owner Email
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
                placeholder="owner@dealership.com"
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

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-xs text-yellow-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-semibold uppercase tracking-wide transition-all duration-300 shadow-xl"
          >
            Login as Owner
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400 space-y-2">
          <p>
            Not an owner?{" "}
            <a href="/Login" className="text-yellow-400 hover:underline">
              Go to User Login
            </a>
          </p>
          <p>
            New User?{" "}
            <a href="/AdminSignup" className="text-yellow-400 hover:underline font-medium">
              Signup here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
