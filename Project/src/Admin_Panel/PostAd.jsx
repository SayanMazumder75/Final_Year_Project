// PostAd.jsx
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";

const MAX_IMAGES = 20;
const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
const STATES = ["Maharashtra", "Karnataka", "Delhi", "Uttar Pradesh", "Tamil Nadu", "West Bengal"];

// InputField Component
const InputField = ({ label, name, value, onChange, placeholder, error, type = "text", readOnly }) => (
  <div>
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      readOnly={readOnly}
      className={`mt-1 block w-full rounded-md border px-3 py-2 ${
        error ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
      } ${readOnly ? "cursor-not-allowed text-center" : ""}`}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

// SelectField Component
const SelectField = ({ label, name, value, onChange, options = [], error, placeholder = "Select" }) => (
  <div>
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full rounded-md border px-3 py-2 ${
        error ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

// ButtonGroup Component
const ButtonGroup = ({ label, options = [], selected, onSelect }) => (
  <div>
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <div className="mt-1 flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`px-3 py-1 border rounded-md text-sm ${
            selected === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

// ImageUploader Component
const ImageUploader = ({ images, setImages }) => {
  const fileInputRef = useRef(null);

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));
    e.target.value = null;
  };

  const removeImage = (index) => setImages((prev) => prev.filter((_, i) => i !== index));
  const clearAll = () => setImages([]);

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-3">UPLOAD UP TO 20 PHOTOS</h2>
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
          id="imageUploader"
        />
        <label
          htmlFor="imageUploader"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer ${
            images.length >= MAX_IMAGES ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
          onClick={(e) => images.length >= MAX_IMAGES && e.preventDefault()}
        >
          <span className="text-sm text-gray-700">Add Photos</span>
          <span className="text-xs text-gray-400 ml-2">({images.length}/{MAX_IMAGES})</span>
        </label>
        {images.length > 0 && (
          <button type="button" onClick={clearAll} className="text-sm text-red-600 underline">
            Clear all
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <div key={idx} className="relative rounded border overflow-hidden bg-gray-100">
            <img src={img.url} alt={`preview-${idx}`} className="object-cover w-full h-28 md:h-20" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main PostAd Component
export default function PostAd() {
  const [owner, setOwner] = useState(null);
  const [form, setForm] = useState({
    email: "", brand: "", year: "", fuel: "", transmission: "", kmsDriven: "",
    owners: "", title: "", description: "", price: "", state: "", phone: "", adType: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("You must be logged in.");
        const res = await fetch("http://localhost:5000/api/owner/me", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setOwner(data);
        setForm((prev) => ({ ...prev, email: data.email || "" }));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchOwner();
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    const newErrors = {};
    ["brand","year","fuel","transmission","title","description","price","state","phone","adType"].forEach(field => {
      if(!form[field]) newErrors[field] = `${field} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true); setError(""); setSuccessMsg("");
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("You must be logged in.");

      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      images.forEach(img => formData.append("images", img.file));

      const res = await fetch("http://localhost:5000/api/product/create", {
        method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      await res.json();
      setSuccessMsg("Ad posted successfully!");
      setForm({ email: owner?.email || "", brand:"", year:"", fuel:"", transmission:"", kmsDriven:"",
        owners:"", title:"", description:"", price:"", state:"", phone:"", adType:"" });
      setImages([]); setErrors({});
    } catch (err) {
      setError(err.message);
    } finally { setSubmitting(false); }
  };

  if(loading) return <p className="text-center mt-10">Loading...</p>;
  if(error && !submitting) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-500 flex justify-center p-6 md:p-12 fixed inset-0 overflow-auto">
      <div className="max-w-4xl w-full bg-gray-200 shadow-sm border rounded-lg flex flex-col">
        <div className="md:w-full shadow-md sticky top-0 z-10 bg-gray-100"><Header /></div>
        <header className="px-6 py-3 border-b sticky top-16 bg-white z-10">
          <h1 className="text-center text-lg md:text-2xl font-semibold">POST YOUR AD</h1>
        </header>
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)] p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {successMsg && <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-800">{successMsg}</div>}

            <InputField label="Email" name="email" value={owner?.email || ""} readOnly placeholder="Your Email Address" />

            <h2 className="text-sm font-medium text-gray-700 mb-3">INCLUDE SOME DETAILS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Brand *" name="brand" value={form.brand} onChange={handleChange} placeholder="Select or type brand" error={errors.brand}/>
              <SelectField label="Year *" name="year" value={form.year} onChange={handleChange} options={YEARS} error={errors.year} placeholder="Select year"/>
              <ButtonGroup label="Fuel *" options={["Petrol","Diesel","Electric","CNG/Hybrid"]} selected={form.fuel} onSelect={(f)=>setForm(s=>({...s,fuel:f}))}/>
              <ButtonGroup label="Transmission *" options={["Manual","Automatic"]} selected={form.transmission} onSelect={(t)=>setForm(s=>({...s,transmission:t}))}/>
              <InputField label="KMs Driven" name="kmsDriven" value={form.kmsDriven} onChange={handleChange} placeholder="e.g. 45000"/>
              <ButtonGroup label="No. of Owners" options={["1st","2nd","3rd","4th","4+"]} selected={form.owners} onSelect={(o)=>setForm(s=>({...s,owners:o}))}/>
            </div>

            <InputField label="Ad title *" name="title" value={form.title} onChange={handleChange} placeholder="Ad title" error={errors.title}/>
            <InputField label="Description *" name="description" value={form.description} onChange={handleChange} placeholder="Description" error={errors.description}/>

            <InputField label="Price (₹) *" type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 350000" error={errors.price}/>

            <ImageUploader images={images} setImages={setImages}/>

            <SelectField label="Ad Type *" name="adType" value={form.adType} onChange={handleChange} options={["sell","rent"]} error={errors.adType} placeholder="Select option"/>

            <SelectField label="State *" name="state" value={form.state} onChange={handleChange} options={STATES} error={errors.state} placeholder="Select state"/>
            <InputField label="Mobile Phone *" type="number" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 9876543210" error={errors.phone}/>

            <button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mt-4">
              {submitting ? "Posting..." : "Post Ad"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
