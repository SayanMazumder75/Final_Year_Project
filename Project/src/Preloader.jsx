import React, { useEffect, useState } from "react";
import supercar from "./images/super.png";

export default function Preloader({ loading }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setVisible(false), 1000); // match transition
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 z-50 transition-all duration-1000 ease-in-out ${
        loading ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {/* Supercar Image */}
      <img
        src={supercar}
        alt="Supercar"
        className="w-72 md:w-96 mb-8 animate-pulse"
      />

      {/* Animated Logo/Text */}
      <h1 className="text-2xl font-bold text-blue-600 animate-pulse relative">
        Loading...
        <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-gradient-to-r from-blue-400 to-blue-600 animate-[shimmer_1.5s_linear_infinite]" />
      </h1>

      {/* Dots Animation */}
      <div className="flex space-x-2 mt-6">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
      </div>

      {/* Spinning ring behind dots */}
      <div className="absolute bottom-16 w-20 h-20 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
