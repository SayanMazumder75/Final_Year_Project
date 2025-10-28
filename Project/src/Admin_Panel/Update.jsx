// src/components/Update.jsx
import React from "react";

export default function Update({ formData, setFormData, handleProfileUpdate, cancelEdit }) {
    const [form, setForm] = React.useState(formData);
    // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email !== form.confirmEmail) {
      alert("Email do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ownerName", form.ownerName);
      formData.append("ownerCode", import.meta.env.VITE_OWNER_CODE);
      formData.append("contactNumber", form.number);
      formData.append("shopAddress", form.address);
      formData.append("pinCode", form.pin);
      formData.append("shopName", form.shopName);
      formData.append("businessRegId", form.registration);

      const { data } = await axios.post(
        "http://localhost:5000/owner/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(data.msg || "Owner update successfully!");
      window.location.href = "/Profile";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Update failed");
    }
  };
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
          className="border p-2 rounded"
        />
       
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 rounded bg-gray-300 cursor-not-allowed"
          disabled
        />
        <input
          type="number"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          className="border p-2 rounded"
          
        />
        <input
          type="text"
          placeholder="Shop Name"
          value={formData.shopName}
          onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Business Reg ID"
          value={formData.businessRegId}
          onChange={(e) => setFormData({ ...formData, businessRegId: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Shop Address"
          value={formData.shopAddress}
          onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Pin Code"
          value={formData.pinCode}
          onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handleProfileUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={cancelEdit}
          className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
