import React, { useState } from "react";
import { Plus, Trash, Search } from "lucide-react";
import Sidebar from "./Sidebar"; // import Sidebar component

export default function WebOwnerDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
  const [carOwners, setCarOwners] = useState([
    { id: 1, name: "Robert Brown", cars: 2 },
    { id: 2, name: "Alice Green", cars: 1 },
  ]);
  const [cars, setCars] = useState([
    { id: 1, model: "Toyota Corolla", owner: "Robert Brown" },
    { id: 2, model: "Honda Civic", owner: "Alice Green" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", email: "", model: "", owner: "" });

  // Filter data based on search
  const filteredData = (data) =>
    data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  // Add new item
  const handleAdd = () => {
    if (activeTab === "users") {
      setUsers([...users, { id: users.length + 1, name: newItem.name, email: newItem.email }]);
    } else if (activeTab === "carOwners") {
      setCarOwners([...carOwners, { id: carOwners.length + 1, name: newItem.name, cars: 0 }]);
    } else if (activeTab === "cars") {
      setCars([...cars, { id: cars.length + 1, model: newItem.model, owner: newItem.owner }]);
    }
    setNewItem({ name: "", email: "", model: "", owner: "" });
  };

  // Delete item
  const handleDelete = (id) => {
    if (activeTab === "users") setUsers(users.filter((u) => u.id !== id));
    if (activeTab === "carOwners") setCarOwners(carOwners.filter((u) => u.id !== id));
    if (activeTab === "cars") setCars(cars.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
            {activeTab === "users" && "All Users"}
            {activeTab === "carOwners" && "Car Owners"}
            {activeTab === "cars" && "Cars"}
          </h1>

          {/* Search bar */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-1 w-full md:w-64">
            <Search size={18} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 outline-none text-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Add new item inputs */}
        <div className="flex flex-col md:flex-row mb-4 space-y-2 md:space-y-0 md:space-x-2">
          {activeTab === "users" && (
            <>
              <input
                type="text"
                placeholder="Name"
                className="px-3 py-2 rounded bg-gray-700 text-white outline-none flex-1"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="px-3 py-2 rounded bg-gray-700 text-white outline-none flex-1"
                value={newItem.email}
                onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
              />
            </>
          )}
          {activeTab === "carOwners" && (
            <input
              type="text"
              placeholder="Name"
              className="px-3 py-2 rounded bg-gray-700 text-white outline-none flex-1"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          )}
          {activeTab === "cars" && (
            <>
              <input
                type="text"
                placeholder="Model"
                className="px-3 py-2 rounded bg-gray-700 text-white outline-none flex-1"
                value={newItem.model}
                onChange={(e) => setNewItem({ ...newItem, model: e.target.value })}
              />
              <input
                type="text"
                placeholder="Owner"
                className="px-3 py-2 rounded bg-gray-700 text-white outline-none flex-1"
                value={newItem.owner}
                onChange={(e) => setNewItem({ ...newItem, owner: e.target.value })}
              />
            </>
          )}
          <button
            onClick={handleAdd}
            className="flex items-center bg-green-500 px-4 py-2 rounded hover:bg-green-600 justify-center md:justify-start"
          >
            <Plus size={18} className="mr-2" /> Add
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="text-left bg-gray-700">
                {activeTab === "users" && (
                  <>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Actions</th>
                  </>
                )}
                {activeTab === "carOwners" && (
                  <>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Cars Owned</th>
                    <th className="px-4 py-2">Actions</th>
                  </>
                )}
                {activeTab === "cars" && (
                  <>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Model</th>
                    <th className="px-4 py-2">Owner</th>
                    <th className="px-4 py-2">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {(activeTab === "users"
                ? filteredData(users)
                : activeTab === "carOwners"
                ? filteredData(carOwners)
                : filteredData(cars)
              ).map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-700 hover:bg-gray-600"
                >
                  {activeTab === "users" && (
                    <>
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.email}</td>
                    </>
                  )}
                  {activeTab === "carOwners" && (
                    <>
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.cars}</td>
                    </>
                  )}
                  {activeTab === "cars" && (
                    <>
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.model}</td>
                      <td className="px-4 py-2">{item.owner}</td>
                    </>
                  )}
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center justify-center w-full"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
