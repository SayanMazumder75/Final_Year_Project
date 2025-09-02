import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
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
  const [successMessage, setSuccessMessage] = useState("");

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

  // Available Cars
  const [cars] = useState([
    { id: 1, model: "Tesla Model 3", year: 2023, price: 100000 },
    { id: 2, model: "BMW X5", year: 2022, price: 130000 },
    { id: 3, model: "Audi A6", year: 2021, price: 200000 },
  ]);

  // Dummy Orders by Customers
  const [orders] = useState([
    { id: 1, customer: "John Doe", car: "Tesla Model 3", date: "2025-08-10" },
    { id: 2, customer: "Alice Smith", car: "BMW X5", date: "2025-08-15" },
    { id: 3, customer: "Robert Brown", car: "Audi A6", date: "2025-08-25" },
  ]);

  // Dummy Available Rent Cars
  const [rentCars] = useState([
    { id: 1, model: "Toyota Corolla", rentPerDay: 50, availability: "Available" },
    { id: 2, model: "Honda Civic", rentPerDay: 60, availability: "Rented" },
    { id: 3, model: "Ford Mustang", rentPerDay: 120, availability: "Available" },
  ]);

  // Disabled Add Handler
  const handleAdd = () => {
    setSuccessMessage("ℹ️ Adding new cars is disabled now");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen flex bg-gray-700">
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

      {/* Main Area */}
      <div
        className={`flex-1 flex flex-col transition-opacity duration-300 ${
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
          {/* Available Car Models */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
              <h2 className="text-xl font-semibold mb-3">Available Car Models</h2>

              <table className="min-w-full border border-gray-200 text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Model</th>
                    <th className="px-4 py-2 border">Year</th>
                    <th className="px-4 py-2 border">Price ($)</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{car.model}</td>
                      <td className="px-4 py-2 border">{car.year}</td>
                      <td className="px-4 py-2 border">{car.price}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button disabled className="text-gray-400 cursor-not-allowed">
                          Edit
                        </button>
                        <button disabled className="text-gray-400 cursor-not-allowed">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Disabled Add New Car Form */}
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 opacity-50 pointer-events-none">
                <input type="text" placeholder="Car Model" className="border rounded px-3 py-2 flex-1 w-full" disabled />
                <input type="number" placeholder="Year" className="border rounded px-3 py-2 w-full md:w-28" disabled />
                <input type="number" placeholder="Price" className="border rounded px-3 py-2 w-full md:w-36" disabled />
                <input type="file" accept="image/*" className="border rounded px-3 py-2 w-full md:w-48" disabled />
              </div>

              {/* Disabled Add Button (Still clickable for message) */}
              <div className="mt-4">
                <button
                  onClick={handleAdd}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Add (Disabled)
                </button>
              </div>

              {/* Message */}
              {successMessage && (
                <div className="text-blue-600 font-semibold mt-2">
                  {successMessage}
                </div>
              )}
            </div>
          </div>

          {/* Orders by Customer */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">Orders by Customer</h2>
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Customer</th>
                  <th className="px-4 py-2 border">Car</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{order.customer}</td>
                    <td className="px-4 py-2 border">{order.car}</td>
                    <td className="px-4 py-2 border">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Available Rent Cars */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">Available Rent Cars</h2>
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Model</th>
                  <th className="px-4 py-2 border">Rent/Day ($)</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {rentCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{car.model}</td>
                    <td className="px-4 py-2 border">{car.rentPerDay}</td>
                    <td className="px-4 py-2 border">{car.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
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
          </div>

        </main>
      </div>
    </div>
  );
}
