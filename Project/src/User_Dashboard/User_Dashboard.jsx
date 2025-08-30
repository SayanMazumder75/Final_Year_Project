import React from "react"; 
import Header from "../Admin_Panel/Header";
import { Calendar, MapPin, Car, Clock } from "lucide-react"; 
import rental from './rental.jpg'; 
import rental2 from './rental2.jpg'; 

export default function User_Dashboard() {
  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-3/3 xl:w-1/3 2xl:w-1/2 mx-auto">
            <div className="md:w-full shadow-md sticky top-0 z-10 bg-white">
              <Header />
            </div>

      <section
        className="relative w-full h-64 bg-gray-100 flex items-start justify-center"
        style={{ backgroundImage: `url(${rental})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="relative text-center max-w-2xl rounded-2xl p-10 shadow-lg text-white">
          <h1 className="text-2xl md:text-4xl font-bold">Rent Your Dream Car</h1>
          <p className="mb-4 text-lg">Affordable, reliable, and fast car rental service.</p>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Popular Cars</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Toyota Corolla", price: "$45/day", img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80" },
            { name: "BMW 5 Series", price: "$120/day", img: "https://i2.wp.com/www.ispravochnik.com/cdn/pictures/1_5ecfd6273fa1a.jpg" },
            { name: "Honda Civic", price: "$50/day", img: rental2 }
          ].map((car, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition">
              <img src={car.img} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-gray-600">{car.price}</p>
                <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-yellow-500 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
        <p className="mb-6">Book your car now and start your journey hassle-free.</p>
        <button className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg text-lg font-semibold">Get Started</button>
      </section>

      <div className="h-1 w-full bg-blue-950 rounded-full my-8"></div>
    </div>
  );
}
