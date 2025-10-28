import React, { useEffect, useState } from "react";

export default function CarOwnersPage() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        // Fetch all owners
const res = await fetch("http://localhost:5000/api/owner/owners");
        if (!res.ok) throw new Error(`Failed to fetch owners: ${res.status}`);
        const data = await res.json();

        const formatted = data.map((owner) => ({
          ...owner,
          profilePic: owner.profilePic
            ? `http://localhost:5000${owner.profilePic}`
            : "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        }));

        setOwners(formatted);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };    
    fetchOwners();
  }, []);

 const handleDelete = async (ownerId) => {
  if (!window.confirm("Are you sure you want to delete this owner?")) return;

  try {
    // Delete owner
const res = await fetch(`http://localhost:5000/api/owner/owners/${ownerId}`, {
  method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Delete failed");

    // Remove deleted owner from state
    setOwners((prev) => prev.filter((owner) => owner._id !== ownerId));
    alert(data.msg);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


  if (loading)
    return (
      <div className="flex justify-center items-center h-full text-yellow-400 text-xl">
        Loading owners...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-full text-red-400 text-xl">
        Error: {error}
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-1">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
        Car Owners
      </h1>

      {owners.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No owners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {owners.map((owner) => (
            <div
              key={owner._id}
              className="relative bg-gray-100 text-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all flex flex-col"
            >
                {/* Delete Button */}
                <button
                    onClick={() => handleDelete(owner._id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition-all transform hover:scale-105"
                    >
                    Delete
                </button>

              <div className="flex flex-col items-center">
                <img
                src={owner.profilePic}
                alt={owner.ownerName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-yellow-400"
                />
                <h2 className="text-lg sm:text-xl font-semibold mt-3">{owner.ownerName}</h2>
                <p className="text-gray-500 text-xs sm:text-sm text-center">{owner.email}</p>

              </div>

              <div className="mt-4 space-y-1 text-sm">
                <p><strong>Shop:</strong> {owner.shopName}</p>
                <p><strong>Reg ID:</strong> {owner.businessRegId}</p>
                <p><strong>Phone:</strong> {owner.contactNumber}</p>
                <p><strong>Address:</strong> {owner.shopAddress}</p>
                <p><strong>Pin Code:</strong> {owner.pinCode}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
