import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import {
  Users,
  Star,
  Car,
  Quote,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Wrench,
  CreditCard,
  Headphones,
} from "lucide-react";
import logo from "/src/images/logo.png";
import car1 from "/src/assets/Car5.jpg";
import car2 from "/src/assets/Car8.jpg";
import car3 from "/src/assets/Car6.jpg";
import car4 from "/src/assets/Car6.jpg";

function Homepage() {
  const images = [car1, car2, car3, car4];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  const User_Dashboard = () => navigate("/User_Dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
        <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        <nav className="flex gap-6 text-gray-700 font-medium">
          <a href="/Login" className="hover:text-indigo-600 transition">
            LOG IN
          </a>
          <a href="/" className="hover:text-indigo-600 transition">
            HOME
          </a>
        </nav>
      </header>

      {/* Hero Slider */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <img
          src={images[index]}
          alt="Car"
          className="w-full h-full object-cover transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center px-8 md:px-16">
          <div className="text-white max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find Your Dream Car Today
            </h1>
            <p className="mb-6 text-lg text-gray-200">
              Luxury, performance, and trust — all in one place.
            </p>
            <button
              onClick={User_Dashboard}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition"
            >
              Explore All Vehicles
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-indigo-600" />,
                title: "Trusted & Certified",
                desc: "All our cars are verified and come with proper certifications.",
              },
              {
                icon: <Wrench className="w-10 h-10 text-indigo-600" />,
                title: "Expert Maintenance",
                desc: "Professional servicing ensures your car stays road-ready.",
              },
              {
                icon: <CreditCard className="w-10 h-10 text-indigo-600" />,
                title: "Flexible Financing",
                desc: "Get easy EMI and finance options tailored for you.",
              },
              {
                icon: <Headphones className="w-10 h-10 text-indigo-600" />,
                title: "24/7 Support",
                desc: "Our customer care team is always here to assist you.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-gray-50"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Featured Vehicles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[car1, car2, car3].map((car, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={car}
                  alt={`Car ${i + 1}`}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {i === 0
                      ? "BMW M4"
                      : i === 1
                      ? "Audi A6"
                      : "Mercedes C-Class"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Starting at ₹
                    {i === 0 ? "45,00,000" : i === 1 ? "52,00,000" : "48,00,000"}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-indigo-600 w-6 h-6" />
            <h3 className="text-xl font-semibold text-indigo-600">Who We Are</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Since our founding in 2010, we’ve helped over{" "}
            <strong className="text-gray-900">15,000 customers</strong> find
            their dream cars across India. From a small showroom to a
            full-service dealership, our mission is to deliver luxury vehicles
            with transparency and customer-first service.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-yellow-500 w-6 h-6" />
            <h3 className="text-xl font-semibold text-indigo-600">
              Successful Deals
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            ⭐️⭐️⭐️⭐️⭐️ “I bought a used BMW M4 and the experience was
            exceptional — transparent, fast, and professional. The vehicle
            quality and customer support exceeded expectations.”
            <br />— <i>Rajeev T., Bangalore</i>
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">
            Customer Reviews
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Fantastic service and great selection of cars! Highly recommend.",
                name: "Anjali S.",
              },
              {
                text: "Professional team, helped me find the perfect car quickly.",
                name: "Rohit K.",
              },
              {
                text: "Smooth buying process with full transparency. Love my new ride!",
                name: "Priya M.",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 relative hover:scale-105 transition"
              >
                <Quote className="absolute top-4 left-4 text-indigo-200 w-6 h-6" />
                <p className="text-gray-700 mb-4 mt-2">{review.text}</p>
                <small className="text-gray-500">- {review.name}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Experience Your Dream Car?
        </h2>
        <p className="mb-6 text-lg">
          Book a Car today and let us help you make the right choice.
        </p>
        <p className="mb-6 text-lg">Login For explore more</p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
