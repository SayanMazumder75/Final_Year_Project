import React, { useState } from "react";
import Header from "./Header";
import Footer from "../Homepage/Footer";
import Sidebar from "./Sidebar";

export default function Profile() {
  const [admin, setAdmin] = useState({
    profilepic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVE3Ygc1sWvufaY_668044fRxmL_9CB349g&s",
    fullname: "Rashmika Mandanna",
    username: "Rashmika_user",
    email: "Rashmika2@gmail.com",
    phone: "4567890123",
    role: "Admin",
    datejoined: "2025-01-13",
    status: "Active",
    password: "123",
  });

  const [open, setOpen] = useState(false);
   // Simple alert handler for future features
  const handleFeatureComing = (feature) => {
    alert(`${feature} feature is coming soon!`);
  };


  return (
    <div className="flex h-screen bg-gray-700">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="bg-gray-700 flex items-center justify-center p-6">
          <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6">
            {/* Header */}
            <div className="flex items-center space-x-6 border-b pb-4 mb-4">
              <img
                src={admin.profilepic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
              />
              <div>
                <h2 className="text-2xl font-semibold">{admin.fullname}</h2>
                <p className="text-gray-600">@{admin.username}</p>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    admin.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {admin.status}
                </span>
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{admin.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">{admin.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="font-medium">{admin.role}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Date Joined</p>
                <p className="font-medium">{admin.datejoined}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
               onClick={() => handleFeatureComing("Edit Profile")} 
              className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600">
                Edit Profile
              </button>
              <button
               onClick={() => handleFeatureComing("Change Password")}
              className="px-4 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300">
                Change Password
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
