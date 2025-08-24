import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Car_Rental from "../Car_Rental/Car_Rental";
const Rental_Vehicles = () =>{
    return(
        
        <container className="flex">
            <Sidebar />
            <Car_Rental />
            
            </container>
    
    )
}

export default Rental_Vehicles 