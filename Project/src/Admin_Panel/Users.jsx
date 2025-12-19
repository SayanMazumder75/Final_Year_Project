import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "../Homepage/Footer";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const [users] = useState([
    { id: "U001", name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", address: "Delhi, India", joined: "2024-01-12", type: "Bought" },
    { id: "U002", name: "Priya Verma", email: "priya@example.com", phone: "9123456780", address: "Mumbai, India", joined: "2024-02-20", type: "Rented" },
    { id: "U003", name: "Amit Singh", email: "amit@example.com", phone: "9988776655", address: "Bangalore, India", joined: "2024-03-15", type: "Bought" },
    { id: "U004", name: "Sneha Kapoor", email: "sneha@example.com", phone: "9765432100", address: "Pune, India", joined: "2024-04-05", type: "Rented" },
    { id: "U005", name: "Ravi Mehta", email: "ravi@example.com", phone: "9811122233", address: "Kolkata, India", joined: "2024-04-12", type: "Bought" },
    { id: "U006", name: "Anjali Das", email: "anjali@example.com", phone: "9999999999", address: "Chennai, India", joined: "2024-04-20", type: "Rented" },
    { id: "U007", name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", address: "Delhi, India", joined: "2024-01-12", type: "Bought" },
    { id: "U008", name: "Priya Verma", email: "priya@example.com", phone: "9123456780", address: "Mumbai, India", joined: "2024-02-20", type: "Rented" },
    { id: "U009", name: "Amit Singh", email: "amit@example.com", phone: "9988776655", address: "Bangalore, India", joined: "2024-03-15", type: "Bought" },
    { id: "U010", name: "Sneha Kapoor", email: "sneha@example.com", phone: "9765432100", address: "Pune, India", joined: "2024-04-05", type: "Rented" },
    { id: "U011", name: "Ravi Mehta", email: "ravi@example.com", phone: "9811122233", address: "Kolkata, India", joined: "2024-04-12", type: "Bought" },
    { id: "U012", name: "Anjali Das", email: "anjali@example.com", phone: "9999999999", address: "Chennai, India", joined: "2024-04-20", type: "Rented" },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.id.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "All" ? true : user.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentItems.length === 0 && filteredUsers.length > 0) {
      setCurrentPage(1);
    }
  }, [filteredUsers]);

  return (
    <div className="flex h-screen bg-gray-700 overflow-hidden">
      {/* Sidebar */}
      
      

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

        <main className="mt-6 px-6">
          <h1 className="text-2xl font-semibold mb-6 text-white">Users</h1>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by User ID, Email, or Name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 bg-white"
            />
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 bg-white"
            >
              <option value="All">All</option>
              <option value="Bought">Bought</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Address</th>
                  <th className="px-4 py-2 border">Joined</th>
                  <th className="px-4 py-2 border">Type</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{user.id}</td>
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.phone}</td>
                      <td className="px-4 py-2 border">{user.address}</td>
                      <td className="px-4 py-2 border">{user.joined}</td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.type === "Bought"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {user.type}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500 font-medium">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Dropdown Pagination */}
            {filteredUsers.length > itemsPerPage && (
              <div className="flex justify-center items-center mt-4">
                <label htmlFor="pageSelect" className="mr-2 text-sm text-gray-600">
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
        </main>

        <Footer />
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center animate-fade-in">
            <h2 className="text-lg font-semibold mb-2 text-red-600">No Users Found</h2>
            <p className="text-gray-600">No users match your search or filter.</p>
          </div>
        </div>
      )}
    </div>
  );
}
