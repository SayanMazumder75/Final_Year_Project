import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CarBookingForm from "./User_Dashboard/CarBookingForm";
import CarBuyForm from "./User_Dashboard/CurBuyForm";
import Homepage from './Homepage/Homepage';
import Dashboard from "./Admin_Panel/Dashboard";
import Profile from "./Admin_Panel/Profile";
import Setting from "./Admin_Panel/Setting";
import Users from "./Admin_Panel/Users";
import Sell_Vehicles from "./Admin_Panel/Sell_Vehicles";
import Rental_Vehicles from "./Admin_Panel/Rental_Vehicles";
import Payments from "./Admin_Panel/Payments";
import User_Dashboard from "./User_Dashboard/User_Dashboard";
import Signup from "./Login_Signup/Signup";
import Login from "./Login_Signup/Login";
import Preloader from "./Preloader";
import AdminSignup from "./Login_Signup/AdminSignup";
import AdminLogin from "./Login_Signup/AdminLogin";
import PostAd from "./Admin_Panel/PostAd";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g. fetching user data, assets, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader shows first */}
      <Preloader loading={loading} />

      {/* Show routes only after preloader is done */}
      {!loading && (
        <Routes>
          {/* Homepage route */}
          <Route path="/" element={<Homepage />} />
          <Route path="/booking" element={<CarBookingForm />} />
          <Route path="/buying" element={<CarBuyForm />} />
          {/* Admin Panel routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Sell_Vehicles" element={<Sell_Vehicles />} />
          <Route path="/Rental_Vehicles" element={<Rental_Vehicles />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/User_Dashboard" element={<User_Dashboard />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/PostAd" element={<PostAd />} />
        </Routes>
      )}
    </>
  );
}

export default App;


