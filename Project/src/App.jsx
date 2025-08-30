import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Admin_Panel/Dashboard';
import Profile from "./Admin_Panel/Profile";
import Setting from "./Admin_Panel/Setting";
import Users from './Admin_Panel/Users';
import Sell_Vehicles from './Admin_Panel/Sell_Vehicles';
import Rental_Vehicles from './Admin_Panel/Rental_Vehicles';
import Payments from './Admin_Panel/Payments';
import Reports from './Admin_Panel/Reports';
import User_Dashboard from './User_Dashboard/User_Dashboard';
import Signup from './Login_Signup/Signup';
import Login from './Login_Signup/Login';
function App() {

  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
           <Route path="/Users" element={<Users />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Sell_Vehicles" element={<Sell_Vehicles />} />
            <Route path="/Rental_Vehicles" element={<Rental_Vehicles />} />
            <Route path="/Payments" element={<Payments />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/User_Dashboard" element={<User_Dashboard />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login/>}/>
            {/* <Route path="/Profile" element={<Profile />} />
            <Route path="/Setting" element={<Setting />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
