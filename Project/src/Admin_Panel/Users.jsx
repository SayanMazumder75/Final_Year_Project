import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Users() {
  const [open, setOpen] = useState(false); // sidebar toggle
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All"); // dropdown filter
  const [showPopup, setShowPopup] = useState(false); // popup state

  // Auto-hide popup after 3s
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Dummy user data (replace with DB later)
  const [users] = useState([
    {
      id: "U001",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      address: "Delhi, India",
      joined: "2024-01-12",
      type: "Bought",
    },
    {
      id: "U002",
      name: "Priya Verma",
      email: "priya@example.com",
      phone: "9123456780",
      address: "Mumbai, India",
      joined: "2024-02-20",
      type: "Rented",
    },
    {
      id: "U003",
      name: "Amit Singh",
      email: "amit@example.com",
      phone: "9988776655",
      address: "Bangalore, India",
      joined: "2024-03-15",
      type: "Bought",
    },
    {
      id: "U004",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Rented",
    },
    {
      id: "U005",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Rented",
    },
    {
      id: "U006",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Rented",
    },
    {
      id: "U007",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Rented",
    },
    {
      id: "U008",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Bought",
    },
    {
      id: "U009",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Rented",
    },
    {
      id: "U010",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Bought",
    },
    {
      id: "U011",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Rented",
    },
    {
      id: "U012",
      name: "Sneha Kapoor",
      email: "sneha@example.com",
      phone: "9765432100",
      address: "Pune, India",
      joined: "2024-04-05",
      type: "Rented",
    },
  ]);

  // Search + Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.id.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "All" ? true : user.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100">
        <Header setOpen={setOpen} />

        <div className="p-6 max-h-[500px]">
          <h1 className="text-2xl font-semibold mb-4">Users</h1>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by User ID, Email, or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-violet-400"
            />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-violet-400"
            >
              <option value="All">All</option>
              <option value="Bought">Bought</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="bg-white shadow-lg rounded-2xl overflow-x-auto overflow-y-auto max-h-[500px] max-sm:max-h-[640px]">
            <table className="w-full border-collapse">
              <thead className="sticky top-0">
                <tr className="bg-violet-400 text-left text-sm text-black">
                  <th className="p-3">User ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Joined</th>
                  <th className="p-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b text-sm hover:bg-gray-100"
                    >
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.address}</td>
                      <td className="p-3">{user.joined}</td>
                      <td className="p-3">
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
                  (() => {
                    if (!showPopup) {
                      setShowPopup(true);
                      setSearch(""); // 🔹 clear search box when no users found
                    }
                    return null;
                  })()
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center animate-fade-in">
            <h2 className="text-lg font-semibold mb-2 text-red-600">
              No Users Found
            </h2>
            <p className="text-gray-600">
              No users match your search or filter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
