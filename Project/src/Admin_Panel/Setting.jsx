import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Setting = () =>{
    return(
        
        <container className="flex">
            <Sidebar />
            <div >
                <h2 className="text-2xl font-bold mb-4">Sell Vehicles</h2>
                {/* Content for Sell Vehicles page */}
                <p>This is the Sell Vehicles page content.</p>
            </div>
            </container>
    
    )
}

export default Setting 