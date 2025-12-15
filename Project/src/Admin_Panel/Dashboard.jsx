import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../Homepage/Footer";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [open, setOpen] = useState(false); // sidebar toggle
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [errorAds, setErrorAds] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Dummy Growth Data
  const [growthData] = useState([
    { month: "Jan", growth: 40 },
    { month: "Feb", growth: 55 },
    { month: "Mar", growth: 75 },
    { month: "Apr", growth: 50 },
    { month: "May", growth: 90 },
  ]);

  // Dummy Sales Data
  const [salesData] = useState([
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 150 },
    { month: "Mar", sales: 200 },
    { month: "Apr", sales: 170 },
    { month: "May", sales: 220 },
    { month: "Jun", sales: 320 },
    { month: "Jul", sales: 150 },
    { month: "Aug", sales: 500 },
    { month: "Sep", sales: 470 },
    { month: "Oct", sales: 210 },
    { month: "Nov", sales: 220 },
    { month: "Dec", sales: 420 },
  ]);

  const handleAdd = () => navigate("/PostAd"); // open PostAd page

  // Fetch owner-specific ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("http://localhost:5000/api/product/my-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setAds(data);
      } catch (err) {
        setErrorAds(err.message);
      } finally {
        setLoadingAds(false);
      }
    };
    fetchAds();
  }, []);

    // Edit ad
  const handleEdit = (ad) => {
    localStorage.setItem("editAd", JSON.stringify(ad));
    navigate("/PostAd");
  };

  // Delete ad
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (err) {
      alert("Error deleting ad: " + err.message);
    }
  };
  return (
  <div className="flex h-screen bg-gray-700 overflow-hidden">
    {/* Sidebar */}
    <div className="md:sticky md:top-0 h-screen">
      <Sidebar open={open} setOpen={setOpen} />
    </div>

    {/* Overlay (mobile only) */}
    {open && (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        onClick={() => setOpen(false)}
      ></div>
    )}

    {/* Main scrollable area */}
    <div
      className={`flex-1 flex flex-col overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${
        open
          ? "opacity-30 pointer-events-none md:opacity-100 md:pointer-events-auto"
          : "opacity-100"
      }`}
    >
      {/* Header */}
      {!open && (
        <div className="md:w-full shadow-md sticky top-0 z-10 bg-white">
          <Header />
        </div>
      )}

      {/* Dashboard Content */}
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Owner Ads Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Ads</h2>
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add New Ad
              </button>
            </div>

            {loadingAds ? (
              <p className="text-gray-500">Loading...</p>
            ) : errorAds ? (
              <p className="text-red-500">{errorAds}</p>
            ) : ads.length === 0 ? (
              <p className="text-gray-600">No ads found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ads.map((ad) => (
                  /* ======= UPDATED PROFESSIONAL AD CARD ======= */
                  <div
                    key={ad._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
                  >
                    {/* Top Section */}
                    <div>
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {ad.title}
                        </h3>

                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            ad.adType === "rent"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {ad.adType.toUpperCase()}
                        </span>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium text-gray-700">
                            Brand:
                          </span>{" "}
                          {ad.brand}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Year:
                          </span>{" "}
                          {ad.year}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Fuel:
                          </span>{" "}
                          {ad.fuel}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Gear:
                          </span>{" "}
                          {ad.transmission}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            KMs:
                          </span>{" "}
                          {ad.kmsDriven}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Owners:
                          </span>{" "}
                          {ad.noOfOwners}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            State:
                          </span>{" "}
                          {ad.state}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Phone:
                          </span>{" "}
                          {ad.mobilePhone}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      {/* Price */}
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-xl font-bold text-blue-600">
                          ₹{ad.price}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(ad._id)}
                          className="px-4 py-1.5 text-sm rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

          {/* Company Growth */}
          <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
            <h2 className="text-lg font-semibold">Company Growth</h2>
            <div className="w-full h-64 growth-graph">
              <ResponsiveContainer>
                <LineChart data={growthData}>
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Last 12 Months Sales (Donut Chart) */}
          <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Last 12 Months Sales</h2>

            <div className="w-full h-80 sales-graph relative">
              <ResponsiveContainer>
                <PieChart>
                  <defs>
                    <linearGradient id="colorJan" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="colorFeb" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="colorMar" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="colorApr" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="100%" stopColor="#b91c1c" />
                    </linearGradient>
                    <linearGradient id="colorMay" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="colorJun" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#be185d" />
                    </linearGradient>
                    <linearGradient id="colorJul" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#0e7490" />
                    </linearGradient>
                    <linearGradient id="colorAug" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fcd34d" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                    <linearGradient id="colorSep" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#be123c" />
                    </linearGradient>
                    <linearGradient id="colorOct" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                    <linearGradient id="colorNov" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#065f46" />
                    </linearGradient>
                    <linearGradient id="colorDec" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                  </defs>

                  <Pie
                    data={salesData}
                    dataKey="sales"
                    nameKey="month"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={60}
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#color${entry.month})`} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center text inside donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-800">
                  {salesData.reduce((acc, cur) => acc + cur.sales, 0)}
                </span>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    
    </div>
    
  );
}
