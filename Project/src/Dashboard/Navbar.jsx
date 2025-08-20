import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () =>{
    return(
        <>
            <div className="navbar">
                <nav>
                    <ul>
                       
                        <li><NavLink to={'/Setting'} className={'nav'}>Setting</NavLink></li>
                        <li><NavLink to={'/Profile'} className={'nav'}>Profile</NavLink></li>
                        
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navbar