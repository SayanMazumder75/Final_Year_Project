import React, { useState, useEffect } from "react";
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

  // Dummy Data (replace later with DB data)
  const [growthData, setGrowthData] = useState([
    { month: "Jan", growth: 40 },
    { month: "Feb", growth: 55 },
    { month: "Mar", growth: 75 },
    { month: "Apr", growth: 50 },
    { month: "May", growth: 90 },
  ]);

  const [salesData, setSalesData] = useState([
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

  // Available Car
  const [cars, setCars] = useState([
    { id: 1, model: "Tesla Model 3", year: 2023, price: 100000 },
    { id: 2, model: "BMW X5", year: 2022, price: 130000 },
    { id: 3, model: "Audi A6", year: 2021, price: 200000 },
  ]);

  const [newCar, setNewCar] = useState({ model: "", year: "", price: "" });

  const handleAdd = () => {
    if (newCar.model && newCar.year && newCar.price) {
      setCars([...cars, { id: Date.now(), ...newCar }]);
      setNewCar({ model: "", year: "", price: "" });
    }
  };

  const handleDelete = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const handleEdit = (id) => {
    const editedModel = prompt("Enter new car model:");
    const editedYear = prompt("Enter new car year:");
    const editedPrice = prompt("Enter new car price:");
    setCars(
      cars.map((car) =>
        car.id === id
          ? {
              ...car,
              model: editedModel || car.model,
              year: editedYear || car.year,
              price: editedPrice || car.price,
            }
          : car
      )
    );
  };

  useEffect(() => {
    // Example API call in real case
    // fetch("/api/dashboard").then(res => res.json()).then(data => setGrowthData(data.growth))
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
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
          {/* Available Car Model - Full width on md screens */}
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
                        <button
                          onClick={() => handleEdit(car.id)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add New Car */}
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                <input
                  type="text"
                  placeholder="Car Model"
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  className="border rounded px-3 py-2 flex-1 w-full"
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={newCar.year}
                  onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                  className="border rounded px-3 py-2 w-full md:w-28"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newCar.price}
                  onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                  className="border rounded px-3 py-2 w-full md:w-36"
                />
                <button
                  onClick={handleAdd}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Orders by Customer Cars */}
          <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-xl font-semibold mb-3">Orders by Customer</h2>
              <div className="h-32 flex items-center justify-center text-gray-400 available-cars-box">
                Order cars data (DB connect here)
              </div>
            </div>
          </div>

          {/* Available Rent Cars details */}
          <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-xl font-semibold mb-3">Available Rent Cars Details</h2>
              <div className="h-32 flex items-center justify-center text-gray-400 available-cars-box">
                Available Rent Cars Details (DB connect here)
              </div>
            </div>
          </div>

          {/* Company Growth Graph */}
          <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
            <h2 className="text-lg font-semibold">Company Growth</h2>
            <div className="w-full h-64 growth-graph">
              <ResponsiveContainer>
                <LineChart data={growthData}>
                  <Line type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={3} />
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
                    {/* Gradients for each month */}
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
