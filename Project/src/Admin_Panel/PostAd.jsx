// PostAd.jsx
import React, { useState, useRef } from "react";
import Header from "./Header";
import axios from"axios";

const MAX_IMAGES = 20;
const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i); // last 30 years

export default function PostAd() {
  const [form, setForm] = useState({
    brand: "",
    year: "",
    fuel: "",
    transmission: "",
    kmsDriven: "",
    owners: "",
    title: "",
    description: "",
    price: "",
    state: "",
    phone: "",
  });

  const [images, setImages] = useState([]); // { file, url }
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef(null);

  // Basic validation for required fields
  function validate() {
    const e = {};
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.year) e.year = "Year is required";
    if (!form.fuel) e.fuel = "Fuel type is required";
    if (!form.transmission) e.transmission = "Transmission is required";
    if (!form.title.trim()) e.title = "Ad title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.price.trim()) e.price = "Price is required";
    if (!form.state) e.state = "State is required";
    if (!form.phone.trim()) e.phone = "Mobile number is required";
    // optional: images minimum? not required here
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleFilesSelected(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const availableSlots = MAX_IMAGES - images.length;
    const toAdd = files.slice(0, availableSlots);

    const mapped = toAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);
    // reset input so same file can be re-selected if removed
    e.target.value = null;
  }

  function removeImage(index) {
    setImages((prev) => {
      const next = [...prev];
      // revoke object URL to avoid memory leak
      URL.revokeObjectURL(next[index].url);
      next.splice(index, 1);
      return next;
    });
  }

  function handleClearAllImages() {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    setSuccessMsg("");

    // Build payload (for now we'll log it). Later send to backend (FormData if sending files).
    const payload = {
      ...form,
      images: images.map((i) => i.file.name), // just filenames for demo
    };

    
    // Build FormData to send files + fields
    const formData = new FormData();
    formData.append("brand", form.brand);
    formData.append("year", form.year);
    formData.append("fuel", form.fuel);
    formData.append("transmission", form.transmission);
    formData.append("kmsDriven", form.kmsDriven);
    formData.append("noOfOwners", form.owners);        // 🔁 FIX
    formData.append("adTitle", form.title);            // 🔁 FIX
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("state", form.state);
    formData.append("mobilePhone", form.phone);        // 🔁 FIX
    images.forEach((img) => formData.append("images", img.file));


    const token = localStorage.getItem("accessToken")

try {
  // Send to backend (Cloudinary + MongoDB)
  const res = await axios.post("http://localhost:5000/api/product/create", formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" , Authorization: `Bearer ${token}`, },
  });

  console.log("Backend response:", res.data);
  setSuccessMsg("Your ad has been successfully posted!");
} catch (err) {
  console.error("Error posting ad:", err);
  setErrors({ general: "Failed to post ad. Please try again." });
} finally {
  setSubmitting(false);
  setTimeout(() => setSuccessMsg(""), 4000);
}

    setSubmitting(false);
    setSuccessMsg("Your ad has been prepared — ready to send to backend!");
    // optionally clear form:
    // setForm({ brand: "", year: "", ... });
    // handleClearAllImages();

    // Auto-clear success message after 4s
    setTimeout(() => setSuccessMsg(""), 4000);
  }

  return (
    
    <div className="min-h-screen bg-gray-50 flex justify-center p-6 md:p-12 fixed inset-0 overflow-auto">
      <div className="max-w-4xl w-full bg-white shadow-sm border rounded-lg flex flex-col">
        {/* Sticky Header */}
        <div className="md:w-full shadow-md sticky top-0 z-10 bg-white">
            <Header />
        </div>
        {/* Page Title */}
        <header className="px-6 py-5 border-b sticky top-16 bg-white z-10">
          <h1 className="text-center text-lg md:text-2xl font-semibold">POST YOUR AD</h1>
        </header>
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)] p-6">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {successMsg && (
            <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-800">
              {successMsg}
            </div>
          )}

          <section>
            <h2 className="text-sm font-medium text-gray-700 mb-3">INCLUDE SOME DETAILS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Brand *</label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.brand ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
                  }`}
                  placeholder="Select or type brand"
                />
                {errors.brand && <p className="text-sm text-red-500 mt-1">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Year *</label>
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.year ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
                  }`}
                >
                  <option value="">Select year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {errors.year && <p className="text-sm text-red-500 mt-1">{errors.year}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Fuel *</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {["Petrol", "Diesel", "Electric", "CNG/Hybrid"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setForm((s) => ({ ...s, fuel: f }))}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        form.fuel === f ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                {errors.fuel && <p className="text-sm text-red-500 mt-1">{errors.fuel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Transmission *</label>
                <div className="mt-1 flex gap-2">
                  {["Manual", "Automatic"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((s) => ({ ...s, transmission: t }))}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        form.transmission === t ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.transmission && <p className="text-sm text-red-500 mt-1">{errors.transmission}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">KMs Driven</label>
                <input
                  name="kmsDriven"
                  value={form.kmsDriven}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="e.g. 45,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">No. of Owners</label>
                <div className="mt-1 flex gap-2">
                  {["1st", "2nd", "3rd", "4th", "4+"].map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setForm((s) => ({ ...s, owners: o }))}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        form.owners === o ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={70}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.title ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
                  }`}
                  placeholder="e.g. Maruti Swift VXI 2019 in great condition"
                />
                <p className="text-xs text-gray-400 mt-1">{form.title.length}/70</p>
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  maxLength={2000}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.description ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
                  }`}
                  placeholder="Provide details like condition, service history, mods, reason for selling..."
                />
                <p className="text-xs text-gray-400 mt-1">{form.description.length}/2000</p>
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium text-gray-700 mb-3">SET A PRICE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹) *</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  inputMode="numeric"
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.price ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
                  }`}
                  placeholder="e.g. 350000"
                />
                {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
              </div>
            </div>
          </section>

          <section>
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
                onClick={(e) => {
                  if (images.length >= MAX_IMAGES) e.preventDefault();
                }}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z" />
                </svg>
                <span className="text-sm text-gray-700">Add Photos</span>
                <span className="text-xs text-gray-400 ml-2">({images.length}/{MAX_IMAGES})</span>
              </label>

              {images.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllImages}
                  className="text-sm text-red-600 underline"
                >
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
                    aria-label={`Remove image ${idx + 1}`}
                  >
                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Empty placeholders for visual grid up to 20 (optional) */}
              {Array.from({ length: Math.max(0, Math.min(5, 5 - images.length)) }).map((_, i) => (
                <div key={`ph-${i}`} className="hidden md:block rounded border border-dashed border-gray-200 bg-white h-20" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium text-gray-700 mb-3">CONFIRM YOUR LOCATION</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">State *</label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.state ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
                  }`}
                >
                  <option value="">Select state</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="delhi">Delhi</option>
                  <option value="uttar_pradesh">Uttar Pradesh</option>
                  <option value="tamil_nadu">West Bengal</option>
                </select>
                {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Phone *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                    errors.phone ? "border-red-500" : "border-blue-500 focus:border-blue-600 focus:ring-3 focus:ring-blue-600"
                  }`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                <p className="text-xs text-gray-400 mt-1">We will send a verification code to this number.</p>
              </div>
            </div>
          </section>

          <footer className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">Review your details before posting.</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    brand: "",
                    year: "",
                    fuel: "",
                    transmission: "",
                    kmsDriven: "",
                    owners: "",
                    title: "",
                    description: "",
                    price: "",
                    state: "",
                    phone: "",
                  });
                  setErrors({});
                  handleClearAllImages();
                }}
                className="px-4 py-2 rounded-md border text-sm"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {submitting ? "Posting..." : "Post now"}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
    </div>
  );
}
