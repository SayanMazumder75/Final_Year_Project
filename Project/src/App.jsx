import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Dashboard/Navbar';
import Profile from "./Dashboard/Profile";
import Setting from "./Dashboard/Setting";
function App() {

  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={<Navbar />} />
           
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Setting" element={<Setting />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
