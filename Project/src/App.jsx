import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Admin_Panel/Dashboard';
import Profile from "./Admin_Panel/Profile";
import Setting from "./Admin_Panel/Setting";
import Users from './Admin_Panel/users';
import Sell_Vehicles from './Admin_Panel/Sell_Vehicles';
import Rental_Vehicles from './Admin_Panel/Rental_Vehicles';
import Payments from './Admin_Panel/Payments';
import Reports from './Admin_Panel/Reports';
import Car_Rental from './Car_Rental/Car_Rental';
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
            <Route path="/Car_Rental" element={<Car_Rental />} />
            {/* <Route path="/Profile" element={<Profile />} />
            <Route path="/Setting" element={<Setting />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
