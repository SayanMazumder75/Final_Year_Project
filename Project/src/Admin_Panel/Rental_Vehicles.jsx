import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "../Homepage/Footer";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Rows per page

  const rentedVehicles = [
    { id: 1, customerId: "CUST-R01", name: "Toyota Innova", dailyRate: 50, rentedDays: 12, customer: "John Doe", startDate: "2025-08-01", endDate: "2025-08-12" },
    { id: 2, customerId: "CUST-R02", name: "Honda City", dailyRate: 40, rentedDays: 15, customer: "Jane Smith", startDate: "2025-08-03", endDate: "2025-08-17" },
    { id: 3, customerId: "CUST-R03", name: "Maruti Suzuki Swift", dailyRate: 30, rentedDays: 20, customer: "Alice Johnson", startDate: "2025-08-05", endDate: "2025-08-25" },
    { id: 4, customerId: "CUST-R04", name: "Mahindra Scorpio", dailyRate: 60, rentedDays: 10, customer: "Bob Williams", startDate: "2025-08-07", endDate: "2025-08-17" },
    { id: 5, customerId: "CUST-R05", name: "Hyundai Creta", dailyRate: 55, rentedDays: 8, customer: "Eve Davis", startDate: "2025-08-10", endDate: "2025-08-18" },
    { id: 6, customerId: "CUST-R06", name: "Ford EcoSport", dailyRate: 45, rentedDays: 14, customer: "Charlie Brown", startDate: "2025-08-12", endDate: "2025-08-26" },
  ];

  // Calculate revenue
  const vehiclesWithRevenue = rentedVehicles.map(vehicle => ({
    ...vehicle,
    revenue: vehicle.dailyRate * vehicle.rentedDays
  }));

  // Filter by search
  const filteredVehicles = vehiclesWithRevenue.filter(vehicle =>
    vehicle.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const currentItems = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentItems.length === 0 && filteredVehicles.length > 0) {
      setCurrentPage(1);
    }
  }, [filteredVehicles]);

  // Dynamic stats
  const totalVehicles = vehiclesWithRevenue.length;
  const totalRevenue = vehiclesWithRevenue.reduce((sum, v) => sum + v.revenue, 0);
  const totalRentedDays = vehiclesWithRevenue.reduce((sum, v) => sum + v.rentedDays, 0);

  return (
    <div className="flex h-screen bg-gray-700 overflow-hidden">
      <div className="md:sticky md:top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className={`flex-1 flex flex-col overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${open ? "opacity-30 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100"}`}>
        {!open && (
          <div className="w-full shadow-md sticky top-0 z-10 bg-white">
            <Header />
          </div>
        )}

        <div className="flex-1 px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-x-auto md:max-w-1500">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            {/* Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">Rented Vehicles</h2>
              <input
                type="text"
                placeholder="Search by vehicle name..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
              <table className="min-w-full text-gray-700 text-xs sm:text-sm">
                <thead className="bg-gray-100 text-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Vehicle Name</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Customer Id</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Customer</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Start Date</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">End Date</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Daily Rate</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Rented Days</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? currentItems.map((vehicle, index) => (
                    <tr key={vehicle.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}>
                      <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium text-blue-900">{vehicle.name}</td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">{vehicle.customerId}</td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">{vehicle.customer}</td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">{vehicle.startDate}</td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">{vehicle.endDate}</td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">₹{vehicle.dailyRate}</td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4">{vehicle.rentedDays}</td>
                      <td className="py-2 px-3 sm:py-3 sm:px-4 font-semibold text-green-600">₹{vehicle.revenue}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-gray-500 italic">No vehicles found</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Dropdown */}
              {filteredVehicles.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-4">
                  <label htmlFor="pageSelect" className="mr-2 text-sm text-gray-600">Page:</label>
                  <select
                    id="pageSelect"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} / {totalPages}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Vehicles Rented</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 sm:mt-2">{totalVehicles}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1 sm:mt-2">₹{totalRevenue}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Rented Days</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1 sm:mt-2">{totalRentedDays} Days</p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
