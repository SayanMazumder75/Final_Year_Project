import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "../Homepage/Footer";
import Update from "./Update";

export default function Profile() {
  const [owner, setOwner] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("You must be logged in to view this page.");
          setLoading(false);
          return;
        }

        console.log("Fetching owner profile with token:", token.substring(0, 20) + "...");

          
        const res = await fetch("http://localhost:5000/api/owner/me", {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server response:", errorText);
          throw new Error(`Failed to fetch profile: ${res.status}`);
        }

        const data = await res.json();
        console.log("Owner data received:", data);

        let profilePicUrl = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
        if (data.profilePic) {
          // If it's already a full URL, use it directly
          if (data.profilePic.startsWith('http')) {
            profilePicUrl = data.profilePic;
          } else {
            // If it's a path, construct the full URL
            profilePicUrl = `http://localhost:5000${data.profilePic}`;
          }
        }

        const ownerData = {
          ...data,
          profilePic: profilePicUrl
        };

        setOwner(ownerData);
        setFormData({
          ownerName: data.ownerName || "",
          email: data.email || "",
          contactNumber: data.contactNumber || "",
          shopName: data.shopName || "",
          businessRegId: data.businessRegId || "",
          shopAddress: data.shopAddress || "",
          pinCode: data.pinCode || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOwner();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5000/api/owner/profile", { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      
      let profilePicUrl = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
      if (updated.profilePic) {
        profilePicUrl = updated.profilePic.startsWith('http') 
          ? updated.profilePic 
          : `http://localhost:5000${updated.profilePic}`;
      }

      setOwner({
        ...updated,
        profilePic: profilePicUrl
      });
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleFeatureComing = (feature) => {
    alert(`${feature} feature coming soon!`);
  };

  if (loading) return <p className="text-white p-6">Loading owner profile...</p>;
  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;
  if (!owner) return <p className="text-white p-6">No owner data found.</p>;

  return (
    <div className="flex h-screen bg-gray-700">
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="bg-gray-700 flex items-center justify-center p-6">
          <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6">
            <div className="flex items-center space-x-6 border-b pb-4 mb-4">
              <img
                src={owner.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
              />
              <div>
                <h2 className="text-2xl font-semibold">{owner.ownerName}</h2>
                <p className="text-gray-600">{owner.email}</p>
                <span
                  className={`px-3 py-1 text-sm rounded-full bg-green-100 text-green-700`}
                >
                  {owner.userType || "Owner"}
                </span>
              </div>
            </div>

            {/* View or Edit Mode */}
            {!editing ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-medium">{owner.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="font-medium">{owner.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Shop Name</p>
                    <p className="font-medium">{owner.shopName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Business Reg ID</p>
                    <p className="font-medium">{owner.businessRegId}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-gray-500 text-sm">Shop Address</p>
                    <p className="font-medium">{owner.shopAddress}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Pin Code</p>
                    <p className="font-medium">{owner.pinCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Role</p>
                    <p className="font-medium">{owner.userType || "Owner"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Date Joined</p>
                    <p className="font-medium">
                      {owner.createdAt ? new Date(owner.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => handleFeatureComing("Change Password")}
                    className="px-4 py-2 bg-green-300 rounded-xl shadow hover:bg-green-500"
                  >
                    Change Password
                  </button>
                </div>
              </>
            ) : (
              <Update
                formData={formData}
                setFormData={setFormData}
                handleProfileUpdate={handleProfileUpdate}
                cancelEdit={() => setEditing(false)}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}