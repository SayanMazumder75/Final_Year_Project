import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "../Homepage/Footer";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch buyers from backend
  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/buyer");
        const data = await response.json();
        if (data.success) setBuyers(data.buyers);
        else alert("Failed to load buyers");
      } catch (error) {
        console.error("Error fetching buyers:", error);
        alert("Error fetching buyer data");
      }
    };
    fetchBuyers();
  }, []);

  // Search filter
  const filteredBuyers = buyers.filter((buyer) =>
    buyer.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredBuyers.length / itemsPerPage);
  const currentItems = filteredBuyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentItems.length === 0 && filteredBuyers.length > 0) {
      setCurrentPage(1);
    }
  }, [filteredBuyers]);

  // Stats
  const totalBuyers = buyers.length;
  const testDriveCount = buyers.filter((b) => b.testDrive === "Yes").length;
  const totalOnlinePayments = buyers.filter(
    (b) => b.payment !== "Cash"
  ).length;

  return (
    <div className="flex h-screen bg-gray-700 overflow-hidden">
      {/* Sidebar */}
      <div className="md:sticky md:top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      {/* Overlay for small screens */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${
          open
            ? "opacity-30 pointer-events-none md:opacity-100 md:pointer-events-auto"
            : "opacity-100"
        }`}
      >
        {!open && (
          <div className="w-full shadow-md sticky top-0 z-10 bg-white">
            <Header />
          </div>
        )}

        <div className="flex-1 px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-x-hidden md:max-w-1500">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            {/* Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">
                Buyer Details
              </h2>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
              <table className="min-w-full text-gray-700 text-xs sm:text-sm">
                <thead className="bg-gray-100 text-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Name</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Phone</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Email</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Car</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Color</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Price Range</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Payment</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Test Drive</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((buyer, index) => (
                      <tr
                        key={buyer._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition`}
                      >
                        <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium text-blue-900">
                          {buyer.name}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{buyer.phone}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{buyer.email}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{buyer.car}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{buyer.color}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{buyer.priceRange}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{buyer.payment}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{buyer.testDrive}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-4 text-gray-500 italic"
                      >
                        No buyers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {filteredBuyers.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-4">
                  <label
                    htmlFor="pageSelect"
                    className="mr-2 text-sm text-gray-600"
                  >
                    Page:
                  </label>
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
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                Total Buyers
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 sm:mt-2">
                {totalBuyers}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                Test Drive Requests
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1 sm:mt-2">
                {testDriveCount}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                Online Payments
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1 sm:mt-2">
                {totalOnlinePayments}
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}