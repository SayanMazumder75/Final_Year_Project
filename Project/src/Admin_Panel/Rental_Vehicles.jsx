import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Car_Rental from "../Car_Rental/Car_Rental";
const Rental_Vehicles = () =>{
    return(
        <>
        <div className="flex relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950" >
           {/* Sidebar - fixed */}
  <div className="md:w-64 md:h-screen md:fixed left-0 top-0">
    <Sidebar />
  </div>

  {/* Content - scrollable */}
  <div className="md:flex-1 md:ml-40 md:overflow-y-auto md:h-screen">
    <Car_Rental />
  </div>
        </div>

    </>
    )
}

export default Rental_Vehicles 