// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Footer from "../Homepage/Footer";
// import RelatedProducts from "../RelatedProducts/RelatedProducts";

// export default function Details() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const carData = location.state?.carData || {};

//   const photos = Array.isArray(carData.photos)
//     ? carData.photos
//     : carData.photos
//     ? [carData.photos]
//     : ["https://via.placeholder.com/1200x600?text=No+Image+Available"];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (photos.length <= 1) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % photos.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [photos]);

//   const handlePrev = () =>
//     setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
//   const handleNext = () =>
//     setCurrentIndex((prev) => (prev + 1) % photos.length);

//   const handleRentNow = () => navigate("/CarRentalForm", { state: { carData } });
//   const handleBuyNow = () => navigate("/BuyCarPage", { state: { carData } });

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       {/* Back Link */}
//       <Link
//         to="/User_Dashboard"
//         className="inline-block mb-6 text-blue-600 hover:underline"
//       >
//         ← Back to Dashboard
//       </Link>

//       {/* Layout: Image Gallery Left + Details Right */}
//       <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 items-start max-w-7xl mx-auto">
//         {/* LEFT SIDE — Image Gallery */}
//         <div className="flex flex-col items-center">
//           <div className="relative w-full">
//             <img
//               src={photos[currentIndex]}
//               alt={`Car ${currentIndex + 1}`}
//               className="w-full h-[420px] object-cover rounded-lg transition-opacity duration-500"
//             />

//             {photos.length > 1 && (
//               <>
//                 <button
//                   onClick={handlePrev}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-3 py-2 rounded-full hover:bg-black/80"
//                 >
//                   ❮
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-3 py-2 rounded-full hover:bg-black/80"
//                 >
//                   ❯
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Thumbnails */}
//           {photos.length > 1 && (
//             <div className="flex flex-wrap justify-center gap-3 mt-4">
//               {photos.map((photo, i) => (
//                 <img
//                   key={i}
//                   src={photo}
//                   alt={`Thumbnail ${i + 1}`}
//                   onClick={() => setCurrentIndex(i)}
//                   className={`w-20 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
//                     i === currentIndex
//                       ? "border-blue-600 opacity-100"
//                       : "border-transparent opacity-70 hover:opacity-100"
//                   }`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE — Car Details */}
//         <div className="space-y-6">
//           <h1 className="text-3xl font-semibold text-gray-800">
//             {carData.brand || "Car Name"}{" "}
//             {carData.year ? `(${carData.year})` : ""}
//           </h1>

//           {/* Price Section */}
//           <div className="space-y-2 text-gray-700">
            
//             <div>
//               <strong>Purchase Price:</strong>{" "}
//               <span className="text-green-600 font-medium">
//                 {carData.price ? `${carData.price}` : "Contact for price"}
//               </span>
//             </div>
//           </div>

//           {/* Description */}
//           <p className="text-gray-600 leading-relaxed">
//             {carData.description ||
//               "Experience comfort, performance, and reliability with this vehicle. Perfect for all your travel needs."}
//           </p>

//           {/* Features */}
//           <div>
//             <h3 className="text-xl font-semibold mb-3 text-gray-800">
//               Key Features
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-700">
//               {[
//                 "GPS Navigation",
//                 "Bluetooth Connectivity",
//                 "Automatic Climate Control",
//                 "Rearview Camera",
//                 "Cruise Control",
//                 "Lane Departure Warning",
//                 "Apple CarPlay / Android Auto",
//                 "Keyless Entry",
//               ].map((feature, idx) => (
//                 <div key={idx}>✓ {feature}</div>
//               ))}
//             </div>
//           </div>

//           {/* Specifications */}
//           <div>
//             <h3 className="text-xl font-semibold mb-3 text-gray-800">
//               Specifications
//             </h3>
//             <div className="grid grid-cols-2 gap-y-3 text-gray-700">
//               <div>
//                 <span className="font-medium">Transmission:</span>{" "}
//                 {carData.transmission || ""}
//               </div>
//               <div>
//                 <span className="font-medium">Total Distance:</span>{" "}
//                 {carData.kmsDriven ? `${carData.kmsDriven} km` : ""}
//               </div>
//               <div>
//                 <span className="font-medium">Owners:</span>{" "}
//                 {carData.noOfOwners || ""}
//               </div>
//               <div>
//                 <span className="font-medium">Fuel Type:</span>{" "}
//                 {carData.fuel || ""}
//               </div>
//               <div>
//                 <span className="font-medium">Year:</span>{" "}
//                 {carData.year || ""}
//               </div>
              
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4 mt-6">
            
//             <button
//               onClick={handleBuyNow}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
//             >
//               Buy This Car
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Related Products & Footer */}
//       <div className="mt-12">
//         <RelatedProducts />
//       </div>
//       <Footer />
//     </div>
//   );
// }
// ......................
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Footer from "../Homepage/Footer";
// import RelatedProducts from "../RelatedProducts/RelatedProducts";

// export default function Details() {
//   const location = useLocation();
//   const carData = location.state?.carData || {};

//   const photos = Array.isArray(carData.photos)
//     ? carData.photos
//     : carData.photos
//     ? [carData.photos]
//     : ["https://via.placeholder.com/1200x600?text=No+Image+Available"];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (photos.length <= 1) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % photos.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [photos]);

//   const handlePrev = () =>
//     setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

//   const handleNext = () =>
//     setCurrentIndex((prev) => (prev + 1) % photos.length);

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       {/* Back */}
//       <Link
//         to="/User_Dashboard"
//         className="inline-block mb-6 text-blue-600 hover:underline"
//       >
//         ← Back to Dashboard
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 max-w-7xl mx-auto">
//         {/* LEFT — Images */}
//         <div>
//           <img
//             src={photos[currentIndex]}
//             alt="Car"
//             className="w-full h-[420px] object-cover rounded-lg"
//           />
//         </div>

//         {/* RIGHT — Details */}
//         <div className="space-y-6">
//           <h1 className="text-3xl font-semibold">
//             {carData.brand || carData.title}
//           </h1>

//           <p className="text-green-600 text-xl font-medium">
//             ₹{carData.price}
//           </p>

//           <p className="text-gray-600">
//             {carData.description || "No description available"}
//           </p>

//           {/* ✅ SAME BUY BUTTON AS Buy.jsx */}
//           <Link
//             to="/buying"
//             state={{
//               carData: {
//                 name: carData.brand || carData.title,
//                 price: carData.price,
//                 ownerEmail:
//                   carData.ownerEmail || carData.email || "",
//                 carId: carData.carId,
//               },
//             }}
//           >
//             <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
//               Buy This Car
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Related */}
//       <div className="mt-12">
//         <RelatedProducts type="sell" />
//       </div>

//       <Footer />
//     </div>
//   );
// }
// .........................
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../Homepage/Footer";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function BuyDetails() {
  const location = useLocation();
  const carData = location.state?.carData || {};

  // Handle photos safely
  const photos = Array.isArray(carData.photos)
    ? carData.photos
    : carData.photos
    ? [carData.photos]
    : ["https://via.placeholder.com/1200x600?text=No+Image+Available"];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [photos]);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Back Link */}
      <Link
        to="/User_Dashboard"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 items-start max-w-7xl mx-auto">
        {/* LEFT — Image Gallery */}
        <div className="flex flex-col items-center">
          <div className="relative w-full">
            <img
              src={photos[currentIndex]}
              alt="Car"
              className="w-full h-[420px] object-cover rounded-lg"
            />

            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
                >
                  ❮
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
                >
                  ❯
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-20 h-16 object-cover rounded-md cursor-pointer border-2 ${
                    i === currentIndex
                      ? "border-blue-600"
                      : "border-transparent opacity-70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Car Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            {carData.brand || carData.title}{" "}
            {carData.year ? `(${carData.year})` : ""}
          </h1>

          {/* Price */}
          <p className="text-green-600 text-xl font-medium">
            ₹{carData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600">
            {carData.description ||
              "Experience comfort, performance, and reliability with this vehicle."}
          </p>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div>✓ GPS Navigation</div>
              <div>✓ Bluetooth Connectivity</div>
              <div>✓ Automatic Climate Control</div>
              <div>✓ Rearview Camera</div>
              <div>✓ Cruise Control</div>
              <div>✓ Keyless Entry</div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-y-3 text-gray-700">
              <div><strong>Transmission:</strong> {carData.transmission}</div>
              <div><strong>Fuel Type:</strong> {carData.fuel}</div>
              <div><strong>KMs Driven:</strong> {carData.kmsDriven}</div>
              <div><strong>Owners:</strong> {carData.noOfOwners}</div>
              <div><strong>Year:</strong> {carData.year}</div>
            </div>
          </div>

          {/* ✅ Buy Button (Form Page) */}
          <Link
            to="/buying"
            state={{
              carData: {
                name: carData.brand || carData.title,
                price: carData.price,
                ownerEmail:
                  carData.ownerEmail || carData.email || "",
                carId: carData.carId,
              },
            }}
          >
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Buy This Car
            </button>
          </Link>
        </div>
      </div>

      {/* Related Vehicles */}
      <div className="mt-12">
        <RelatedProducts type="sell" />
      </div>

      <Footer />
    </div>
  );
}


