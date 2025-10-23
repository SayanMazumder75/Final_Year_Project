import React from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  
  {
    title: "Buy",
    desc: "Reserve your ride in advance so you can relax on the day of your trip.",
    img: "../src/assets/Buy.png",
    link: "/Buy",
  },
 
  {
    title: "Rentals",
    desc: "Request a trip for a block of time and make multiple stops.",
    img: "../src/assets/Rental.png",
    link: "/rent",
  },
];

export default function AfterLogin() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Suggestions</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-6 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer flex flex-col justify-between "
          >
            <div>
              <h2 className="text-xl font-semibold mb-2 ">{card.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                className="bg-black text-white px-4 py-2 rounded-full"
                onClick={() => navigate(card.link)}
              >
                Details
              </button>
              <img src={card.img} alt={card.title} className="w-20 h-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
