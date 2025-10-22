import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "../Homepage/Footer";
import Sidebar from "./Sidebar";
import './Profile.css';

const OwnerManagement = () => {
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({
    name: "",
    phone: "+91 ",
    city: "",
    dealershipName: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use your existing backend URL
  const API_URL = "http://localhost:5000/owner";

  // Fetch owners from your backend
  const fetchOwners = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/owners`, {
        credentials: 'include' // Important for cookies/sessions
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch owners: ${response.status}`);
      }
      
      const data = await response.json();
      setOwners(data);
      setError("");
    } catch (err) {
      setError("Error fetching owners: " + err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load owners on component mount
  useEffect(() => {
    fetchOwners();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOwner(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add owner to your backend
  const handleAddOwner = async (e) => {
    e.preventDefault();
    
    if (!newOwner.name || !newOwner.dealershipName || !newOwner.city) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/owners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newOwner),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add owner');
      }

      // Update local state
      setOwners(prev => [...prev, data]);
      setNewOwner({
        name: "",
        phone: "+91 ",
        city: "",
        dealershipName: ""
      });
      setShowForm(false);
      setError("");
      alert("Owner added successfully!");
    } catch (err) {
      setError("Error adding owner: " + err.message);
      console.error("Add owner error:", err);
      alert(err.message || "Failed to add owner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete owner from your backend
  const handleDeleteOwner = async (ownerId) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/owners/${ownerId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete owner');
      }

      // Update local state
      setOwners(prev => prev.filter(owner => owner._id !== ownerId));
      setError("");
      alert("Owner deleted successfully!");
    } catch (err) {
      setError("Error deleting owner: " + err.message);
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete owner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <Header />
      
      <div className="admin-main">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="admin-content">
          <div className="owner-management">
            {/* Header Section */}
            <div className="owner-header">
              <h2>Owner Management</h2>
              <button 
                className="add-owner-btn"
                onClick={() => setShowForm(!showForm)}
                disabled={loading}
              >
                {showForm ? 'Cancel' : '+ Add Owner'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="loading-spinner">
                Loading...
              </div>
            )}

            {/* Add Owner Form */}
            {showForm && (
              <div className="add-owner-form">
                <h3>Add New Owner</h3>
                <form onSubmit={handleAddOwner}>
                  <div className="form-group">
                    <label>Owner Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newOwner.name}
                      onChange={handleInputChange}
                      placeholder="Enter owner name"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newOwner.phone}
                      onChange={handleInputChange}
                      placeholder="+91 1234567890"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Dealership Name *</label>
                    <input
                      type="text"
                      name="dealershipName"
                      value={newOwner.dealershipName}
                      onChange={handleInputChange}
                      placeholder="Enter dealership name"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={newOwner.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={loading}
                    >
                      {loading ? 'Adding...' : 'Add Owner'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Owners List */}
            <div className="owners-list">
              <h3>Existing Owners ({owners.length})</h3>
              {owners.length === 0 && !loading ? (
                <div className="no-owners">
                  <p>No owners added yet. Click "Add Owner" to get started.</p>
                </div>
              ) : (
                <div className="owners-grid">
                  {owners.map(owner => (
                    <div key={owner._id} className="owner-card">
                      <div className="owner-info">
                        <h4>{owner.dealershipName}</h4>
                        <p><strong>Owner:</strong> {owner.name}</p>
                        <p><strong>Phone:</strong> {owner.phone}</p>
                        <p><strong>City:</strong> {owner.city}</p>
                        <p className="owner-date">
                          Added: {new Date(owner.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="owner-actions">
                        <button className="edit-btn" disabled={loading}>
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteOwner(owner._id)}
                          disabled={loading}
                        >
                          {loading ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OwnerManagement;