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
import Wishlist from "./User_Dashboard/Wishlist";
import Car1 from "./Pages/car1";
import Car2 from "./Pages/car2";
import Car3 from "./Pages/car3";
import Car4 from "./Pages/car4";
import Car5 from "./Pages/car5";
import WebOwnerLogin from "./Login_Signup/WebOwnerLogin";
import WebOwnerDashboard from "./Admin_Control/WebOwnerDashboard";
import AfterLogin from "./User_Dashboard/AfterLogin";
import Buy from "./User_Dashboard/Buy";
import Rent from "./User_Dashboard/Rent";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader loading={loading} />

      {/* Show routes only after preloader is done */}
      {!loading && (
        <Routes>
          {/* Homepage route */}
          <Route path="/" element={<Homepage />} />
          <Route path="/booking" element={<CarBookingForm />} />
          <Route path="/buying" element={<CarBuyForm />} />

          {/* Car detail routes - MOVED INSIDE THE MAIN ROUTES */}
          <Route path="/car/1" element={<Car1 />} />
          <Route path="/car/2" element={<Car2 />} />
          <Route path="/car/3" element={<Car3 />} />
          <Route path="/car/4" element={<Car4 />} />
          <Route path="/car/5" element={<Car5 />} />

         

          {/* Admin Panel routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Sell_Vehicles" element={<Sell_Vehicles />} />
          <Route path="/Rental_Vehicles" element={<Rental_Vehicles />} />
          <Route path="/Payments" element={<Payments />} />

          {/* Web_Admin_Control */}
          <Route path="/WebOwnerDashboard" element={<WebOwnerDashboard />} />

          {/* User Dashboard routes */}
          <Route path="/User_Dashboard" element={<User_Dashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/AfterLogin" element={<AfterLogin />} />
          <Route path="/Buy" element={<Buy />} />
          <Route path="/Rent" element={<Rent />} />
         
          
          {/* Authentication routes */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/PostAd" element={<PostAd />} />
          <Route path="/WebOwnerLogin" element={<WebOwnerLogin />} />
        </Routes>
      )}
    </>
  );
}

export default App;