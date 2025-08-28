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
  BarChart,
  Bar,
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
  ]);

  // Simulate fetching from DB (replace with API call)
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
        <div className="p-4">
          <main className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-6">
              {/* Car Model */}
              <div className="bg-white rounded-lg shadow-md p-5">
                <h2 className="text-xl font-semibold mb-3">Car Model</h2>
                <div className="h-32 flex items-center justify-center text-gray-400 car-model-box">
                  Car model data (DB connect here)
                </div>
              </div>

              {/* Ordered Cars */}
              <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
                <h2 className="text-lg font-semibold">Ordered Cars</h2>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              {/* Available Cars */}
              <div className="bg-white rounded-lg shadow-md p-5">
                <h2 className="text-xl font-semibold mb-3">Available Cars</h2>
                <div className="h-32 flex items-center justify-center text-gray-400 available-cars-box">
                  Available cars data (DB connect here)
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Company Growth Graph */}
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

        {/* Last 5 Months Sales */}
        <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
          <h2 className="text-lg font-semibold">Last 5 Months Sales</h2>
          <div className="w-full h-64 sales-graph">
            <ResponsiveContainer>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="sales"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
